# 🔐 Secrets Store Setup / Configuração do Secrets Store

## 🇧🇷 **Português**

### 🎯 **Objetivo**

Configurar o Cloudflare Secrets Store para armazenar de forma segura as chaves da Hedera Hashgraph e outras informações sensíveis do projeto.

### 📋 **Secrets Necessários**

#### **🔑 Hedera Hashgraph**
```bash
# Chaves da conta Hedera
HEDERA_ACCOUNT_ID=0.0.1234567
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...
HEDERA_PUBLIC_KEY=302a300506032b6570032100...

# Configuração da rede
HEDERA_NETWORK=mainnet
HEDERA_MIRROR_NODE=https://mainnet-public.mirrornode.hedera.com
```

#### **🔐 Google OAuth**
```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### **🌐 Cloudflare**
```bash
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
```

### 🚀 **Como Configurar**

#### **1. Acessar o Secrets Store**
1. Faça login no [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navegue para **Compute > Workers**
3. Clique em **Secrets Store**
4. Clique em **+ Create secret**

#### **2. Criar os Secrets**
Para cada secret, siga estes passos:

1. **Nome do Secret**: Use o nome exato (ex: `HEDERA_ACCOUNT_ID`)
2. **Valor**: Cole o valor correspondente
3. **Clique em "Create secret"**

#### **3. Secrets Obrigatórios**

| Secret | Descrição | Exemplo |
|--------|-----------|---------|
| `HEDERA_ACCOUNT_ID` | ID da conta Hedera | `0.0.1234567` |
| `HEDERA_PRIVATE_KEY` | Chave privada Hedera | `302e020100300506032b657004220420...` |
| `HEDERA_PUBLIC_KEY` | Chave pública Hedera | `302a300506032b6570032100...` |
| `HEDERA_NETWORK` | Rede Hedera | `mainnet` ou `testnet` |
| `GOOGLE_CLIENT_ID` | Client ID do Google OAuth | `123456789.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Client Secret do Google OAuth | `GOCSPX-...` |

### 🔧 **Configuração no Código**

#### **1. Estrutura do wrangler.toml**
```toml
name = "nhangara-mirim-game"
compatibility_date = "2024-01-01"

[site]
bucket = "./dist"

[[d1_databases]]
binding = "DB"
database_name = "nhangara-mirim-db"
database_id = "03c406ca-cbc4-49a3-9e1c-442e670255ea"

# Environment variables
[vars]
HEDERA_NETWORK = "mainnet"
ENVIRONMENT = "production"

# Development environment
[env.development]
name = "nhangara-mirim-game-dev"
compatibility_date = "2024-01-01"

[env.development.vars]
HEDERA_NETWORK = "testnet"
ENVIRONMENT = "development"

# Production environment
[env.production]
name = "nhangara-mirim-game"
compatibility_date = "2024-01-01"

[env.production.vars]
HEDERA_NETWORK = "mainnet"
ENVIRONMENT = "production"

# Secrets são configurados via Cloudflare Dashboard ou wrangler secret put
# Os secrets ficam armazenados no Cloudflare Secrets Store
# e são acessados pelos Workers através da variável env
```

#### **2. Acessar no Worker**
```typescript
// functions/api.ts
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // Acessar secrets
    const accountId = env.HEDERA_ACCOUNT_ID;
    const privateKey = env.HEDERA_PRIVATE_KEY;
    const publicKey = env.HEDERA_PUBLIC_KEY;
    
    // Usar os secrets...
  }
};
```

### 🛡️ **Segurança**

#### **✅ Boas Práticas**
- ✅ Nunca commite secrets no Git
- ✅ Use diferentes secrets para dev/prod
- ✅ Rotacione as chaves regularmente
- ✅ Monitore o uso dos secrets
- ✅ Use permissões mínimas necessárias

#### **❌ O que NÃO fazer**
- ❌ Não commite chaves no código
- ❌ Não use a mesma chave em dev/prod
- ❌ Não compartilhe secrets via email
- ❌ Não deixe secrets em logs

---

## 🇺🇸 **English**

### 🎯 **Objective**

Configure Cloudflare Secrets Store to securely store Hedera Hashgraph keys and other sensitive project information.

### 📋 **Required Secrets**

