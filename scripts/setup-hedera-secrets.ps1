# Script para configurar secrets do Hedera no Cloudflare Workers
# Execute este script após obter suas credenciais do portal Hedera

 "🔧 Configurando Secrets do Hedera no Cloudflare Workers" -ForegroundColor Green
""

# Verificar se o wrangler está instalado
try {
    $wranglerVersion = wrangler --version
    "✅ Wrangler encontrado: $wranglerVersion" -ForegroundColor Green
} catch {
  "❌ Wrangler não encontrado. Instale com: npm install -g wrangler" -ForegroundColor Red
    exit 1
}

"📋 Configurando secrets para ambiente de desenvolvimento..." -ForegroundColor Yellow

# Secrets para desenvolvimento
$devSecrets = @(
    "HEDERA_ACCOUNT_ID_DEV",
    "HEDERA_PRIVATE_KEY_DEV", 
    "HEDERA_PUBLIC_KEY_DEV"
)

foreach ($secret in $devSecrets) {
    "🔐 Configurando $secret..." -ForegroundColor Cyan
    $value = Read-Host "Digite o valor para $secret"
    
    if ($value) {
        try {
            wrangler secret put $secret --env development
           "✅ $secret configurado com sucesso" -ForegroundColor Green
        } catch {
          "❌ Erro ao configurar $secret" -ForegroundColor Red
        }
    }
}

 "📋 Configurando secrets para ambiente de produção..." -ForegroundColor Yellow

# Secrets para produção
$prodSecrets = @(
    "HEDERA_ACCOUNT_ID_PROD",
    "HEDERA_PRIVATE_KEY_PROD",
    "HEDERA_PUBLIC_KEY_PROD"
)

foreach ($secret in $prodSecrets) {
     "🔐 Configurando $secret..." -ForegroundColor Cyan
    $value = Read-Host "Digite o valor para $secret"
    
    if ($value) {
        try {
            wrangler secret put $secret --env production
            Write-Host "✅ $secret configurado com sucesso" -ForegroundColor Green
        } catch {
          "❌ Erro ao configurar $secret" -ForegroundColor Red
        }
    }
}

"🎉 Configuração de secrets concluída!" -ForegroundColor Green
""
"💡 Próximos passos:" -ForegroundColor Yellow
"1. Teste a conexão: npm run test:hedera"
"2. Deploy para desenvolvimento: npm run deploy:dev"
"3. Deploy para produção: npm run deploy:prod"
""
"📚 Documentação:" -ForegroundColor Cyan
"- Portal Hedera: https://portal.hedera.com/"
"- Cloudflare Workers: https://developers.cloudflare.com/workers/" 
