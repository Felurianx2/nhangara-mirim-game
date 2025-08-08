# 🔐 Setup Secrets Script
# Script para configurar secrets no Cloudflare

"🔐 Configurando Secrets Store do Cloudflare..." -ForegroundColor Green

# Verificar se wrangler está instalado
try {
    $wranglerVersion = wrangler --version
"✅ Wrangler encontrado: $wranglerVersion" -ForegroundColor Green
} catch {
"❌ Wrangler não encontrado. Instale com: npm install -g wrangler" -ForegroundColor Red
    exit 1
}

# Função para configurar secret
function Set-Secret {
    param(
        [string]$SecretName,
        [string]$Description
    )
    
    "`n🔑 Configurando $SecretName..." -ForegroundColor Yellow
  "📝 $Description" -ForegroundColor Cyan
    
    $secretValue = Read-Host "Digite o valor do secret (ou pressione Enter para pular)"
    
    if ($secretValue -and $secretValue.Trim() -ne "") {
        try {
            wrangler secret put $SecretName
            Write-Host "✅ $SecretName configurado com sucesso!" -ForegroundColor Green
        } catch {
            Write-Host "❌ Erro ao configurar $SecretName" -ForegroundColor Red
        }
    } else {
        Write-Host "⏭️ $SecretName pulado" -ForegroundColor Yellow
    }
}

# Secrets da Hedera - Desenvolvimento
"`n🌿 Configurando Secrets da Hedera Hashgraph - DESENVOLVIMENTO..." -ForegroundColor Magenta

Set-Secret -SecretName "HEDERA_ACCOUNT_ID_DEV" -Description "ID da conta Hedera DEV (testnet)"
Set-Secret -SecretName "HEDERA_PRIVATE_KEY_DEV" -Description "Chave privada Hedera DEV (formato DER)"
Set-Secret -SecretName "HEDERA_PUBLIC_KEY_DEV" -Description "Chave pública Hedera DEV (formato DER)"

# Secrets da Hedera - Produção
"`n🌿 Configurando Secrets da Hedera Hashgraph - PRODUÇÃO..." -ForegroundColor Magenta

Set-Secret -SecretName "HEDERA_ACCOUNT_ID_PROD" -Description "ID da conta Hedera PROD (mainnet)"
Set-Secret -SecretName "HEDERA_PRIVATE_KEY_PROD" -Description "Chave privada Hedera PROD (formato DER)"
Set-Secret -SecretName "HEDERA_PUBLIC_KEY_PROD" -Description "Chave pública Hedera PROD (formato DER)"

# Secrets do Google OAuth - Desenvolvimento
"`n🔐 Configurando Secrets do Google OAuth - DESENVOLVIMENTO..." -ForegroundColor Magenta

Set-Secret -SecretName "GOOGLE_CLIENT_ID_DEV" -Description "Client ID do Google OAuth DEV"
Set-Secret -SecretName "GOOGLE_CLIENT_SECRET_DEV" -Description "Client Secret do Google OAuth DEV"

# Secrets do Google OAuth - Produção
"`n🔐 Configurando Secrets do Google OAuth - PRODUÇÃO..." -ForegroundColor Magenta

Set-Secret -SecretName "GOOGLE_CLIENT_ID_PROD" -Description "Client ID do Google OAuth PROD"
Set-Secret -SecretName "GOOGLE_CLIENT_SECRET_PROD" -Description "Client Secret do Google OAuth PROD"

# Secrets do Cloudflare
"`n☁️ Configurando Secrets do Cloudflare..." -ForegroundColor Magenta

Set-Secret -SecretName "CLOUDFLARE_API_TOKEN" -Description "API Token do Cloudflare"
Set-Secret -SecretName "CLOUDFLARE_ACCOUNT_ID" -Description "Account ID do Cloudflare"

# Verificar secrets configurados
"`n📋 Verificando secrets configurados..." -ForegroundColor Green

try {
    $secrets = wrangler secret list
    Write-Host "✅ Secrets encontrados:" -ForegroundColor Green
    Write-Host $secrets -ForegroundColor Cyan
} catch {
    "❌ Erro ao listar secrets" -ForegroundColor Red
}

"`n🎉 Configuração de secrets concluída!" -ForegroundColor Green
"📚 Consulte docs/SECRETS_SETUP.md para mais informações" -ForegroundColor Cyan 
