# 🛡️ Security Guide / Guia de Segurança

## 🇧🇷 **Português**

### 🎯 **Visão Geral de Segurança**

Este projeto implementa múltiplas camadas de segurança para proteger dados sensíveis, secrets e APIs. Todas as medidas seguem as melhores práticas da indústria.

### 🔐 **Camadas de Segurança Implementadas**

#### **1. 🔑 Secrets Management**
- ✅ **Cloudflare Secrets Store** - Armazenamento seguro
- ✅ **Validação de formato** - Verificação de chaves Hedera
- ✅ **Separação por ambiente** - Dev/Prod isolados
- ✅ **Criptografia em repouso** - Dados sempre criptografados

#### **2. 🛡️ API Security**
- ✅ **Rate Limiting** - Proteção contra ataques DDoS
- ✅ **Input Sanitization** - Prevenção de XSS
- ✅ **Security Headers** - Headers de proteção
- ✅ **CORS Configuration** - Controle de acesso
- ✅ **Audit Logging** - Logs de auditoria

#### **3. 🔒 Data Protection**
- ✅ **AES-256-GCM** - Criptografia avançada
- ✅ **Hash Validation** - Verificação de integridade
- ✅ **Session Management** - Tokens seguros
- ✅ **Data Sanitization** - Limpeza de dados

#### **4. 🌐 Network Security**
- ✅ **HTTPS Only** - Conexões criptografadas
- ✅ **Security Headers** - Proteção adicional
- ✅ **Content Security Policy** - Prevenção de ataques
- ✅ **XSS Protection** - Proteção contra XSS

### 📋 **Configurações de Segurança**

#### **Rate Limiting**
```typescript
// Configurações de rate limiting
MAX_REQUESTS_PER_MINUTE: 100
RATE_LIMIT_WINDOW_MS: 60000
```

#### **Security Headers**
```typescript
// Headers de segurança implementados
'X-Content-Type-Options': 'nosniff'
'X-Frame-Options': 'DENY'
'X-XSS-Protection': '1; mode=block'
'Referrer-Policy': 'strict-origin-when-cross-origin'
'Content-Security-Policy': "default-src 'self'"
```

#### **Validação de Secrets**
```typescript
// Validação de formato Hedera
validateHederaAccountId(accountId: string): boolean
validateHederaKey(key: string): boolean
```

### 🚨 **Monitoramento de Segurança**

#### **Eventos Monitorados**
- 🔍 **API Requests** - Todas as requisições
- 🚫 **Rate Limit Exceeded** - Tentativas de abuso
- ⚠️ **Missing Headers** - Headers de segurança ausentes
- 🔐 **Secret Validation** - Validação de secrets
- 🛡️ **Security Events** - Eventos de segurança

#### **Logs de Auditoria**
```typescript
// Exemplo de log de auditoria
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "event": "API_REQUEST",
  "details": {
    "method": "POST",
    "url": "/api/auth/login",
    "clientIP": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  },
  "environment": "production"
}
```

### 🔧 **Implementação Técnica**

#### **1. Security Manager**
```typescript
// Singleton para gerenciamento de segurança
const security = SecurityManager.getInstance();

// Validação de rate limiting
if (!security.checkRateLimit(clientIP)) {
  return new Response('Too Many Requests', { status: 429 });
}

// Geração de tokens seguros
const sessionToken = security.generateSecureSessionToken();
```

#### **2. Secrets Validator**
```typescript
// Validação de secrets Hedera
const secrets = {
  HEDERA_ACCOUNT_ID: env.HEDERA_ACCOUNT_ID_PROD,
  HEDERA_PRIVATE_KEY: env.HEDERA_PRIVATE_KEY_PROD,
  HEDERA_PUBLIC_KEY: env.HEDERA_PUBLIC_KEY_PROD,
};

if (!SecretsValidator.validateHederaSecrets(secrets)) {
  console.error('❌ Invalid secrets configuration');
  return new Response('Internal Server Error', { status: 500 });
}
```

#### **3. Security Middleware**
```typescript
// Middleware de segurança para Workers
const securityMiddleware = createSecurityMiddleware();

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return securityMiddleware(request, env, async (req, env) => {
      // Lógica da API com proteção
    });
  }
};
```

### 🛡️ **Boas Práticas Implementadas**

#### **✅ Segurança de Secrets**
- ✅ Nunca commite secrets no Git
- ✅ Use diferentes secrets para dev/prod
- ✅ Valide formato das chaves
- ✅ Monitore uso dos secrets
- ✅ Rotacione chaves regularmente

#### **✅ Segurança de API**
- ✅ Implemente rate limiting
- ✅ Valide todos os inputs
- ✅ Use HTTPS sempre
- ✅ Configure CORS adequadamente
- ✅ Implemente audit logging

#### **✅ Segurança de Dados**
- ✅ Criptografe dados sensíveis
- ✅ Valide integridade dos dados
- ✅ Sanitize inputs
- ✅ Use tokens seguros
- ✅ Implemente timeouts

### 🔍 **Testes de Segurança**

#### **1. Validação de Secrets**
```bash
# Testar validação de secrets
npm run test:security
```

