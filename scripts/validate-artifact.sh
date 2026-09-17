#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
out_dir="${project_root}/out"

required_files=(
  "${out_dir}/index.html"
  "${out_dir}/.htaccess"
  "${out_dir}/api/meta-conversion.php"
  "${out_dir}/politica-de-privacidade/__next.politica-de-privacidade.__PAGE__.txt"
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
echo "Artefato estático do cPanel validado."
