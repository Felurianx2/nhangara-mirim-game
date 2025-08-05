# Deploy no Cloudflare Pages

## Pré-requisitos

1. Conta no Cloudflare (gratuita)
2. Wrangler CLI instalado

## Instalação do Wrangler

```bash
npm install -g wrangler
```

## Login no Cloudflare

```bash
wrangler login
```

## Deploy

### Opção 1: Deploy via Wrangler CLI

```bash
# Build do projeto
npm run build

# Deploy
wrangler pages deploy dist
```

### Opção 2: Deploy via Dashboard do Cloudflare

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vá para "Pages"
3. Clique em "Create a project"
4. Conecte com GitHub/GitLab
5. Configure:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (deixe vazio)

## Configurações Importantes

### Variáveis de Ambiente (se necessário)
- `GEMINI_API_KEY`: Chave da API do Gemini (opcional, o projeto funciona sem)

### Domínio Customizado
Após o deploy, você pode configurar um domínio customizado nas configurações do projeto.

## Estrutura de Arquivos

```
├── dist/           # Build de produção
├── public/
│   └── _redirects  # Configuração de rotas SPA
└── wrangler.toml   # Configuração do Wrangler
```

## Troubleshooting

### Problema: Rotas não funcionam
- Verifique se o arquivo `_redirects` está na pasta `public`
- Certifique-se que o build foi feito corretamente

### Problema: Assets não carregam
- Verifique se as URLs das imagens estão corretas
- Confirme se o build foi feito com sucesso 