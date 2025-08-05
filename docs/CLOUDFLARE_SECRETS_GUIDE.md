# 🔐 Cloudflare Secrets Guide / Guia de Secrets do Cloudflare

## 🇧🇷 **Português**

### 🎯 **Como Funcionam os Secrets no Cloudflare**

Os secrets no Cloudflare são armazenados de forma segura no **Cloudflare Secrets Store** e são acessados pelos Workers através da variável `env`. Eles **NÃO** ficam no código ou no `wrangler.toml`.

### 📋 **Estrutura de Secrets por Ambiente**

#### **🔧 Desenvolvimento (testnet)**
```bash
# Secrets específicos para desenvolvimento
HEDERA_ACCOUNT_ID_DEV
HEDERA_PRIVATE_KEY_DEV
HEDERA_PUBLIC_KEY_DEV
GOOGLE_CLIENT_ID_DEV
GOOGLE_CLIENT_SECRET_DEV
```

#### **🚀 Produção (mainnet)**
```bash
# Secrets específicos para produção
HEDERA_ACCOUNT_ID_PROD
HEDERA_PRIVATE_KEY_PROD
HEDERA_PUBLIC_KEY_PROD
GOOGLE_CLIENT_ID_PROD
GOOGLE_CLIENT_SECRET_PROD
```

#### **☁️ Secrets Compartilhados**
```bash
# Secrets usados em todos os ambientes
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

### 🚀 **Como Configurar**

#### **1. Via Cloudflare Dashboard**
1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navegue para **Compute > Workers**
3. Clique em **Secrets Store**
4. Clique em **+ Create secret**
5. Digite o nome do secret (ex: `HEDERA_ACCOUNT_ID_DEV`)
6. Cole o valor do secret
7. Clique em **Create secret**

#### **2. Via Wrangler CLI**

**Para ambiente específico:**
```bash
# Desenvolvimento
wrangler secret put HEDERA_ACCOUNT_ID_DEV --env development
wrangler secret put HEDERA_PRIVATE_KEY_DEV --env development
wrangler secret put HEDERA_PUBLIC_KEY_DEV --env development

# Produção
wrangler secret put HEDERA_ACCOUNT_ID_PROD --env production
wrangler secret put HEDERA_PRIVATE_KEY_PROD --env production
wrangler secret put HEDERA_PUBLIC_KEY_PROD --env production
```

**Para todos os ambientes:**
```bash
wrangler secret put CLOUDFLARE_API_TOKEN
wrangler secret put CLOUDFLARE_ACCOUNT_ID
```

### 🔍 **Como Verificar**

#### **Listar Secrets por Ambiente:**
```bash
# Desenvolvimento
wrangler secret list --env development

# Produção
wrangler secret list --env production

# Todos os secrets
wrangler secret list
```

#### **Deploy por Ambiente:**
```bash
# Deploy para desenvolvimento
wrangler pages deploy dist --env development

# Deploy para produção
wrangler pages deploy dist --env production
```

### 💻 **Como Acessar no Código**

```typescript
// functions/api.ts
export interface Env {
  DB: D1Database;
  ENVIRONMENT: string;
  HEDERA_NETWORK: string;
  
  // Development Secrets
  HEDERA_ACCOUNT_ID_DEV?: string;
  HEDERA_PRIVATE_KEY_DEV?: string;
  HEDERA_PUBLIC_KEY_DEV?: string;
  
  // Production Secrets
  HEDERA_ACCOUNT_ID_PROD?: string;
  HEDERA_PRIVATE_KEY_PROD?: string;
  HEDERA_PUBLIC_KEY_PROD?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const environment = env.ENVIRONMENT || 'production';
    const isDev = environment === 'development';
    
    // Acessar secrets baseado no ambiente
    const accountId = isDev ? env.HEDERA_ACCOUNT_ID_DEV : env.HEDERA_ACCOUNT_ID_PROD;
    const privateKey = isDev ? env.HEDERA_PRIVATE_KEY_DEV : env.HEDERA_PRIVATE_KEY_PROD;
    
