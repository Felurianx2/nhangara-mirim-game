# Configuração GitHub + Cloudflare Pages

Este guia explica como configurar a integração automática entre o GitHub e o Cloudflare Pages para deploy automático.

## 🚀 Configuração Automática

### 1. Configurar Secrets no GitHub

Acesse o repositório: https://github.com/Felurianx2/nhangara-mirim-game

1. **Vá para Settings** → **Secrets and variables** → **Actions**
2. **Adicione os seguintes secrets:**

#### Secrets Obrigatórios:

| Secret | Descrição | Como obter |
|--------|-----------|------------|
| `CLOUDFLARE_API_TOKEN` | Token de API do Cloudflare | Cloudflare Dashboard → My Profile → API Tokens |
| `CLOUDFLARE_ACCOUNT_ID` | ID da conta Cloudflare | Cloudflare Dashboard → Overview (lado direito) |

### 2. Obter Cloudflare API Token

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vá para **My Profile** → **API Tokens**
3. Clique em **Create Token**
4. Use o template **Custom token**
5. Configure as permissões:
   - **Zone:Zone:Edit** (para o domínio)
   - **Zone:Zone:Read** (para o domínio)
   - **Account:Cloudflare Pages:Edit** (para Pages)
   - **Account:Cloudflare Pages:Read** (para Pages)

### 3. Obter Account ID

1. No Cloudflare Dashboard, vá para **Overview**
2. O Account ID está no lado direito da página
3. Copie o ID (formato: 32 caracteres hexadecimais)

## 🔄 Como Funciona

### Deploy Automático

- **Push para `main`**: Deploy automático para produção
- **Pull Request**: Deploy de preview
- **Build**: Executado automaticamente no GitHub Actions
- **Deploy**: Enviado para Cloudflare Pages

### Workflow

```yaml
1. Push para GitHub
2. GitHub Actions detecta mudança
3. Executa build (npm run build)
4. Deploy para Cloudflare Pages
5. Aplicação fica disponível em: https://nhangara-mirim-game.pages.dev
```

## 📋 Configuração Manual (Alternativa)

Se preferir configurar manualmente no Cloudflare:

1. **Acesse Cloudflare Pages**
2. **Crie novo projeto**
3. **Conecte com GitHub**
4. **Configure build settings:**
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`

## 🔧 Configurações do Projeto

### wrangler.toml
```toml
pages_build_output_dir = "dist"
```

### GitHub Actions (.github/workflows/deploy.yml)
```yaml
- name: Deploy to Cloudflare Pages
  uses: cloudflare/pages-action@v1
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    projectName: nhangara-mirim-game
    directory: dist
```

## 🌐 URLs de Deploy

- **Produção**: https://nhangara-mirim-game.pages.dev
- **Preview**: https://dev.nhangara-mirim-game.pages.dev
- **GitHub**: https://github.com/Felurianx2/nhangara-mirim-game

## 🔍 Troubleshooting

### Problema: "Build failed"
**Solução**: Verifique se o `npm run build` funciona localmente

### Problema: "Deploy failed"
**Solução**: Verifique se as secrets estão configuradas corretamente

### Problema: "API Token invalid"
**Solução**: Gere um novo token com as permissões corretas

## 📊 Monitoramento

- **GitHub Actions**: https://github.com/Felurianx2/nhangara-mirim-game/actions
- **Cloudflare Analytics**: Dashboard do Cloudflare Pages
- **Build Logs**: Disponíveis no GitHub Actions

## 🚀 Comandos Úteis

```bash
# Deploy manual
npm run build
wrangler pages deploy dist

# Verificar status
wrangler pages project list

# Ver logs
wrangler pages deployment tail
```

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs do GitHub Actions
2. Verifique as secrets no GitHub
3. Verifique as configurações no Cloudflare
4. Teste o build localmente: `npm run build` 