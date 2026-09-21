#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
out_dir="${project_root}/out"

required_files=(
  "${out_dir}/index.html"
  "${out_dir}/.htaccess"
  "${out_dir}/api/meta-conversion.php"
  "${out_dir}/politica-de-privacidade/__next.politica-de-privacidade.__PAGE__.txt"
  "${out_dir}/cidade/brasilia-plano-piloto/__next.cidade.\$d\$slug.txt"
  "${out_dir}/cidade/brasilia-plano-piloto/__next.cidade.\$d\$slug.__PAGE__.txt"
)

for file in "${required_files[@]}"; do
  [[ -f "${file}" ]] || {
    echo "Arquivo obrigatório ausente: ${file#"${project_root}/"}" >&2
    exit 66
  }
done

if grep -R -q -E '^(<<<<<<<|=======|>>>>>>>)' "${out_dir}"; then
  echo "Conflitos Git encontrados em out" >&2
  exit 66
fi

grep -q 'events_received' "${out_dir}/api/meta-conversion.php"
grep -Fq 'RewriteRule ^(.+\.txt)/$ $1 [L]' "${out_dir}/.htaccess"
grep -Fq 'SetEnvIf Request_URI "^/" no-gzip=1' "${out_dir}/.htaccess"
if grep -Fq 'AddOutputFilterByType DEFLATE' "${out_dir}/.htaccess"; then
  echo "Compactação duplicada encontrada em out/.htaccess" >&2
  exit 66
fi
echo "Artefato estático do cPanel validado."
