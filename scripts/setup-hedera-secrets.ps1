# Script para configurar secrets do Hedera no Cloudflare Workers
# Execute este script após obter suas credenciais do portal Hedera

Write-Host "🔧 Configurando Secrets do Hedera no Cloudflare Workers" -ForegroundColor Green
Write-Host ""

# Verificar se o wrangler está instalado
try {
    $wranglerVersion = wrangler --version
    Write-Host "✅ Wrangler encontrado: $wranglerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Wrangler não encontrado. Instale com: npm install -g wrangler" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Configurando secrets para ambiente de desenvolvimento..." -ForegroundColor Yellow

# Secrets para desenvolvimento
$devSecrets = @(
    "HEDERA_ACCOUNT_ID_DEV",
    "HEDERA_PRIVATE_KEY_DEV", 
    "HEDERA_PUBLIC_KEY_DEV"
)

foreach ($secret in $devSecrets) {
    Write-Host "🔐 Configurando $secret..." -ForegroundColor Cyan
    $value = Read-Host "Digite o valor para $secret"
    
    if ($value) {
        try {
            wrangler secret put $secret --env development
            Write-Host "✅ $secret configurado com sucesso" -ForegroundColor Green
        } catch {
            Write-Host "❌ Erro ao configurar $secret" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "📋 Configurando secrets para ambiente de produção..." -ForegroundColor Yellow

# Secrets para produção
$prodSecrets = @(
    "HEDERA_ACCOUNT_ID_PROD",
    "HEDERA_PRIVATE_KEY_PROD",
    "HEDERA_PUBLIC_KEY_PROD"
)

foreach ($secret in $prodSecrets) {
    Write-Host "🔐 Configurando $secret..." -ForegroundColor Cyan
    $value = Read-Host "Digite o valor para $secret"
    
    if ($value) {
        try {
            wrangler secret put $secret --env production
            Write-Host "✅ $secret configurado com sucesso" -ForegroundColor Green
        } catch {
            Write-Host "❌ Erro ao configurar $secret" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "🎉 Configuração de secrets concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Teste a conexão: npm run test:hedera"
Write-Host "2. Deploy para desenvolvimento: npm run deploy:dev"
Write-Host "3. Deploy para produção: npm run deploy:prod"
Write-Host ""
Write-Host "📚 Documentação:" -ForegroundColor Cyan
Write-Host "- Portal Hedera: https://portal.hedera.com/"
Write-Host "- Cloudflare Workers: https://developers.cloudflare.com/workers/" 