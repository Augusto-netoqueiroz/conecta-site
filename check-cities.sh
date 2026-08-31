#!/usr/bin/env bash
slugs=(
  brasilia-plano-piloto
  taguatinga
  ceilandia
  samambaia
  aguas-claras
  guara
  gama
  santa-maria
  recanto-das-emas
  sobradinho
  sobradinho-ii
  planaltina
  riacho-fundo
  riacho-fundo-ii
  nucleo-bandeirante
  vicente-pires
  sao-sebastiao
  paranoa
  itapoa
  brazlandia
)

failed=0

for slug in "${slugs[@]}"; do
  status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000/cidade/$slug")
  printf "%-28s %s\n" "$slug" "$status"

  if [ "$status" != "200" ]; then
    failed=1
  fi
done

exit "$failed"
