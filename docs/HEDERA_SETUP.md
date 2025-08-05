# Configuração do Hedera - Nhangara Mirim Game

Este guia explica como configurar a conexão com a rede Hedera para o projeto Nhangara Mirim Game usando **Cloudflare Workers Secrets**.

## 📋 Pré-requisitos

1. **Conta no Portal Hedera**: Acesse [https://portal.hedera.com/](https://portal.hedera.com/) e crie uma conta
2. **Credenciais**: Obtenha suas credenciais (Account ID, Private Key) do portal
3. **Wrangler CLI**: Instale o Wrangler para deploy no Cloudflare Workers
4. **Conta Cloudflare**: Configure sua conta no Cloudflare

## 🚀 Configuração Principal (Cloudflare Workers)

### 1. Configurar Secrets no Cloudflare

Execute o script de configuração de secrets:

```bash
npm run setup-hedera-secrets
```

Este script irá solicitar as seguintes informações:

#### Para Desenvolvimento:
- `HEDERA_ACCOUNT_ID_DEV`
- `HEDERA_PRIVATE_KEY_DEV`
- `HEDERA_PUBLIC_KEY_DEV`

#### Para Produção:
- `HEDERA_ACCOUNT_ID_PROD`
- `HEDERA_PRIVATE_KEY_PROD`
- `HEDERA_PUBLIC_KEY_PROD`

### 2. Configurar Secrets Manualmente

Alternativamente, você pode configurar os secrets manualmente:

```bash
# Para desenvolvimento
wrangler secret put HEDERA_ACCOUNT_ID_DEV
wrangler secret put HEDERA_PRIVATE_KEY_DEV
wrangler secret put HEDERA_PUBLIC_KEY_DEV

# Para produção
wrangler secret put HEDERA_ACCOUNT_ID_PROD
wrangler secret put HEDERA_PRIVATE_KEY_PROD
wrangler secret put HEDERA_PUBLIC_KEY_PROD
```

### 3. Testar a Conexão

Execute o comando de teste para verificar se tudo está configurado corretamente:

```bash
npm run test:hedera-connectivity
```

### 4. Deploy

```bash
# Deploy para desenvolvimento
npm run deploy:dev

# Deploy para produção
npm run deploy:prod
```

## 🔧 Configuração Local (Opcional)

Para desenvolvimento local, você pode criar um arquivo `.env` com as seguintes variáveis:

```env
# Configurações Hedera (para desenvolvimento local)
HEDERA_ACCOUNT_ID_DEV=0.0.123456
HEDERA_PRIVATE_KEY_DEV=302e020100300506032b657004220420...
HEDERA_PUBLIC_KEY_DEV=302a300506032b6570032100...
HEDERA_NETWORK=testnet
```

**Nota**: As secrets do Cloudflare Workers têm prioridade sobre as variáveis locais.

## 🔍 Troubleshooting

### Problema: "Missing required secret: HEDERA_ACCOUNT_ID_DEV"

**Solução**: Configure as secrets no Cloudflare Workers:
```bash
npm run setup-hedera-secrets
```

### Problema: "HEDERA_ACCOUNT_ID e HEDERA_PRIVATE_KEY são obrigatórios no ambiente do Cloudflare Worker"

**Solução**: Verifique se as secrets estão configuradas corretamente no Cloudflare Dashboard.

### Problema: "Failed to create Hedera client"

**Solução**: 
1. Verifique se a chave privada está completa
2. Certifique-se de que não há espaços extras
3. Use a chave copiada diretamente do portal Hedera
4. Verifique se está usando a rede correta (testnet/mainnet)

### Problema: "Erro de conectividade com Cloudflare"

**Solução**:
1. Verifique sua conexão com a internet
2. Certifique-se de que o Hedera testnet está acessível
3. Verifique se as secrets estão configuradas no Cloudflare
4. Tente novamente em alguns minutos

### Problema: "Invalid credentials"

**Solução**:
1. Verifique se o Account ID está no formato correto (ex: 0.0.123456)
2. Verifique se a Private Key está no formato correto
3. Certifique-se de que está usando as credenciais da rede correta (testnet/mainnet)
4. Verifique se as secrets estão configuradas no ambiente correto (dev/prod)

## 📚 Recursos Úteis

- **Portal Hedera**: [https://portal.hedera.com/](https://portal.hedera.com/)
- **Cloudflare Workers**: [https://developers.cloudflare.com/workers/](https://developers.cloudflare.com/workers/)
- **HashScan (Explorer)**: [https://hashscan.io/](https://hashscan.io/)
- **Wrangler CLI**: [https://developers.cloudflare.com/workers/wrangler/](https://developers.cloudflare.com/workers/wrangler/)

## 🔒 Segurança

### Boas Práticas

1. **Nunca compartilhe suas chaves privadas**
2. **Use diferentes contas para desenvolvimento e produção**
3. **Mantenha suas credenciais seguras no Cloudflare Secrets Store**
4. **Use variáveis de ambiente para armazenar credenciais**
5. **Não commite credenciais no repositório**
6. **Use o Cloudflare Secrets Store para armazenar credenciais sensíveis**

### Configuração de Segurança

O projeto inclui validação de secrets e middleware de segurança para proteger suas credenciais no Cloudflare Workers.

## 🧪 Testes

### Teste de Conectividade

```bash
npm run test:hedera-connectivity
```

### Teste de Segurança

```bash
npm run test:security
```

### Teste Completo

```bash
npm run test:hedera
```

## 📝 Estrutura do Projeto

```
src/
├── services/
│   └── hederaService.ts    # Serviço principal do Hedera
├── utils/
│   └── security.ts         # Utilitários de segurança
└── screens/
    └── WalletScreen.tsx    # Tela da wallet

functions/
└── api.ts                  # API do Cloudflare Worker

scripts/
├── setup-hedera-secrets.ps1    # Script de configuração
└── test-hedera-connectivity.js # Script de teste
```

## 🔄 Atualizações

Para atualizar a configuração do Hedera:

1. Atualize as credenciais no portal Hedera
2. Atualize as secrets no Cloudflare Workers
3. Execute os testes de conectividade
4. Faça o deploy novamente

## 📞 Suporte

Se você encontrar problemas:

1. Verifique a documentação do Hedera
2. Execute os testes de conectividade
3. Verifique os logs do Cloudflare Workers
4. Consulte a documentação do projeto
5. Verifique se as secrets estão configuradas corretamente no Cloudflare Dashboard

## 🚀 Comandos Rápidos

```bash
# Configurar secrets
npm run setup-hedera-secrets

# Testar conectividade
npm run test:hedera-connectivity

# Deploy desenvolvimento
npm run deploy:dev

# Deploy produção
npm run deploy:prod
``` 