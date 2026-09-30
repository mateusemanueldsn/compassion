$inputFile = 'assets\Mapa Brasil V4.svg'
$outputFile = 'assets\Mapa Brasil V4.svg'

Write-Host "Lendo arquivo..."
$content = [System.IO.File]::ReadAllText((Resolve-Path $inputFile).Path, [System.Text.Encoding]::UTF8)

$stateData = @{
    'i1' = @{ state = 'Acre'; region = 'Região Norte'; active = $true }
    'i3' = @{ state = 'Amapá'; region = 'Região Norte'; active = $true }
    'i4' = @{ state = 'Amazonas'; region = 'Região Norte'; active = $true }
    'i11' = @{ state = 'Tocantins'; region = 'Região Norte'; active = $true }
    'i14' = @{ state = 'Pará'; region = 'Região Norte'; active = $true }
    'i22' = @{ state = 'Rondônia'; region = 'Região Norte'; active = $true }
    'i23' = @{ state = 'Roraima'; region = 'Região Norte'; active = $true }
    
    'i2' = @{ state = 'Alagoas/Sergipe'; region = 'Região Nordeste'; active = $true }
    'i5' = @{ state = 'Bahia'; region = 'Região Nordeste'; active = $true }
    'i6' = @{ state = 'Ceará'; region = 'Região Nordeste'; active = $true }
    'i10' = @{ state = 'Maranhão'; region = 'Região Nordeste'; active = $true }
    'i16' = @{ state = 'Paraíba'; region = 'Região Nordeste'; active = $true }
    'i17' = @{ state = 'Pernambuco'; region = 'Região Nordeste'; active = $true }
    'i18' = @{ state = 'Piauí'; region = 'Região Nordeste'; active = $true }
    'i20' = @{ state = 'Rio Grande do Norte'; region = 'Região Nordeste'; active = $true }
}

for ($i = 1; $i -le 25; $i++) {
    $id = "i$i"
    $data = $stateData[$id]
    
    if ($data) {
        $className = "br-state active-region"
        $stateName = $data.state
        $regionName = $data.region
    } else {
        $className = "br-state inactive-region"
        $stateName = "Outro Estado"
        $regionName = "Demais Regiões"
    }

    # Procura <g id="iX" ...> e adiciona as propriedades
    # A estrutura atual é algo como <g id="i1" transform="...">
    $pattern = "(<g id=""$id""\b[^>]*)>"
    $replacement = "`$1 class=""$className"" data-state=""$stateName"" data-region=""$regionName"">"
    
    $content = [regex]::Replace($content, $pattern, $replacement)
}

[System.IO.File]::WriteAllText((Join-Path (Get-Location) $outputFile), $content, [System.Text.Encoding]::UTF8)
Write-Host "Classes e data attributes adicionados ao SVG com sucesso!"
