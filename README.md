# 🌱 Nhangara Mirim - Brazilian Biomes NFT Game

> **Hello Future Hackathon Submission** - A Web3 game for environmental education and Brazilian biodiversity preservation

[![Deploy Status](https://img.shields.io/badge/Deploy-Production-green)](https://production.nhangara-mirim-game.pages.dev)
[![Hedera Integration](https://img.shields.io/badge/Hedera-Testnet-blue)](https://portal.hedera.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 🎯 Project Overview

**Nhangara Mirim** is an innovative Web3 educational game that combines blockchain technology with environmental education to preserve and celebrate Brazilian biodiversity. Players become "Guardians" who explore Brazil's unique biomes, complete regenerative missions, and earn NFT Bio-Amulets as rewards.

### 🌍 Mission
- **Environmental Education**: Teach about Brazilian biomes through interactive gameplay
- **Biodiversity Preservation**: Raise awareness about conservation challenges
- **Web3 Integration**: Use blockchain technology for digital asset ownership
- **Cultural Heritage**: Celebrate Brazilian folklore and indigenous knowledge

## 🏆 Hackathon Alignment

This project aligns perfectly with the **Hello Future Hackathon** goals:

- ✅ **Sustainability**: Focus on environmental education and conservation
- ✅ **Innovation**: Web3 gaming for environmental impact
- ✅ **Education**: Interactive learning about Brazilian biodiversity
- ✅ **Technology**: Hedera blockchain integration for NFT rewards
- ✅ **Social Impact**: Promoting environmental awareness

## 🎮 Game Features

### 🌿 Biomes Exploration
- **Atlantic Forest**: Recycling missions with Curupira guardian
- **Cerrado**: Reforestation planting missions with Maned Wolf
- **Pantanal**: Photo hunt missions with Iara water spirit
- **Caatinga**: Water management missions with Zumbi protector

### 🏆 NFT Rewards System
- **Bio-Amulets**: Unique NFTs for each biome completed
- **Hedera Integration**: Real blockchain tokens on testnet
- **HashScan Links**: Verifiable on-chain assets

### 🎯 Mini-Games
- **Recycling Game**: Drag & drop waste sorting
- **Planting Game**: Interactive seed planting
- **Photo Hunt**: Spot differences in nature photos
- **Water Management**: Resource allocation simulation
- **Quiz Games**: Educational knowledge tests

### 🌐 Multi-language Support
- **Portuguese**: Native language support
- **English**: International accessibility
- **i18n System**: Easy language switching

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI framework
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first styling
- **Vite**: Fast build tool
- **React Router**: Client-side routing

### Backend & Infrastructure
- **Cloudflare Pages**: Static site hosting
- **Cloudflare Functions**: Serverless API
- **Cloudflare D1**: Serverless database

### Blockchain Integration
- **Hedera Hashgraph**: Main blockchain platform
- **Hedera Token Service**: NFT creation and management
- **HashScan**: Blockchain explorer integration
- **Testnet Deployment**: Live token contracts

### Development Tools
- **Wrangler CLI**: Cloudflare deployment
- **ESLint**: Code quality
- **Prettier**: Code formatting
- **Husky**: Git hooks

## 🚀 Live Demo

### Production Environment
- **URL**: https://production.nhangara-mirim-game.pages.dev
- **Status**: ✅ Live and fully functional
- **Features**: All game features active

### Preview Environment
- **URL**: https://preview.nhangara-mirim-game.pages.dev
- **Status**: ✅ Development testing
- **Features**: Latest updates

## 🎯 NFT Tokens (Hedera Testnet)

All Bio-Amulet NFTs are live on Hedera testnet:

| Biome | NFT Name | Token ID | HashScan Link |
|-------|----------|----------|---------------|
| Atlantic Forest | Atlantic Forest Amulet | 0.0.6491014/1 | [View Token](https://hashscan.io/testnet/token/0.0.6491014/1) |
| Cerrado | Cerrado Seed Amulet | 0.0.6483546/1 | [View Token](https://hashscan.io/testnet/token/0.0.6483546/1) |
| Pantanal | Pantanal Water Amulet | 0.0.6483486/1 | [View Token](https://hashscan.io/testnet/token/0.0.6483486/1) |
| Caatinga | Caatinga Sun Amulet | 0.0.6483303/1 | [View Token](https://hashscan.io/testnet/token/0.0.6483303/1) |

## 🏗️ Project Structure

```
nhangara-mirim-game/
├── 📁 src/
│   ├── 📁 components/          # React components
│   ├── 📁 screens/            # Game screens
│   ├── 📁 services/           # API services
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 contexts/           # React contexts
│   ├── 📁 types/              # TypeScript types
│   └── 📁 utils/              # Utility functions
├── 📁 public/
│   └── 📁 images/             # Game assets
├── 📁 functions/              # Cloudflare Functions
├── 📁 docs/                   # Documentation
└── 📁 scripts/                # Deployment scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Cloudflare account
- Hedera testnet account

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nhangara-mirim-game.git
cd nhangara-mirim-game

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Pages
npm run deploy
```

### Environment Variables

```env
# Cloudflare Pages
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# Hedera Integration
HEDERA_ACCOUNT_ID=your_hedera_account
HEDERA_PRIVATE_KEY=your_private_key
HEDERA_NETWORK=testnet
```

## 🎮 How to Play

1. **Access the Game**: Visit the production URL
2. **Login**: Use Google authentication
3. **Create Guardian**: Choose your avatar
4. **Explore Biomes**: Start with Atlantic Forest
5. **Complete Missions**: Play mini-games and earn XP
6. **Earn NFTs**: Get Bio-Amulets for completed biomes
7. **View on Blockchain**: Check your NFTs on HashScan

## 🌟 Key Features

### Educational Content
- **Biome Information**: Detailed descriptions of Brazilian ecosystems
- **Conservation Challenges**: Real environmental issues
- **Indigenous Knowledge**: Integration of Brazilian folklore
- **Interactive Learning**: Gamified educational experience

### Web3 Integration
- **Real NFTs**: Actual blockchain tokens on Hedera
- **Verifiable Assets**: All NFTs visible on HashScan
- **Testnet Ready**: Fully functional on Hedera testnet
- **Scalable Architecture**: Ready for mainnet deployment

### User Experience
- **Responsive Design**: Works on all devices
- **Multi-language**: Portuguese and English support
- **Accessibility**: Inclusive design principles
- **Performance**: Optimized loading and gameplay

## 🔧 Technical Implementation

### Hedera Integration
```typescript
// NFT Creation on Hedera
const createBioAmulet = async (biomeId: string, playerId: string) => {
  const tokenId = await hederaService.createToken({
    name: `${biomeId} Bio-Amulet`,
    symbol: 'BIO',
    decimals: 0,
    initialSupply: 1
  });
  
  return tokenId;
};
```

### Cloudflare Functions
```typescript
// API endpoint for Hedera integration
export async function onRequest(context: EventContext) {
  const { request } = context;
  
  if (request.url.includes('/api/hedera/account')) {
    return handleHederaAccount(request);
  }
  
  return new Response('Not Found', { status: 404 });
}
```

## 📊 Impact Metrics

### Environmental Education
- **4 Brazilian Biomes**: Complete ecosystem coverage
- **5 Mini-Games**: Interactive learning experiences
- **Educational Content**: Rich biodiversity information
- **Cultural Integration**: Brazilian folklore and traditions

### Web3 Adoption
- **Real NFTs**: Actual blockchain tokens
- **Hedera Integration**: Enterprise-grade blockchain
- **Testnet Deployment**: Live demonstration
- **Scalable Architecture**: Ready for growth

### User Engagement
- **Gamification**: Mission-based progression
- **Reward System**: NFT-based achievements
- **Social Features**: Community building potential
- **Accessibility**: Multi-language support

## 🎯 Future Roadmap

### Phase 1: Foundation ✅
- [x] Core game mechanics
- [x] Hedera integration
- [x] NFT system
- [x] Multi-language support

### Phase 2: Expansion 🚧
- [ ] Additional biomes
- [ ] Community features
- [ ] Mobile app
- [ ] Mainnet deployment

### Phase 3: Ecosystem 🌱
- [ ] DAO governance
- [ ] Environmental partnerships
- [ ] Educational partnerships
- [ ] Global expansion

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Hello Future Hackathon**: For the opportunity to showcase this project
- **Hedera**: For providing the blockchain infrastructure
- **Cloudflare**: For hosting and serverless functions
- **Brazilian Environmentalists**: For inspiration and knowledge
- **Indigenous Communities**: For cultural heritage and wisdom

## 📞 Contact

- **Project Lead**: [Your Name]
- **Email**: [your.email@example.com]
- **GitHub**: [@your-username]
- **LinkedIn**: [Your LinkedIn]

## 🌟 Support the Project

If you find this project valuable, please consider:
- ⭐ Starring this repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- 🤝 Contributing code
- 📢 Sharing with others

---

**Made with ❤️ for the Hello Future Hackathon and Brazilian biodiversity preservation**