#### **🔑 Hedera Hashgraph**
```bash
# Hedera account keys
HEDERA_ACCOUNT_ID=0.0.1234567
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...
HEDERA_PUBLIC_KEY=302a300506032b6570032100...

# Network configuration
HEDERA_NETWORK=mainnet
HEDERA_MIRROR_NODE=https://mainnet-public.mirrornode.hedera.com
```

#### **🔐 Google OAuth**
```bash
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### **🌐 Cloudflare**
```bash
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
```

### 🚀 **How to Configure**

#### **1. Access Secrets Store**
1. Login to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Compute > Workers**
3. Click **Secrets Store**
4. Click **+ Create secret**

#### **2. Create Secrets**
For each secret, follow these steps:

1. **Secret Name**: Use exact name (ex: `HEDERA_ACCOUNT_ID`)
2. **Value**: Paste corresponding value
3. **Click "Create secret"**

#### **3. Required Secrets**

| Secret | Description | Example |
|--------|-------------|---------|
| `HEDERA_ACCOUNT_ID` | Hedera account ID | `0.0.1234567` |
| `HEDERA_PRIVATE_KEY` | Hedera private key | `302e020100300506032b657004220420...` |
| `HEDERA_PUBLIC_KEY` | Hedera public key | `302a300506032b6570032100...` |
| `HEDERA_NETWORK` | Hedera network | `mainnet` or `testnet` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | `123456789.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | `GOCSPX-...` |

### 🔧 **Code Configuration**

#### **1. Update wrangler.toml**
```toml
[env.production]
name = "nhangara-mirim-game"
compatibility_date = "2024-01-01"

[env.production.vars]
HEDERA_NETWORK = "mainnet"

[env.production.secrets]
HEDERA_ACCOUNT_ID = "0.0.1234567"
HEDERA_PRIVATE_KEY = "302e020100300506032b657004220420..."
HEDERA_PUBLIC_KEY = "302a300506032b6570032100..."
GOOGLE_CLIENT_ID = "123456789.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "GOCSPX-..."
```

#### **2. Access in Worker**
```typescript
// functions/api.ts
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    // Access secrets
    const accountId = env.HEDERA_ACCOUNT_ID;
    const privateKey = env.HEDERA_PRIVATE_KEY;
    const publicKey = env.HEDERA_PUBLIC_KEY;
    
    // Use secrets...
  }
};
```

### 🛡️ **Security**

#### **✅ Best Practices**
- ✅ Never commit secrets to Git
- ✅ Use different secrets for dev/prod
- ✅ Rotate keys regularly
- ✅ Monitor secret usage
- ✅ Use minimum required permissions

#### **❌ What NOT to do**
- ❌ Don't commit keys in code
- ❌ Don't use same key in dev/prod
- ❌ Don't share secrets via email
- ❌ Don't leave secrets in logs

---

## 🔄 **Commands / Comandos**

### **🇧🇷 Comandos Úteis**

```bash
# Listar secrets
wrangler secret list

# Criar secret para ambiente específico
wrangler secret put HEDERA_ACCOUNT_ID_DEV --env development
wrangler secret put HEDERA_ACCOUNT_ID_PROD --env production

# Criar secret global (para todos os ambientes)
wrangler secret put HEDERA_ACCOUNT_ID

# Deletar secret
wrangler secret delete HEDERA_ACCOUNT_ID_DEV --env development

# Verificar secrets por ambiente
wrangler secret list --env development
wrangler secret list --env production

# Deploy para ambiente específico
wrangler pages deploy dist --env development
wrangler pages deploy dist --env production
```

### **🇺🇸 Useful Commands**

```bash
# List secrets
wrangler secret list

# Create secret for specific environment
wrangler secret put HEDERA_ACCOUNT_ID_DEV --env development
wrangler secret put HEDERA_ACCOUNT_ID_PROD --env production

# Create global secret (for all environments)
wrangler secret put HEDERA_ACCOUNT_ID

# Delete secret
wrangler secret delete HEDERA_ACCOUNT_ID_DEV --env development

# Check secrets by environment
wrangler secret list --env development
wrangler secret list --env production

# Deploy to specific environment
wrangler pages deploy dist --env development
wrangler pages deploy dist --env production
```

---

<div align="center">
  <p><strong>🔐 Secure secrets management for production deployment</strong></p>
  <p><em>Protecting sensitive data in the cloud</em></p>
</div> 