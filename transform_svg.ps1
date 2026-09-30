$inputFile = 'assets\Mapa Brasil V4.svg'
$outputFile = 'assets\Mapa Brasil V4.svg'

Write-Host "Lendo arquivo..."
$content = [System.IO.File]::ReadAllText((Resolve-Path $inputFile).Path, [System.Text.Encoding]::UTF8)
Write-Host "Tamanho original: $($content.Length) bytes"

# ── 1. Trocar cinza (#e5e5e5) -> azul inativo muito claro
$content = $content.Replace('fill="#e5e5e5"', 'fill="#D6E4FF"')
Write-Host "Estados -> azul claro: OK"

# ── 2. Remover pins: fill="#e50914" (corpo vermelho) -> none
$content = $content.Replace('fill="#e50914"', 'fill="none"')
Write-Host "Pins vermelhos -> none: OK"

# ── 3. Remover interior branco dos pins: fill="#ffffff" -> none
$content = $content.Replace('fill="#ffffff"', 'fill="none"')
Write-Host "Interior dos pins -> none: OK"

# ── 4. Verificar cores restantes
$pattern = 'fill="(#[a-fA-F0-9]{3,6})"'
$remaining = [regex]::Matches($content, $pattern) | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "Cores restantes: $($remaining -join ', ')"

# ── 5. Salvar
[System.IO.File]::WriteAllText((Join-Path (Get-Location) $outputFile), $content, [System.Text.Encoding]::UTF8)
Write-Host "`nSVG salvo com sucesso!"
Write-Host "Tamanho final: $($content.Length) bytes"