    console.log(`🔧 Environment: ${environment}`);
    console.log(`🌐 Account ID: ${accountId}`);
  }
};
```

---

## 🇺🇸 **English**

### 🎯 **How Cloudflare Secrets Work**

Secrets in Cloudflare are securely stored in the **Cloudflare Secrets Store** and accessed by Workers through the `env` variable. They are **NOT** stored in code or `wrangler.toml`.

### 📋 **Secret Structure by Environment**

#### **🔧 Development (testnet)**
```bash
# Development-specific secrets
HEDERA_ACCOUNT_ID_DEV
HEDERA_PRIVATE_KEY_DEV
HEDERA_PUBLIC_KEY_DEV
GOOGLE_CLIENT_ID_DEV
GOOGLE_CLIENT_SECRET_DEV
```

#### **🚀 Production (mainnet)**
```bash
# Production-specific secrets
HEDERA_ACCOUNT_ID_PROD
HEDERA_PRIVATE_KEY_PROD
HEDERA_PUBLIC_KEY_PROD
GOOGLE_CLIENT_ID_PROD
GOOGLE_CLIENT_SECRET_PROD
```

#### **☁️ Shared Secrets**
```bash
# Secrets used in all environments
CLOUDFLARE_API_TOKEN
CLOUDFLARE_ACCOUNT_ID
```

### 🚀 **How to Configure**

#### **1. Via Cloudflare Dashboard**
1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Compute > Workers**
3. Click **Secrets Store**
4. Click **+ Create secret**
5. Enter secret name (ex: `HEDERA_ACCOUNT_ID_DEV`)
6. Paste secret value
7. Click **Create secret**

#### **2. Via Wrangler CLI**

**For specific environment:**
```bash
# Development
wrangler secret put HEDERA_ACCOUNT_ID_DEV --env development
wrangler secret put HEDERA_PRIVATE_KEY_DEV --env development
wrangler secret put HEDERA_PUBLIC_KEY_DEV --env development

# Production
wrangler secret put HEDERA_ACCOUNT_ID_PROD --env production
wrangler secret put HEDERA_PRIVATE_KEY_PROD --env production
wrangler secret put HEDERA_PUBLIC_KEY_PROD --env production
```

**For all environments:**
```bash
wrangler secret put CLOUDFLARE_API_TOKEN
wrangler secret put CLOUDFLARE_ACCOUNT_ID
```

### 🔍 **How to Verify**

#### **List Secrets by Environment:**
```bash
# Development
wrangler secret list --env development

# Production
wrangler secret list --env production

# All secrets
wrangler secret list
```

#### **Deploy by Environment:**
```bash
# Deploy to development
wrangler pages deploy dist --env development

# Deploy to production
wrangler pages deploy dist --env production
```

### 💻 **How to Access in Code**

```typescript
// functions/api.ts
export interface Env {
  DB: D1Database;
  ENVIRONMENT: string;
  HEDERA_NETWORK: string;
  
  // Development Secrets
  HEDERA_ACCOUNT_ID_DEV?: string;
  HEDERA_PRIVATE_KEY_DEV?: string;
  HEDERA_PUBLIC_KEY_DEV?: string;
  
  // Production Secrets
  HEDERA_ACCOUNT_ID_PROD?: string;
  HEDERA_PRIVATE_KEY_PROD?: string;
  HEDERA_PUBLIC_KEY_PROD?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const environment = env.ENVIRONMENT || 'production';
    const isDev = environment === 'development';
    
    // Access secrets based on environment
    const accountId = isDev ? env.HEDERA_ACCOUNT_ID_DEV : env.HEDERA_ACCOUNT_ID_PROD;
    const privateKey = isDev ? env.HEDERA_PRIVATE_KEY_DEV : env.HEDERA_PRIVATE_KEY_PROD;
    
    console.log(`🔧 Environment: ${environment}`);
    console.log(`🌐 Account ID: ${accountId}`);
  }
};
```

---

## 🛡️ **Security Best Practices / Melhores Práticas de Segurança**

### **🇧🇷 Dicas de Segurança**

- ✅ **Nunca commite secrets** no Git
- ✅ **Use diferentes secrets** para dev/prod
- ✅ **Monitore o uso** dos secrets
- ✅ **Rotacione chaves** regularmente
- ✅ **Use permissões mínimas** necessárias

### **🇺🇸 Security Tips**

- ✅ **Never commit secrets** to Git
- ✅ **Use different secrets** for dev/prod
- ✅ **Monitor secret usage** regularly
- ✅ **Rotate keys** periodically
- ✅ **Use minimum required** permissions

---

<div align="center">
  <p><strong>🔐 Secure secrets management in the cloud</strong></p>
  <p><em>Protecting sensitive data with Cloudflare</em></p>
</div> 