#### **2. Rate Limiting**
```bash
# Testar rate limiting
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

#### **3. Security Headers**
```bash
# Verificar headers de segurança
curl -I http://localhost:3000/api/health
```

---

## 🇺🇸 **English**

### 🎯 **Security Overview**

This project implements multiple security layers to protect sensitive data, secrets, and APIs. All measures follow industry best practices.

### 🔐 **Security Layers Implemented**

#### **1. 🔑 Secrets Management**
- ✅ **Cloudflare Secrets Store** - Secure storage
- ✅ **Format validation** - Hedera key verification
- ✅ **Environment separation** - Dev/Prod isolation
- ✅ **Encryption at rest** - Data always encrypted

#### **2. 🛡️ API Security**
- ✅ **Rate Limiting** - DDoS protection
- ✅ **Input Sanitization** - XSS prevention
- ✅ **Security Headers** - Protection headers
- ✅ **CORS Configuration** - Access control
- ✅ **Audit Logging** - Audit logs

#### **3. 🔒 Data Protection**
- ✅ **AES-256-GCM** - Advanced encryption
- ✅ **Hash Validation** - Integrity verification
- ✅ **Session Management** - Secure tokens
- ✅ **Data Sanitization** - Data cleaning

#### **4. 🌐 Network Security**
- ✅ **HTTPS Only** - Encrypted connections
- ✅ **Security Headers** - Additional protection
- ✅ **Content Security Policy** - Attack prevention
- ✅ **XSS Protection** - XSS protection

### 📋 **Security Configurations**

#### **Rate Limiting**
```typescript
// Rate limiting configurations
MAX_REQUESTS_PER_MINUTE: 100
RATE_LIMIT_WINDOW_MS: 60000
```

#### **Security Headers**
```typescript
// Implemented security headers
'X-Content-Type-Options': 'nosniff'
'X-Frame-Options': 'DENY'
'X-XSS-Protection': '1; mode=block'
'Referrer-Policy': 'strict-origin-when-cross-origin'
'Content-Security-Policy': "default-src 'self'"
```

#### **Secrets Validation**
```typescript
// Hedera format validation
validateHederaAccountId(accountId: string): boolean
validateHederaKey(key: string): boolean
```

### 🚨 **Security Monitoring**

#### **Monitored Events**
- 🔍 **API Requests** - All requests
- 🚫 **Rate Limit Exceeded** - Abuse attempts
- ⚠️ **Missing Headers** - Missing security headers
- 🔐 **Secret Validation** - Secrets validation
- 🛡️ **Security Events** - Security events

#### **Audit Logs**
```typescript
// Audit log example
{
  "timestamp": "2024-01-01T00:00:00.000Z",
  "event": "API_REQUEST",
  "details": {
    "method": "POST",
    "url": "/api/auth/login",
    "clientIP": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  },
  "environment": "production"
}
```

### 🔧 **Technical Implementation**

#### **1. Security Manager**
```typescript
// Singleton for security management
const security = SecurityManager.getInstance();

// Rate limiting validation
if (!security.checkRateLimit(clientIP)) {
  return new Response('Too Many Requests', { status: 429 });
}

// Secure token generation
const sessionToken = security.generateSecureSessionToken();
```

#### **2. Secrets Validator**
```typescript
// Hedera secrets validation
const secrets = {
  HEDERA_ACCOUNT_ID: env.HEDERA_ACCOUNT_ID_PROD,
  HEDERA_PRIVATE_KEY: env.HEDERA_PRIVATE_KEY_PROD,
  HEDERA_PUBLIC_KEY: env.HEDERA_PUBLIC_KEY_PROD,
};

if (!SecretsValidator.validateHederaSecrets(secrets)) {
  console.error('❌ Invalid secrets configuration');
  return new Response('Internal Server Error', { status: 500 });
}
```

#### **3. Security Middleware**
```typescript
// Security middleware for Workers
const securityMiddleware = createSecurityMiddleware();

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return securityMiddleware(request, env, async (req, env) => {
      // API logic with protection
    });
  }
};
```

### 🛡️ **Best Practices Implemented**

#### **✅ Secrets Security**
- ✅ Never commit secrets to Git
- ✅ Use different secrets for dev/prod
- ✅ Validate key formats
- ✅ Monitor secret usage
- ✅ Rotate keys regularly

#### **✅ API Security**
- ✅ Implement rate limiting
- ✅ Validate all inputs
- ✅ Use HTTPS always
- ✅ Configure CORS properly
- ✅ Implement audit logging

#### **✅ Data Security**
- ✅ Encrypt sensitive data
- ✅ Validate data integrity
- ✅ Sanitize inputs
- ✅ Use secure tokens
- ✅ Implement timeouts

### 🔍 **Security Testing**

#### **1. Secrets Validation**
```bash
# Test secrets validation
npm run test:security
```

#### **2. Rate Limiting**
```bash
# Test rate limiting
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

#### **3. Security Headers**
```bash
# Check security headers
curl -I http://localhost:3000/api/health
```

---

<div align="center">
  <p><strong>🛡️ Enterprise-grade security for production deployment</strong></p>
  <p><em>Protecting your application with industry best practices</em></p>
</div> 