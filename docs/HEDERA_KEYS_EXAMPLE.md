# 🔑 Hedera Keys Example / Exemplo de Chaves Hedera

## 🇧🇷 **Português**

### 🎯 **Como Gerar Chaves Hedera**

#### **1. Usando o Portal Hedera**
1. Acesse [portal.hedera.com](https://portal.hedera.com)
2. Faça login ou crie uma conta
3. Vá para **Accounts**
4. Clique em **Create Account**
5. Escolha **Create Account with Key**
6. Salve as chaves geradas

#### **2. Usando o SDK Hedera**
```javascript
const { PrivateKey, AccountId } = require("@hashgraph/sdk");

// Gerar nova chave privada
const privateKey = PrivateKey.generateED25519();
const publicKey = privateKey.publicKey;

console.log("Private Key:", privateKey.toString());
console.log("Public Key:", publicKey.toString());
```

#### **3. Formato das Chaves**
```bash
# Chave Privada (formato DER)
302e020100300506032b657004220420...

# Chave Pública (formato DER)
302a300506032b6570032100...

# Account ID
0.0.1234567
```

### 📋 **Exemplo de Secrets**

```bash
# Secrets para configurar no Cloudflare
HEDERA_ACCOUNT_ID=0.0.1234567
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...
HEDERA_PUBLIC_KEY=302a300506032b6570032100...
HEDERA_NETWORK=mainnet
```

### 🔧 **Configuração no Código**

#### **1. Inicializar Cliente**
```typescript
import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";

const accountId = AccountId.fromString("0.0.1234567");
const privateKey = PrivateKey.fromString("302e020100300506032b657004220420...");

const client = Client.forName("mainnet")
  .setOperator(accountId, privateKey);
```

#### **2. Verificar Conectividade**
```typescript
const accountInfo = await new AccountBalanceQuery()
  .setAccountId(accountId)
  .execute(client);

console.log("Balance:", accountInfo.hbars.toString());
```

---

## 🇺🇸 **English**

### 🎯 **How to Generate Hedera Keys**

#### **1. Using Hedera Portal**
1. Go to [portal.hedera.com](https://portal.hedera.com)
2. Login or create an account
3. Go to **Accounts**
4. Click **Create Account**
5. Choose **Create Account with Key**
6. Save the generated keys

#### **2. Using Hedera SDK**
```javascript
const { PrivateKey, AccountId } = require("@hashgraph/sdk");

// Generate new private key
const privateKey = PrivateKey.generateED25519();
const publicKey = privateKey.publicKey;

console.log("Private Key:", privateKey.toString());
console.log("Public Key:", publicKey.toString());
```

#### **3. Key Format**
```bash
# Private Key (DER format)
302e020100300506032b657004220420...

# Public Key (DER format)
302a300506032b6570032100...

# Account ID
0.0.1234567
```

### 📋 **Secrets Example**

```bash
# Secrets to configure in Cloudflare
HEDERA_ACCOUNT_ID=0.0.1234567
HEDERA_PRIVATE_KEY=302e020100300506032b657004220420...
HEDERA_PUBLIC_KEY=302a300506032b6570032100...
HEDERA_NETWORK=mainnet
```

### 🔧 **Code Configuration**

#### **1. Initialize Client**
```typescript
import { Client, AccountId, PrivateKey } from "@hashgraph/sdk";

const accountId = AccountId.fromString("0.0.1234567");
const privateKey = PrivateKey.fromString("302e020100300506032b657004220420...");

const client = Client.forName("mainnet")
  .setOperator(accountId, privateKey);
```

#### **2. Check Connectivity**
```typescript
const accountInfo = await new AccountBalanceQuery()
  .setAccountId(accountId)
  .execute(client);

console.log("Balance:", accountInfo.hbars.toString());
```

---

## 🛡️ **Security Tips / Dicas de Segurança**

### **🇧🇷 Dicas de Segurança**

- ✅ **Nunca compartilhe** chaves privadas
- ✅ **Use diferentes contas** para dev/prod
- ✅ **Monitore transações** regularmente
- ✅ **Backup seguro** das chaves
- ✅ **Rotacione chaves** periodicamente

### **🇺🇸 Security Tips**

- ✅ **Never share** private keys
- ✅ **Use different accounts** for dev/prod
- ✅ **Monitor transactions** regularly
- ✅ **Secure backup** of keys
- ✅ **Rotate keys** periodically

---

## 🔄 **Commands / Comandos**

### **🇧🇷 Comandos Úteis**

```bash
# Verificar saldo
wrangler secret list

# Configurar secret
wrangler secret put HEDERA_ACCOUNT_ID

# Testar conectividade
npm run test:hedera
```

### **🇺🇸 Useful Commands**

```bash
# Check balance
wrangler secret list

# Set secret
wrangler secret put HEDERA_ACCOUNT_ID

# Test connectivity
npm run test:hedera
```

---

<div align="center">
  <p><strong>🔑 Secure key management for blockchain integration</strong></p>
  <p><em>Protecting Hedera credentials in production</em></p>
</div> 