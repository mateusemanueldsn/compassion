$file = 'assets\Mapa Brasil V4.svg'
$content = [System.IO.File]::ReadAllText($file)

# Find the pattern of i26/i27 (likely pin components)
Write-Host "=== Buscando estrutura dos pins (i26, i27) ==="
$usePattern = 'xlink:href="#(i\d+)"'
$uses = [regex]::Matches($content, $usePattern) | ForEach-Object { $_.Groups[1].Value }
$grouped = $uses | Group-Object | Sort-Object Count -Descending | Select-Object -First 10
$grouped | ForEach-Object { Write-Host "Ref $($_.Name): $($_.Count) vezes" }

Write-Host "`n=== Verificando quais ids tem fill vermelho vs cinza ==="
# Find each id block and its color
$idBlocks = [regex]::Matches($content, '<g id="(i\d+)"[^>]*>.*?fill="(#[a-fA-F0-9]+)"', [System.Text.RegularExpressions.RegexOptions]::Singleline)
$idBlocks | Select-Object -First 30 | ForEach-Object {
    Write-Host "ID: $($_.Groups[1].Value)  |  Primeira cor: $($_.Groups[2].Value)"
}

Write-Host "`n=== Verificando se existe animacao de hover ==="
if ($content -match 'hover|mouseover|onmouse') {
    Write-Host "SIM - tem eventos de mouse"
} else {
    Write-Host "NAO - sem eventos de mouse no SVG"
}
if ($content -match 'animateTransform|animate') {
    Write-Host "SIM - tem animacoes CSS/SMIL"
} else {
    Write-Host "NAO"
}

Write-Host "`n=== Primeiros 2000 chars do SVG para entender estrutura ==="
Write-Host $content.Substring(0, [Math]::Min(2000, $content.Length))
