# 🚀 Deploy no Cloudflare Pages - Nhangara Mirim Game

## 📋 Pré-requisitos

- ✅ Conta no Cloudflare
- ✅ Wrangler CLI instalado
- ✅ Build do projeto gerado

## 🔧 Passos para Deploy

### 1. Build do Projeto
```bash
npm run build
```

### 2. Login no Cloudflare
```bash
wrangler login
```

### 3. Deploy via Wrangler CLI
```bash
wrangler pages deploy dist
```

### 4. Deploy via Dashboard (Alternativo)

1. **Acesse**: https://dash.cloudflare.com
2. **Vá para**: Pages > Create a project
3. **Conecte** com GitHub (recomendado)
4. **Configure**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`

## 📁 Arquivos Incluídos no Deploy

### ✅ Build Files
- `dist/index.html`
- `dist/assets/` (JS/CSS)
- `dist/_redirects`

### ✅ Imagens e Vídeo Locais
- `dist/images/tela.jpg` (196KB)
- `dist/images/saci.jpg` (71KB)
- `dist/images/talisma_da_sabedoria.jpg` (114KB)
- `dist/images/biomas.jpg` (215KB)
- `dist/images/753b6295-8e4d-47ed-afc6-a5f94436fdef.mp4` (2.3MB)

### ✅ Configurações
- `wrangler.toml`
- `package.json`
- `vite.config.ts`

## 🌐 URLs de Produção

### Imagens e Vídeo
- `https://[your-domain].pages.dev/images/tela.jpg`
- `https://[your-domain].pages.dev/images/saci.jpg`
- `https://[your-domain].pages.dev/images/talisma_da_sabedoria.jpg`
- `https://[your-domain].pages.dev/images/biomas.jpg`
- `https://[your-domain].pages.dev/images/753b6295-8e4d-47ed-afc6-a5f94436fdef.mp4`

### Aplicação
- `https://[your-domain].pages.dev/`

## 🔄 Atualizações

### Via CLI
```bash
npm run build
wrangler pages deploy dist
```

### Via GitHub (Automático)
- Push para `main` branch
- Deploy automático via Cloudflare Pages

## 🛠️ Configurações Especiais

### Environment Variables (se necessário)
```bash
wrangler pages project env set VITE_APP_NAME "Nhangara Mirim"
wrangler pages project env set VITE_APP_VERSION "1.0.0"
```

### Custom Domain
1. **Dashboard**: Pages > [your-project] > Custom domains
2. **Adicione**: seu domínio personalizado

## 📊 Monitoramento

### Analytics
- **Dashboard**: Pages > [your-project] > Analytics
- **Métricas**: Visitas, Performance, Erros

### Logs
```bash
wrangler pages deployment tail [deployment-id]
```

## 🚨 Troubleshooting

### Problemas Comuns

1. **Build falha**
   - Verifique se `npm run build` funciona localmente
   - Verifique dependências no `package.json`

2. **Imagens não carregam**
   - Verifique se estão em `dist/images/`
   - Verifique caminhos no `constants.ts`

3. **404 em rotas**
   - Verifique se `_redirects` está em `dist/`
   - Configure SPA routing no Cloudflare

### Comandos Úteis
```bash
# Verificar build local
npm run preview

# Verificar arquivos gerados
ls dist/

# Verificar configuração
wrangler pages project list
```

## ✅ Checklist de Deploy

- [ ] Build gerado com sucesso
- [ ] Imagens incluídas em `dist/images/`
- [ ] Login no Cloudflare realizado
- [ ] Deploy executado
- [ ] URLs testadas
- [ ] Funcionalidades verificadas
- [ ] Performance otimizada

## 🎯 Próximos Passos

1. **Deploy inicial** via CLI ou Dashboard
2. **Configurar** custom domain (opcional)
3. **Configurar** CI/CD com GitHub
4. **Monitorar** performance e erros
5. **Atualizar** conforme necessário

---

**🎮 Nhangara Mirim Game - Deploy no Cloudflare Pages**
**📅 Data**: $(date)
**🔄 Versão**: 1.0.0 