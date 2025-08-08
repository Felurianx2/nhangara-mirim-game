# 🤝 Contributing to Nhangara Mirim

Thank you for your interest in contributing to Nhangara Mirim! This document provides guidelines for contributing to our Brazilian biomes conservation game.

## 🎯 Project Goals

Our mission is to:
- **Educate** about Brazilian biodiversity through interactive gameplay
- **Preserve** environmental knowledge through Web3 technology
- **Celebrate** Brazilian culture and folklore
- **Inspire** environmental conservation action

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git
- Basic knowledge of React/TypeScript

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/nhangara-mirim-game.git
   cd nhangara-mirim-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📋 Contribution Guidelines

### Code Style
- Use **TypeScript** for all new code
- Follow **ESLint** and **Prettier** configurations
- Use **TailwindCSS** for styling
- Write **meaningful commit messages**

### File Structure
```
src/
├── components/     # Reusable React components
├── screens/        # Game screen components
├── services/       # API and business logic
├── hooks/          # Custom React hooks
├── contexts/       # React contexts
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

### Naming Conventions
- **Components**: PascalCase (e.g., `BiomeCard.tsx`)
- **Files**: kebab-case (e.g., `hedera-service.ts`)
- **Variables**: camelCase (e.g., `playerState`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_LEVEL`)

## 🎮 Game Development

### Adding New Features

1. **Create a feature branch**
   ```bash
   git checkout -b feature/new-biome
   ```

2. **Implement your changes**
   - Add new components in `src/components/`
   - Add new screens in `src/screens/`
   - Update types in `src/types/types.ts`
   - Add translations in `src/services/i18nService.ts`

3. **Test your changes**
   ```bash
   npm run build
   npm run test
   ```

4. **Submit a pull request**

### Adding New Biomes

1. **Update biome definitions** in `src/utils/constants.ts`
2. **Add biome images** to `public/images/biomas/`
3. **Create biome missions** with mini-games
4. **Add translations** for new content
5. **Update NFT definitions** for new Bio-Amulets

### Adding New Mini-Games

1. **Create game component** in `src/screens/MissionScreen.tsx`
2. **Add game assets** to `public/images/mini-games/`
3. **Update mission types** in `src/types/types.ts`
4. **Add game logic** and scoring system
5. **Test thoroughly** across different devices

## 🌐 Internationalization

### Adding New Languages

1. **Create language file** in `src/services/i18n/`
2. **Add translations** for all text content
3. **Update language selector** in `src/components/LanguageToggle.tsx`
4. **Test translations** thoroughly

### Translation Guidelines
- Use **clear, concise language**
- Maintain **cultural sensitivity**
- Consider **local context** for Brazilian content
- Test with **native speakers**

## 🔗 Blockchain Integration

### Hedera Development

1. **Use testnet** for development
2. **Follow Hedera best practices**
3. **Implement proper error handling**
4. **Test token operations** thoroughly

### NFT Development

1. **Design meaningful metadata**
2. **Implement proper token standards**
3. **Add HashScan integration**
4. **Test on-chain operations**

## 🧪 Testing

### Testing Guidelines
- **Unit tests** for utility functions
- **Integration tests** for API calls
- **E2E tests** for critical user flows
- **Cross-browser testing** for compatibility

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📝 Documentation

### Code Documentation
- **JSDoc comments** for functions
- **README updates** for new features
- **API documentation** for services
- **Component documentation** for complex UI

### User Documentation
- **Game guides** for new players
- **Tutorial content** for features
- **FAQ updates** for common questions
- **Accessibility documentation**

## 🚀 Deployment

### Development Deployment
```bash
# Deploy to preview
npm run deploy:preview
```

### Production Deployment
```bash
# Deploy to production
npm run deploy:production
```

## 🐛 Bug Reports

### Reporting Bugs
1. **Check existing issues** first
2. **Use the bug report template**
3. **Include reproduction steps**
4. **Add screenshots/videos** if relevant
5. **Specify browser/device** information

### Bug Report Template
```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- Browser: [e.g., Chrome 120]
- Device: [e.g., Desktop, Mobile]
- OS: [e.g., Windows 11, iOS 17]

## Additional Information
Any other relevant details
```

## 💡 Feature Requests

### Suggesting Features
1. **Check existing feature requests**
2. **Use the feature request template**
3. **Explain the value** to users
4. **Consider implementation** complexity
5. **Provide mockups** if possible

### Feature Request Template
```markdown
## Feature Description
Brief description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this work?

## User Value
How does this benefit users?

## Implementation Notes
Any technical considerations
```

## 🤝 Community Guidelines

### Code of Conduct
- **Be respectful** and inclusive
- **Help others** learn and grow
- **Share knowledge** freely
- **Celebrate diversity** and different perspectives

### Communication
- **Use clear language** in issues and PRs
- **Be patient** with newcomers
- **Provide constructive feedback**
- **Ask questions** when needed

## 🏆 Recognition

### Contributor Recognition
- **Contributor list** in README
- **Special thanks** for major contributions
- **Hackathon credits** for participants
- **Open source recognition** for the community

### Contribution Types
- **Code contributions** (features, bug fixes)
- **Documentation** (guides, tutorials)
- **Design** (UI/UX improvements)
- **Testing** (bug reports, testing)
- **Community** (support, feedback)

## 📞 Getting Help

### Resources
- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and ideas
- **Documentation**: For technical details
- **Community**: For general support

### Contact
- **Project Lead**: Isamar Suarez
- **Email**: isasuarezx2@gmail.com
- **GitHub**: Felurianx2

## 🙏 Thank You

Thank you for contributing to Nhangara Mirim! Your efforts help us:
- **Educate** more people about Brazilian biodiversity
- **Preserve** environmental knowledge
- **Build** a better future for our planet
- **Create** positive impact through technology

---

**Together, we can make a difference for Brazilian biomes and environmental education! 🌱** 
