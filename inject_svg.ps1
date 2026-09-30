$htmlFile = 'index.html'
$svgFile = 'assets\Mapa Brasil V4.svg'

$html = [System.IO.File]::ReadAllText((Resolve-Path $htmlFile).Path, [System.Text.Encoding]::UTF8)
$svg = [System.IO.File]::ReadAllText((Resolve-Path $svgFile).Path, [System.Text.Encoding]::UTF8)

# Add id="brazilMap" to the SVG if not present
if ($svg -notmatch 'id="brazilMap"') {
    $svg = $svg -replace '<svg ', '<svg id="brazilMap" '
}

# Regex to find the SVG block in HTML
$pattern = '(?s)<svg\s+id="brazilMap".*?</svg>'
$html = [regex]::Replace($html, $pattern, $svg)

[System.IO.File]::WriteAllText((Join-Path (Get-Location) $htmlFile), $html, [System.Text.Encoding]::UTF8)
Write-Host "index.html atualizado com o novo SVG!"
