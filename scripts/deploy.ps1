# Script de Deploy - Nhangara Mirim Game
# PowerShell Script para Cloudflare Pages

Write-Host "Nhangara Mirim Game - Deploy Script" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# 1. Verificar se estamos no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "Erro: package.json nao encontrado. Execute este script na raiz do projeto." -ForegroundColor Red
    exit 1
}

Write-Host "1. Verificando dependencias..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

# 2. Limpar build anterior
Write-Host "2. Limpando build anterior..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}

# 3. Build do projeto
Write-Host "3. Gerando build de producao..." -ForegroundColor Yellow
npm run build

if (-not (Test-Path "dist")) {
    Write-Host "Erro: Build falhou. Verifique os erros acima." -ForegroundColor Red
    exit 1
}

# 4. Verificar se as imagens e video estao incluidos
Write-Host "4. Verificando imagens e video..." -ForegroundColor Yellow
$media = @("tela.jpg", "saci.jpg", "talisma_da_sabedoria.jpg", "biomas.jpg", "753b6295-8e4d-47ed-afc6-a5f94436fdef.mp4")
foreach ($file in $media) {
    if (Test-Path "dist/images/$file") {
        Write-Host "OK: $file encontrado" -ForegroundColor Green
    } else {
        Write-Host "ERRO: $file nao encontrado" -ForegroundColor Red
    }
}

# 5. Verificar Wrangler CLI
Write-Host "5. Verificando Wrangler CLI..." -ForegroundColor Yellow
try {
    $wranglerVersion = wrangler --version 2>$null
    if ($wranglerVersion) {
        Write-Host "OK: Wrangler CLI encontrado: $wranglerVersion" -ForegroundColor Green
    } else {
        Write-Host "Wrangler CLI nao encontrado. Instalando..." -ForegroundColor Yellow
        npm install -g wrangler
    }
} catch {
    Write-Host "Erro ao verificar Wrangler CLI" -ForegroundColor Red
}

# 6. Login no Cloudflare (se necessario)
Write-Host "6. Verificando login no Cloudflare..." -ForegroundColor Yellow
Write-Host "Se solicitado, faca login no Cloudflare" -ForegroundColor Cyan

# 7. Deploy
Write-Host "7. Fazendo deploy no Cloudflare Pages..." -ForegroundColor Yellow
Write-Host "Enviando arquivos para Cloudflare..." -ForegroundColor Cyan

try {
    wrangler pages deploy dist --project-name nhangara-mirim-game
    Write-Host "Deploy concluido com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "Erro no deploy. Verifique se voce esta logado no Cloudflare." -ForegroundColor Red
    Write-Host "Execute: wrangler login" -ForegroundColor Cyan
}

# 8. Informacoes finais
Write-Host "8. Informacoes do Deploy:" -ForegroundColor Yellow
Write-Host "URL: https://nhangara-mirim-game.pages.dev" -ForegroundColor Green
Write-Host "Build: dist/" -ForegroundColor Cyan
Write-Host "Imagens: dist/images/" -ForegroundColor Cyan

Write-Host "Proximos passos:" -ForegroundColor Yellow
Write-Host "1. Acesse a URL acima" -ForegroundColor White
Write-Host "2. Teste todas as funcionalidades" -ForegroundColor White
Write-Host "3. Configure custom domain (opcional)" -ForegroundColor White
Write-Host "4. Configure CI/CD com GitHub" -ForegroundColor White

Write-Host "Deploy concluido!" -ForegroundColor Green 