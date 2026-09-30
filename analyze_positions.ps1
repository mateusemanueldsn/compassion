$inputFile = 'assets\Mapa Brasil V4.svg'
$content = [System.IO.File]::ReadAllText((Resolve-Path $inputFile).Path, [System.Text.Encoding]::UTF8)

# Extrair posição de cada estado (transform="matrix(1,0,0,1,X,Y)")
$pattern = '<g id="(i\d+)" transform="matrix\(1,0,0,1,([^,]+),([^"]+)\)">'
$matches2 = [regex]::Matches($content, $pattern)

Write-Host "ID      | X           | Y"
Write-Host "--------|-------------|------------"
$seen = @{}
foreach ($m in $matches2) {
    $id = $m.Groups[1].Value
    $x = [double]$m.Groups[2].Value
    $y = [double]$m.Groups[3].Value
    if (-not $seen.ContainsKey($id)) {
        $seen[$id] = $true
        Write-Host ("{0,-7} | {1,11:F2} | {2,11:F2}" -f $id, $x, $y)
    }
}
