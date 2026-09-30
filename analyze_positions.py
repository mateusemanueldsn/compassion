"""
Análise dos estados: extrai o transform de posição de cada id
para identificar quais são Norte/Nordeste
"""
import re

input_file = r'c:\Users\mateu\OneDrive\Documentos\compassion-brasil-website\assets\Mapa Brasil V4.svg'

with open(input_file, encoding='utf-8') as f:
    content = f.read()

# Extrair todos os grupos com id i1..i27 e seu transform matrix
pattern = r'<g id="(i\d+)" transform="matrix\([^,]+,[^,]+,[^,]+,[^,]+,([^,]+),([^"]+)\)">'
matches = re.findall(pattern, content)
print("id | x | y")
for m in matches:
    print(f"{m[0]} | x={m[1]} | y={m[2]}")
"""

import re

input_file = r'c:\Users\mateu\OneDrive\Documentos\compassion-brasil-website\assets\Mapa Brasil V4.svg'

with open(input_file, encoding='utf-8') as f:
    content = f.read()

pattern = r'<g id="(i\d+)" transform="matrix\(1,0,0,1,([^,]+),([^"]+)\)">'
matches = re.findall(pattern, content)
print(f"{'ID':6} | {'X':10} | {'Y':10}")
print("-" * 35)
for gid, x, y in matches[:30]:
    print(f"{gid:6} | {float(x):10.3f} | {float(y):10.3f}")
"""
