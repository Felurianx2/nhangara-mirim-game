# ✅ Checklist de Deploy - Nhangara Mirim Game

## 📋 Arquivos Essenciais

### ✅ Build Files
- [x] `dist/index.html` (1.8KB)
- [x] `dist/assets/` (JS/CSS)
- [x] `dist/_redirects` (SPA routing)

### ✅ Imagens e Vídeo Locais
- [x] `dist/images/tela.jpg` (196KB)
- [x] `dist/images/saci.jpg` (71KB)
- [x] `dist/images/talisma_da_sabedoria.jpg` (114KB)
- [x] `dist/images/biomas.jpg` (215KB)
- [x] `dist/images/753b6295-8e4d-47ed-afc6-a5f94436fdef.mp4` (2.3MB)

### ✅ Configurações
- [x] `wrangler.toml` (Cloudflare config)
- [x] `package.json` (dependências)
- [x] `vite.config.ts` (build config)
- [x] `_redirects` (SPA routing)

### ✅ Documentação
- [x] `DEPLOY_CLOUDFLARE.md` (guia completo)
- [x] `deploy.ps1` (script automatizado)
- [x] `.github/workflows/deploy.yml` (CI/CD)

## 🚀 Opções de Deploy

### 1. Deploy Manual (CLI)
```bash
# Login
wrangler login

# Deploy
wrangler pages deploy dist --project-name nhangara-mirim-game
```

### 2. Deploy Automatizado (Script)
```powershell
# Executar script
.\deploy.ps1
```

### 3. Deploy via Dashboard
1. Acesse: https://dash.cloudflare.com
2. Pages > Create a project
3. Conecte com GitHub
4. Configure build settings

### 4. Deploy via GitHub (Automático)
1. Push para `main` branch
2. GitHub Actions faz deploy automático

## 🌐 URLs Esperadas

### Produção
- **App**: https://nhangara-mirim-game.pages.dev
- **Imagens**: https://nhangara-mirim-game.pages.dev/images/

### Imagens e Vídeo Específicos
- `https://nhangara-mirim-game.pages.dev/images/tela.jpg`
- `https://nhangara-mirim-game.pages.dev/images/saci.jpg`
- `https://nhangara-mirim-game.pages.dev/images/talisma_da_sabedoria.jpg`
- `https://nhangara-mirim-game.pages.dev/images/biomas.jpg`
- `https://nhangara-mirim-game.pages.dev/images/753b6295-8e4d-47ed-afc6-a5f94436fdef.mp4`

## 🔧 Configurações Especiais

### Environment Variables (Opcional)
```bash
wrangler pages project env set VITE_APP_NAME "Nhangara Mirim"
wrangler pages project env set VITE_APP_VERSION "1.0.0"
```

### Custom Domain (Opcional)
1. Dashboard > Pages > [project] > Custom domains
2. Adicione seu domínio

## 📊 Verificações Pós-Deploy

### ✅ Funcionalidades
- [ ] Login com Google funciona
- [ ] Login com email funciona
- [ ] Sistema bilíngue (PT/EN)
- [ ] Imagens carregam corretamente
- [ ] Navegação entre telas
- [ ] Wallet Hedera funciona
- [ ] Vídeo de boas-vindas

### ✅ Performance
- [ ] Carregamento rápido
- [ ] Imagens otimizadas
- [ ] Responsivo (mobile/desktop)
- [ ] Sem erros no console

### ✅ SEO
- [ ] Meta tags configuradas
- [ ] Título correto
- [ ] Descrição adequada

## 🚨 Troubleshooting

### Problemas Comuns

1. **Build falha**
   ```bash
   npm run build
   # Verificar erros
   ```

2. **Imagens não carregam**
   ```bash
   # Verificar se estão em dist/images/
   ls dist/images/
   ```

3. **404 em rotas**
   ```bash
   # Verificar _redirects
   cat dist/_redirects
   ```

4. **Deploy falha**
   ```bash
   # Verificar login
   wrangler whoami
   
   # Verificar projeto
   wrangler pages project list
   ```

## 🎯 Próximos Passos

1. **Deploy inicial** ✅
2. **Testar funcionalidades** ✅
3. **Configurar custom domain** (opcional)
4. **Configurar CI/CD** (GitHub Actions)
5. **Monitorar performance**
6. **Atualizar conforme necessário**

## 📈 Monitoramento

### Cloudflare Analytics
- Dashboard > Pages > [project] > Analytics
- Métricas: Visitas, Performance, Erros

### Logs
```bash
wrangler pages deployment tail [deployment-id]
```

---

**🎮 Nhangara Mirim Game - Deploy Checklist**
**📅 Data**: $(date)
**🔄 Versão**: 1.0.0
**✅ Status**: Pronto para Deploy 