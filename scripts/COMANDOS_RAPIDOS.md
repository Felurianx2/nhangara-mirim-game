# ⚡ Comandos Rápidos - Nhangara Mirim Game

## 🚀 Deploy Rápido
```bash
npm run build && wrangler pages deploy dist --project-name nhangara-mirim-game
```

## 🔄 Atualização Completa
```bash
npm install && npm run build && wrangler pages deploy dist --project-name nhangara-mirim-game
```

## 🛠️ Desenvolvimento
```bash
# Rodar localmente
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 📊 Status
```bash
# Verificar login
wrangler whoami

# Listar projetos
wrangler pages project list

# Ver status do git
git status
```

## 🔧 Problemas Comuns

### Vite não funciona
```bash
npm install --force
```

### Login falha
```bash
npm cache clean --force
wrangler login
```

### Deploy falha
```bash
rm -rf dist/
npm run build
wrangler pages deploy dist --project-name nhangara-mirim-game
```

## 📝 Git (se usar)
```bash
# Commit e push
git add . && git commit -m "update" && git push origin main
```

## 🌐 URLs Importantes
- **Site**: https://fef6607b.nhangara-mirim-game.pages.dev
- **Dashboard**: https://dash.cloudflare.com
- **Documentação**: https://developers.cloudflare.com/pages/

---
**Dica**: Copie e cole os comandos conforme necessário! 🎯 