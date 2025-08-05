# 📁 Project Structure / Estrutura do Projeto

## 🇧🇷 **Português**

### 🏗️ **Estrutura Organizada**

```
nhangara-mirim-game/
├── 📁 src/                          # Código fonte principal
│   ├── 📁 components/               # Componentes React reutilizáveis
│   │   ├── 📁 layout/              # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── Footer.tsx
│   │   ├── LanguageToggle.tsx
│   │   └── DailyCheckinModal.tsx
│   ├── 📁 screens/                 # Telas do jogo
│   │   ├── StartScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── BiomeMapScreen.tsx
│   │   ├── BiomeDetailScreen.tsx
│   │   ├── MissionScreen.tsx
│   │   ├── WalletScreen.tsx
│   │   ├── ArtistAcademyScreen.tsx
│   │   ├── AdminScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── WelcomeVideoScreen.tsx
│   │   └── GoogleLoginModal.tsx
│   ├── 📁 services/                # Lógica de negócio
│   │   ├── authService.ts
│   │   ├── hederaService.ts
│   │   ├── geminiService.ts
│   │   ├── i18nService.ts
│   │   └── databaseService.ts
│   ├── 📁 hooks/                   # Custom hooks React
│   │   └── useGame.ts
│   ├── 📁 contexts/                # Contextos React
│   │   └── GameContext.tsx
│   ├── 📁 types/                   # Definições TypeScript
│   │   └── types.ts
│   ├── 📁 utils/                   # Utilitários e constantes
│   │   └── constants.ts
│   ├── 📁 assets/                  # Assets estáticos
│   ├── 📁 styles/                  # Estilos CSS
│   ├── App.tsx                     # Componente principal
│   └── index.tsx                   # Ponto de entrada
├── 📁 public/                      # Arquivos públicos
│   ├── 📁 images/                  # Imagens do jogo
│   └── 📁 videos/                  # Vídeos do jogo
├── 📁 docs/                        # Documentação
│   ├── 📁 deployment/              # Guias de deploy
│   ├── 📁 database/                # Documentação do banco
│   ├── 📁 blockchain/              # Documentação blockchain
│   ├── TECHNICAL_ARCHITECTURE.md
│   └── PROJECT_STRUCTURE.md
├── 📁 scripts/                     # Scripts de automação
│   ├── deploy.ps1
│   └── COMANDOS_RAPIDOS.md
├── 📁 functions/                   # Cloudflare Workers
│   └── api.ts
├── 📁 .github/                     # Configurações GitHub
│   ├── 📁 workflows/
│   ├── 📁 ISSUE_TEMPLATE/
│   └── dependabot.yml
├── 📁 .vscode/                     # Configurações VSCode
├── 📁 .husky/                      # Git hooks
├── 📁 .wrangler/                   # Configurações Cloudflare
├── 📁 dist/                        # Build de produção
├── 📁 node_modules/                # Dependências
├── 📁 imagens_lcc/                 # Imagens locais
├── 📄 README.md                    # Documentação principal
├── 📄 LICENSE                      # Licença MIT
├── 📄 CODE_OF_CONDUCT.md           # Código de conduta
├── 📄 package.json                 # Configuração npm
├── 📄 tsconfig.json                # Configuração TypeScript
├── 📄 vite.config.ts               # Configuração Vite
├── 📄 wrangler.toml                # Configuração Cloudflare
├── 📄 .eslintrc.json               # Configuração ESLint
├── 📄 .prettierrc                  # Configuração Prettier
├── 📄 .gitignore                   # Arquivos ignorados
├── 📄 .gitattributes               # Configuração Git
└── 📄 index.html                   # HTML principal
```

### 🎯 **Organização por Responsabilidade**

