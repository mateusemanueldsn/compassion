$inputFile = 'assets\Mapa Brasil V4.svg'
$outputFile = 'assets\Mapa Brasil V4.svg'

Write-Host "Lendo arquivo..."
$content = [System.IO.File]::ReadAllText((Resolve-Path $inputFile).Path, [System.Text.Encoding]::UTF8)

# Mapeamento dos estados Norte + Nordeste (a colorir com azul #1A5FFF):
# Norte:    i1(AC), i3(AP), i4(AM), i11(TO), i14(PA), i22(RO), i23(RR)
# Nordeste: i2(AL+SE), i5(BA), i6(CE), i10(MA), i16(PB), i17(PE), i18(PI), i20(RN)
$activeIds = @('i1', 'i2', 'i3', 'i4', 'i5', 'i6', 'i10', 'i11', 'i14', 'i16', 'i17', 'i18', 'i20', 'i22', 'i23')

$ACTIVE_BLUE   = '#1A5FFF'
$INACTIVE_BLUE = '#D6E4FF'

Write-Host "Colorindo estados ativos (Norte + Nordeste) com $ACTIVE_BLUE ..."

foreach ($id in $activeIds) {
    # Encontra o grupo <g id="iX" transform="..."> e troca o fill do primeiro <path> dentro
    # Pattern: pega o bloco do grupo e substitui o primeiro fill="#D6E4FF" por azul ativo
    
    # Estrategia: encontrar "<g id="$id" " e depois a proxima ocorrencia de fill="#D6E4FF"
    # e substituir apenas essa primeira ocorrencia dentro do contexto do grupo
    
    $pattern = "(<g id=""$id"" [^>]+>(?:(?!<g id="").)*?)fill=""#D6E4FF"""
    $replacement = "`$1fill=""$ACTIVE_BLUE"""
    
    $newContent = [regex]::Replace($content, $pattern, $replacement, 
        [System.Text.RegularExpressions.RegexOptions]::Singleline)
    
    if ($newContent -ne $content) {
        Write-Host "  $id -> COLORIDO"
        $content = $newContent
    } else {
        Write-Host "  $id -> nao encontrado (tentando alternativa)"
        # Alternativa: encontrar o bloco com id e substituir todas as ocorrencias no bloco
        # Procura a tag de abertura do grupo
        $idx = $content.IndexOf("<g id=""$id"" ")
        if ($idx -ge 0) {
            # Pega os proximos 5000 chars apos o <g
            $blockEnd = [Math]::Min($idx + 5000, $content.Length)
            $block = $content.Substring($idx, $blockEnd - $idx)
            $newBlock = $block -replace 'fill="#D6E4FF"', "fill=""$ACTIVE_BLUE"""
            $content = $content.Substring(0, $idx) + $newBlock + $content.Substring($blockEnd)
            Write-Host "  $id -> COLORIDO (alternativo)"
        }
    }
}

# Verificar resultado
$pattern2 = 'fill="(#[a-fA-F0-9]{3,6})"'
$remaining = [regex]::Matches($content, $pattern2) | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
Write-Host "`nCores restantes: $($remaining -join ', ')"

# Contagem por cor
foreach ($c in $remaining) {
    $count = ([regex]::Matches($content, [regex]::Escape("fill=""$c"""))).Count
    Write-Host "  $c : $count ocorrencias"
}

# Salvar
[System.IO.File]::WriteAllText((Join-Path (Get-Location) $outputFile), $content, [System.Text.Encoding]::UTF8)
Write-Host "`nSVG salvo!"
