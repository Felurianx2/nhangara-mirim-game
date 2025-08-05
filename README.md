# 🌿 Nhangara Mirim - Guardian of Brazilian Biomes

[![Deploy Status](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-blue?style=flat-square&logo=cloudflare)](https://nhangara-mirim-game.pages.dev)
[![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20TypeScript%20%7C%20Hedera-green?style=flat-square&logo=react)](https://reactjs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

<div align="center">
  <img src="https://via.placeholder.com/800x400/228B22/FFFFFF?text=Nhangara+Mirim" alt="Nhangara Mirim Banner" width="800"/>
  
  ### 🏆 **Hackathon Project - Brazilian Biomes Conservation**
  
  *An immersive educational game that connects Brazilian folklore with environmental conservation through blockchain technology*
</div>

---

## 🇧🇷 **Português**

### 🎯 **Sobre o Projeto**

**Nhangara Mirim** é um jogo educativo imersivo que conecta o folclore brasileiro com a conservação ambiental através da tecnologia blockchain. Os jogadores se tornam "Guardians" (Guardiões) dos biomas brasileiros, completando missões ecológicas e ganhando NFTs únicos como Bio-Amuletos.

### 🌟 **Características Principais**

- **🎮 Gameplay Imersivo**: Explore 6 biomas brasileiros únicos
- **🏛️ Folclore Brasileiro**: Interaja com personagens como Curupira, Saci, Iara
- **💎 NFTs como Bio-Amuletos**: Colecione NFTs únicos como recompensas
- **🌐 Blockchain Hedera**: Tecnologia sustentável e escalável
- **🌍 Bilingue**: Suporte completo para Português e Inglês
- **📱 Responsivo**: Funciona em desktop e mobile

### 🏗️ **Arquitetura Técnica**

```
├── Frontend (React 19 + TypeScript)
├── Blockchain (Hedera Hashgraph)
├── Database (Cloudflare D1)
├── Deploy (Cloudflare Pages)
└── Authentication (Google OAuth)
```

### 🚀 **Tecnologias Utilizadas**

| Categoria | Tecnologias |
|-----------|-------------|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS |
| **Blockchain** | Hedera Hashgraph SDK, HBAR Tokens |
| **Backend** | Cloudflare Workers, D1 Database |
| **Deploy** | Cloudflare Pages, GitHub Actions |
| **Auth** | Google OAuth, Session Management |

---

## 🇺🇸 **English**

### 🎯 **About the Project**

**Nhangara Mirim** is an immersive educational game that connects Brazilian folklore with environmental conservation through blockchain technology. Players become "Guardians" of Brazilian biomes, completing ecological missions and earning unique NFTs as Bio-Amulets.

### 🌟 **Key Features**

- **🎮 Immersive Gameplay**: Explore 6 unique Brazilian biomes
- **🏛️ Brazilian Folklore**: Interact with characters like Curupira, Saci, Iara
- **💎 NFTs as Bio-Amulets**: Collect unique NFTs as rewards
- **🌐 Hedera Blockchain**: Sustainable and scalable technology
- **🌍 Bilingual**: Full support for Portuguese and English
- **📱 Responsive**: Works on desktop and mobile

### 🏗️ **Technical Architecture**

```
├── Frontend (React 19 + TypeScript)
├── Blockchain (Hedera Hashgraph)
├── Database (Cloudflare D1)
├── Deploy (Cloudflare Pages)
└── Authentication (Google OAuth)
```

### 🚀 **Technologies Used**

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS |
| **Blockchain** | Hedera Hashgraph SDK, HBAR Tokens |
| **Backend** | Cloudflare Workers, D1 Database |
| **Deploy** | Cloudflare Pages, GitHub Actions |
| **Auth** | Google OAuth, Session Management |

---

## 🎮 **Game Features / Recursos do Jogo**

### 🌿 **Biomes / Biomas**

| Biome | Guardian | Description |
|-------|----------|-------------|
| **Mata Atlântica** | Curupira | Protector of forests |
| **Amazônia** | Mapinguari | Giant of the jungle |
| **Cerrado** | Boitatá | Fire serpent |
| **Pantanal** | Caipora | Guardian of animals |
| **Caatinga** | Cuca | Witch of stories |
| **Pampas** | Saci | Trickster of the woods |

### 🏆 **Game Mechanics / Mecânicas**

- **XP System**: Gain experience through missions
- **Level Progression**: Unlock new biomes and features
- **NFT Collection**: Earn unique Bio-Amulets
- **Daily Challenges**: Complete daily missions
- **Social Features**: Connect with other guardians

---

## 🚀 **Quick Start / Início Rápido**

### 🇧🇷 **Português**

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nhangara-mirim-game.git
cd nhangara-mirim-game

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Deploy para Cloudflare Pages
npm run deploy
```

### 🇺🇸 **English**

```bash
# Clone the repository
git clone https://github.com/your-username/nhangara-mirim-game.git
cd nhangara-mirim-game

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

---

## 🔧 **Hedera Configuration / Configuração do Hedera**

### 🇧🇷 **Configuração Principal (Cloudflare Workers)**

1. **Obtenha credenciais do Portal Hedera**:
   - Acesse [https://portal.hedera.com/](https://portal.hedera.com/)
   - Crie uma conta e obtenha suas credenciais

2. **Configure as secrets no Cloudflare**:
   ```bash
   # Execute o script de configuração
   npm run setup-hedera-secrets
   ```

3. **Teste a conexão**:
   ```bash
   npm run test:hedera-connectivity
   ```

### 🇺🇸 **Main Configuration (Cloudflare Workers)**

1. **Get credentials from Hedera Portal**:
   - Visit [https://portal.hedera.com/](https://portal.hedera.com/)
   - Create an account and get your credentials

2. **Configure secrets in Cloudflare**:
   ```bash
   # Run the configuration script
   npm run setup-hedera-secrets
   ```

3. **Test the connection**:
   ```bash
   npm run test:hedera-connectivity
   ```

### 🚀 **Production Deployment**

```bash
# Configure secrets for Cloudflare Workers
npm run setup-hedera-secrets

# Deploy to development environment
npm run deploy:dev

# Deploy to production environment
npm run deploy:prod
```

### 🔧 **Local Development (Optional)**

Para desenvolvimento local, você pode criar um arquivo `.env`:

```bash
# Copie o arquivo de exemplo
cp env.example .env

# Edite com suas credenciais (opcional)
HEDERA_ACCOUNT_ID_DEV=0.0.123456
HEDERA_PRIVATE_KEY_DEV=302e020100300506032b657004220420...
HEDERA_NETWORK=testnet
```

**Nota**: As secrets do Cloudflare Workers têm prioridade sobre as variáveis locais.

📖 **Para mais detalhes, consulte**: [docs/HEDERA_SETUP.md](docs/HEDERA_SETUP.md)

---

## 📊 **Project Structure / Estrutura do Projeto**

```
nhangara-mirim-game/
├── 📁 components/          # React components
├── 📁 screens/            # Game screens
├── 📁 services/           # Business logic
├── 📁 contexts/           # React contexts
├── 📁 hooks/              # Custom hooks
├── 📁 types/              # TypeScript types
├── 📁 public/             # Static assets
├── 📁 docs/               # Documentation
└── 📁 scripts/            # Build scripts
```

---

## 🌐 **Live Demo / Demonstração**

- **🌍 Production**: [nhangara-mirim-game.pages.dev](https://nhangara-mirim-game.pages.dev)
- **🧪 Preview**: [dev.nhangara-mirim-game.pages.dev](https://dev.nhangara-mirim-game.pages.dev)
- **📱 Mobile**: Responsive design for all devices

---

## 🏆 **Hackathon Impact / Impacto do Hackathon**

### 🇧🇷 **Objetivos Alcançados**

- ✅ **Educação Ambiental**: Gamificação da conservação
- ✅ **Tecnologia Blockchain**: NFTs sustentáveis na Hedera
- ✅ **Cultura Brasileira**: Integração do folclore
- ✅ **Acessibilidade**: Interface bilíngue
- ✅ **Escalabilidade**: Arquitetura cloud-native

### 🇺🇸 **Achieved Goals**

- ✅ **Environmental Education**: Gamification of conservation
- ✅ **Blockchain Technology**: Sustainable NFTs on Hedera
- ✅ **Brazilian Culture**: Folklore integration
- ✅ **Accessibility**: Bilingual interface
- ✅ **Scalability**: Cloud-native architecture

---

## 🤝 **Contributing / Contribuindo**

### 🇧🇷 **Como Contribuir**

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### 🇺🇸 **How to Contribute**

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **License / Licença**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 🙏 **Acknowledgments / Agradecimentos**

### 🇧🇷 **Agradecimentos**

- **Hedera Hashgraph** pela tecnologia blockchain sustentável
- **Cloudflare** pela infraestrutura de deploy
- **Comunidade Brasileira** pelo folclore rico
- **Mentores do Hackathon** pelo suporte

### 🇺🇸 **Acknowledgments**

- **Hedera Hashgraph** for sustainable blockchain technology
- **Cloudflare** for deployment infrastructure
- **Brazilian Community** for rich folklore
- **Hackathon Mentors** for support

---

<div align="center">
  <p><strong>🌿 Made with ❤️ for Brazilian Biomes Conservation</strong></p>
  <p><em>Built for Hackathon 2024</em></p>
</div>
