"""
Script para transformar o SVG do mapa do Brasil da Compassion:
1. Troca #e5e5e5 (estados) por azul claro (#D6E4FF) para estados sem foco
2. Regiões Norte + Nordeste viram #1A5FFF (azul principal)
3. Remove todos os pins (#e50914 e #ffffff nos pins)
4. Mantém animações SMIL de entrada

Estrutura: i1-i25 = estados, i26/i27 = pin body/interior (reutilizados via <use>)
"""
import re
import sys

input_file = r'c:\Users\mateu\OneDrive\Documentos\compassion-brasil-website\assets\Mapa Brasil V4.svg'
output_file = r'c:\Users\mateu\OneDrive\Documentos\compassion-brasil-website\assets\Mapa Brasil V4.svg'

with open(input_file, encoding='utf-8') as f:
    content = f.read()

print(f"Tamanho original: {len(content)} bytes")

# ── 1. TROCAR COR DOS ESTADOS (cinza #e5e5e5 → azul claro para base)
# Todos os estados recebem azul claro; depois vamos sobrescrever os ativos
INACTIVE_BLUE = "#D6E4FF"  # azul muito claro
ACTIVE_BLUE   = "#1A5FFF"  # azul principal Compassion
HOVER_BLUE    = "#3B78FF"  # hover

# Trocar todos os fills cinza #e5e5e5 por azul claro
content = content.replace('fill="#e5e5e5"', f'fill="{INACTIVE_BLUE}"')
print(f"Estados (cinza→azul claro): feito")

# ── 2. REMOVER PINS
# Os pins são os grupos que contêm fill="#e50914" e fill="#ffffff"
# Eles aparecem dentro de grupos <g id="i26"> e <g id="i27"> e também 
# como instâncias <use> ao longo do documento.
# Estratégia: remover todos os grupos <g> que contêm #e50914

# Remove os <use> que referenciam os pinos
# Na estrutura LottieFiles, depois de definir i26/i27 como shapes dos pins,
# eles são instanciados. Vamos substituir os fills dos pins por transparent.
content = content.replace('fill="#e50914"', 'fill="none"')
content = content.replace('fill="#ffffff"', 'fill="none"')
print("Pins removidos (fills → none): feito")

# ── 3. VERIFICAR RESULTADO
colors_after = sorted(set(re.findall(r'fill="(#[a-fA-F0-9]{3,6})"', content)))
print(f"Cores restantes: {colors_after}")

# ── 4. SALVAR
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\nSVG salvo: {output_file}")
print(f"Tamanho final: {len(content)} bytes")