#### **📱 Frontend (src/)**
- **components/**: Componentes reutilizáveis
- **screens/**: Telas específicas do jogo
- **services/**: Lógica de negócio e APIs
- **hooks/**: Custom hooks React
- **contexts/**: Gerenciamento de estado global
- **types/**: Definições TypeScript
- **utils/**: Utilitários e constantes
- **assets/**: Recursos estáticos
- **styles/**: Estilos CSS

#### **📚 Documentação (docs/)**
- **deployment/**: Guias de deploy
- **database/**: Documentação do banco
- **blockchain/**: Documentação blockchain

#### **🔧 Configuração**
- **.github/**: GitHub Actions e templates
- **.vscode/**: Configurações do editor
- **.husky/**: Git hooks
- **scripts/**: Scripts de automação

---

## 🇺🇸 **English**

### 🏗️ **Organized Structure**

```
nhangara-mirim-game/
├── 📁 src/                          # Main source code
│   ├── 📁 components/               # Reusable React components
│   │   ├── 📁 layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── MainLayout.tsx
│   │   │   └── Footer.tsx
│   │   ├── LanguageToggle.tsx
│   │   └── DailyCheckinModal.tsx
│   ├── 📁 screens/                 # Game screens
│   │   ├── StartScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── BiomeMapScreen.tsx
│   │   ├── BiomeDetailScreen.tsx
│   │   ├── MissionScreen.tsx
│   │   ├── WalletScreen.tsx
│   │   ├── ArtistAcademyScreen.tsx
│   │   ├── AdminScreen.tsx
│   │   ├── OnboardingScreen.tsx
│   │   ├── WelcomeVideoScreen.tsx
│   │   └── GoogleLoginModal.tsx
│   ├── 📁 services/                # Business logic
│   │   ├── authService.ts
│   │   ├── hederaService.ts
│   │   ├── geminiService.ts
│   │   ├── i18nService.ts
│   │   └── databaseService.ts
│   ├── 📁 hooks/                   # Custom React hooks
│   │   └── useGame.ts
│   ├── 📁 contexts/                # React contexts
│   │   └── GameContext.tsx
│   ├── 📁 types/                   # TypeScript definitions
│   │   └── types.ts
│   ├── 📁 utils/                   # Utilities and constants
│   │   └── constants.ts
│   ├── 📁 assets/                  # Static assets
│   ├── 📁 styles/                  # CSS styles
│   ├── App.tsx                     # Main component
│   └── index.tsx                   # Entry point
├── 📁 public/                      # Public files
│   ├── 📁 images/                  # Game images
│   └── 📁 videos/                  # Game videos
├── 📁 docs/                        # Documentation
│   ├── 📁 deployment/              # Deployment guides
│   ├── 📁 database/                # Database documentation
│   ├── 📁 blockchain/              # Blockchain documentation
│   ├── TECHNICAL_ARCHITECTURE.md
│   └── PROJECT_STRUCTURE.md
├── 📁 scripts/                     # Automation scripts
│   ├── deploy.ps1
│   └── COMANDOS_RAPIDOS.md
├── 📁 functions/                   # Cloudflare Workers
│   └── api.ts
├── 📁 .github/                     # GitHub configurations
│   ├── 📁 workflows/
│   ├── 📁 ISSUE_TEMPLATE/
│   └── dependabot.yml
├── 📁 .vscode/                     # VSCode settings
├── 📁 .husky/                      # Git hooks
├── 📁 .wrangler/                   # Cloudflare settings
├── 📁 dist/                        # Production build
├── 📁 node_modules/                # Dependencies
├── 📁 imagens_lcc/                 # Local images
├── 📄 README.md                    # Main documentation
├── 📄 LICENSE                      # MIT License
├── 📄 CODE_OF_CONDUCT.md           # Code of conduct
├── 📄 package.json                 # NPM configuration
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 vite.config.ts               # Vite configuration
├── 📄 wrangler.toml                # Cloudflare configuration
├── 📄 .eslintrc.json               # ESLint configuration
├── 📄 .prettierrc                  # Prettier configuration
├── 📄 .gitignore                   # Ignored files
├── 📄 .gitattributes               # Git configuration
└── 📄 index.html                   # Main HTML
```

### 🎯 **Organization by Responsibility**

#### **📱 Frontend (src/)**
- **components/**: Reusable components
- **screens/**: Game-specific screens
- **services/**: Business logic and APIs
- **hooks/**: Custom React hooks
- **contexts/**: Global state management
- **types/**: TypeScript definitions
- **utils/**: Utilities and constants
- **assets/**: Static resources
- **styles/**: CSS styles

#### **📚 Documentation (docs/)**
- **deployment/**: Deployment guides
- **database/**: Database documentation
- **blockchain/**: Blockchain documentation

#### **🔧 Configuration**
- **.github/**: GitHub Actions and templates
- **.vscode/**: Editor settings
- **.husky/**: Git hooks
- **scripts/**: Automation scripts

---

## 🚀 **Benefits / Benefícios**

### **🇧🇷 Vantagens da Nova Estrutura**

- **📁 Organização Clara**: Cada pasta tem uma responsabilidade específica
- **🔍 Fácil Navegação**: Estrutura intuitiva para novos desenvolvedores
- **⚡ Imports Limpos**: Path mapping para imports mais limpos
- **📚 Documentação Organizada**: Separação por categoria
- **🔧 Configuração Centralizada**: Arquivos de configuração bem organizados
- **🎯 Escalabilidade**: Fácil adição de novos recursos

### **🇺🇸 Structure Benefits**

- **📁 Clear Organization**: Each folder has a specific responsibility
- **🔍 Easy Navigation**: Intuitive structure for new developers
- **⚡ Clean Imports**: Path mapping for cleaner imports
- **📚 Organized Documentation**: Separation by category
- **🔧 Centralized Configuration**: Well-organized configuration files
- **🎯 Scalability**: Easy addition of new features

---

## 📋 **Import Examples / Exemplos de Import**

### **🇧🇷 Exemplos de Import**

```typescript
// Antes (Before)
import { useGame } from '../hooks/useGame';
import { constants } from '../constants';

// Depois (After)
import { useGame } from '@/hooks/useGame';
import { constants } from '@/utils/constants';
```

### **🇺🇸 Import Examples**

```typescript
// Before
import { useGame } from '../hooks/useGame';
import { constants } from '../constants';

// After
import { useGame } from '@/hooks/useGame';
import { constants } from '@/utils/constants';
```

---

<div align="center">
  <p><strong>🏗️ Clean architecture for sustainable development</strong></p>
  <p><em>Organized for success in the Hackathon</em></p>
</div> 