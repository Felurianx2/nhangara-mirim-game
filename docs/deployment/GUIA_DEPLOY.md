# 🚀 Guia Completo - Deploy e Atualizações

## 📋 Pré-requisitos

### 1. Instalar Node.js
- Baixar em: https://nodejs.org/
- Versão recomendada: 18.x ou superior

### 2. Conta no Cloudflare
- Criar conta em: https://dash.cloudflare.com/sign-up
- Plano gratuito é suficiente

### 3. Wrangler CLI
```bash
npm install -g wrangler
```

---

## 🎯 Primeiro Deploy

### Passo 1: Preparar o Projeto
```bash
# 1. Clonar o repositório
git clone [URL_DO_REPOSITORIO]
cd nhangara-mirim-game

# 2. Instalar dependências
npm install

# 3. Fazer build
npm run build
```

### Passo 2: Login no Cloudflare
```bash
# Fazer login (abrirá navegador)
wrangler login
```

### Passo 3: Deploy Inicial
```bash
# Deploy do projeto
wrangler pages deploy dist --project-name nhangara-mirim-game
```

### Passo 4: Verificar
- Acessar: `https://[PROJECT_ID].nhangara-mirim-game.pages.dev`
- Testar todas as funcionalidades

---

## 🔄 Atualizações Contínuas

### Método A: Deploy Manual (Recomendado para Equipe)

```bash
# 1. Fazer mudanças no código
# 2. Testar localmente
npm run dev

# 3. Build para produção
npm run build

# 4. Deploy
wrangler pages deploy dist --project-name nhangara-mirim-game
```

### Método B: Deploy Automático via GitHub

#### Configurar GitHub:
```bash
# 1. Inicializar git (se não existir)
git init

# 2. Adicionar arquivos
git add .

# 3. Commit inicial
git commit -m "Initial commit"

# 4. Criar repositório no GitHub e conectar
git remote add origin https://github.com/[USUARIO]/nhangara-mirim-game.git
git push -u origin main
```

#### Configurar Cloudflare Pages:
1. Acessar: https://dash.cloudflare.com
2. Ir em: **Pages** → **Create a project**
3. Escolher: **Connect to Git**
4. Selecionar repositório
5. Configurar:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (deixar vazio)

#### Deploy Automático:
```bash
# A cada mudança, apenas fazer push
git add .
git commit -m "Descrição da mudança"
git push origin main
# Deploy automático acontece!
```

---

## 🛠️ Comandos Úteis

### Desenvolvimento Local
```bash
# Rodar localmente
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

### Deploy
```bash
# Deploy manual
wrangler pages deploy dist --project-name nhangara-mirim-game

# Verificar status
wrangler whoami

# Listar projetos
wrangler pages project list
```

### Git (se usar GitHub)
```bash
# Ver status
git status

# Ver mudanças
git diff

# Ver histórico
git log --oneline
```

---

## 📁 Estrutura do Projeto

```
nhangara-mirim-game/
├── src/
│   ├── components/     # Componentes React
│   ├── screens/        # Telas do jogo
│   ├── contexts/       # Context API
│   ├── hooks/          # Custom hooks
│   ├── services/       # Serviços externos
│   └── types.ts        # Tipos TypeScript
├── public/
│   └── _redirects      # Configuração de rotas SPA
├── dist/               # Build de produção
├── package.json        # Dependências
└── vite.config.ts      # Configuração Vite
```

---

## 🔧 Troubleshooting

### Problema: "vite não é reconhecido"
```bash
# Reinstalar dependências
npm install --force
```

### Problema: Login não funciona
```bash
# Limpar cache
npm cache clean --force
# Tentar login novamente
wrangler login
```

### Problema: Deploy falha
```bash
# Verificar se build foi criado
ls dist/

# Rebuild
npm run build

# Tentar deploy novamente
wrangler pages deploy dist --project-name nhangara-mirim-game
```

### Problema: Rotas não funcionam
- Verificar se arquivo `_redirects` está em `public/`
- Conteúdo deve ser: `/*    /index.html   200`

---

## 📞 Suporte

### URLs Importantes:
- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **Documentação Wrangler**: https://developers.cloudflare.com/workers/wrangler/
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/

### Logs de Deploy:
- Acessar: Cloudflare Dashboard → Pages → Seu Projeto → Deployments

---

## 🎯 Checklist de Deploy

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Build criado (`npm run build`)
- [ ] Login no Cloudflare (`wrangler login`)
- [ ] Deploy executado (`wrangler pages deploy dist`)
- [ ] Site acessível
- [ ] Funcionalidades testadas

---

## 🚀 Próximos Passos

1. **Configurar domínio customizado** (opcional)
2. **Adicionar variáveis de ambiente** (se necessário)
3. **Configurar analytics** (opcional)
4. **Otimizar performance** (lazy loading, etc.)

---

**Equipe**: Use este guia sempre que precisar fazer deploy ou atualizações! 🎮 