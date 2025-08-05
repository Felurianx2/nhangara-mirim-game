# 🗄️ Configuração do Banco de Dados - Cloudflare D1

## 📋 Pré-requisitos

- ✅ Conta no Cloudflare
- ✅ Wrangler CLI instalado
- ✅ Projeto configurado

## 🔧 Passos para Configurar o Banco

### 1. Criar Banco de Dados D1

```bash
# Criar banco de dados
wrangler d1 create nhangara-mirim-db

# Exemplo de resposta:
# ✅ Created D1 database 'nhangara-mirim-db' in region APAC
# Add the following to your wrangler.toml:
# [[d1_databases]]
# binding = "DB"
# database_name = "nhangara-mirim-db"
# database_id = "abc123-def456-ghi789"
```

### 2. Atualizar wrangler.toml

Substitua `your-database-id-here` pelo ID real retornado:

```toml
[[d1_databases]]
binding = "DB"
database_name = "nhangara-mirim-db"
database_id = "abc123-def456-ghi789"  # ID real do seu banco
```

### 3. Executar Schema

```bash
# Executar schema SQL
wrangler d1 execute nhangara-mirim-db --file=./schema.sql
```

### 4. Verificar Tabelas

```bash
# Verificar se as tabelas foram criadas
wrangler d1 execute nhangara-mirim-db --command="SELECT name FROM sqlite_master WHERE type='table';"
```

## 📊 Estrutura do Banco

### **Tabelas Criadas:**

1. **`users`** - Dados dos usuários
   - `id` (PRIMARY KEY)
   - `email` (UNIQUE)
   - `name`
   - `picture`
   - `google_id` (UNIQUE)
   - `created_at`
   - `last_login`
   - `is_active`

2. **`wallets`** - Carteiras Hedera
   - `id` (PRIMARY KEY)
   - `user_id` (FOREIGN KEY)
   - `account_id` (UNIQUE)
   - `private_key`
   - `public_key`
   - `balance_hbar`
   - `created_at`

3. **`user_progress`** - Progresso do jogo
   - `id` (PRIMARY KEY)
   - `user_id` (FOREIGN KEY)
   - `level`
   - `experience_points`
   - `seeds_earned`
   - `welcome_video_seen`
   - `created_at`
   - `updated_at`

4. **`nfts`** - Bio-Amuletos
   - `id` (PRIMARY KEY)
   - `user_id` (FOREIGN KEY)
   - `nft_id`
   - `name`
   - `description`
   - `image_url`
   - `biome_id`
   - `minted_at`

5. **`sessions`** - Sessões de usuário
   - `id` (PRIMARY KEY)
   - `user_id` (FOREIGN KEY)
   - `session_token` (UNIQUE)
   - `expires_at`
   - `created_at`

## 🔄 Migração de Dados

### **De localStorage para D1:**

```javascript
// No frontend, quando usuário fizer login
const migrateUserData = async (userData) => {
  try {
    const response = await fetch('/api/migrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (response.ok) {
      // Dados migrados com sucesso
      localStorage.removeItem('userData'); // Limpar localStorage
    }
  } catch (error) {
    console.error('Erro na migração:', error);
  }
};
```

## 🚀 Deploy com Banco

### 1. Deploy do Worker

```bash
# Deploy das funções API
wrangler deploy functions/api.ts
```

### 2. Deploy do Frontend

```bash
# Build e deploy
npm run build
wrangler pages deploy dist --project-name nhangara-mirim-game
```

## 📈 Monitoramento

### **Verificar Dados:**

```bash
# Listar usuários
wrangler d1 execute nhangara-mirim-db --command="SELECT * FROM users;"

# Verificar progresso
wrangler d1 execute nhangara-mirim-db --command="SELECT * FROM user_progress;"

# Verificar wallets
wrangler d1 execute nhangara-mirim-db --command="SELECT * FROM wallets;"
```

### **Backup:**

```bash
# Exportar dados
wrangler d1 export nhangara-mirim-db --output=backup.sql
```

## 🔐 Segurança

### **Boas Práticas:**

1. **Criptografar** chaves privadas das wallets
2. **Validar** dados de entrada
3. **Sanitizar** queries SQL
4. **Rate limiting** nas APIs
5. **Logs** de auditoria

### **Environment Variables:**

```bash
# Configurar variáveis de ambiente
wrangler secret put ENCRYPTION_KEY
wrangler secret put JWT_SECRET
```

## 🎯 Próximos Passos

1. **Criar banco** D1 no Cloudflare
2. **Executar schema** SQL
3. **Configurar** wrangler.toml
4. **Deploy** das APIs
5. **Migrar** dados existentes
6. **Testar** funcionalidades

---

**🗄️ Banco de Dados Cloudflare D1 - Nhangara Mirim Game**
**📅 Data**: $(date)
**🔄 Versão**: 1.0.0 