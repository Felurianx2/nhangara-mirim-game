export type Language = 'pt-BR' | 'en-US';

export interface Translations {
  [key: string]: {
    'pt-BR': string;
    'en-US': string;
  };
}

class I18nService {
  private currentLanguage: Language = 'pt-BR';
  private readonly STORAGE_KEY = 'nhangara_language';

  constructor() {
    // Carregar idioma salvo ou usar padrão
    const savedLanguage = localStorage.getItem(this.STORAGE_KEY);
    if (savedLanguage && (savedLanguage === 'pt-BR' || savedLanguage === 'en-US')) {
      this.currentLanguage = savedLanguage as Language;
    }
  }

  // Obter idioma atual
  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  // Definir idioma
  setLanguage(language: Language): void {
    this.currentLanguage = language;
    localStorage.setItem(this.STORAGE_KEY, language);
  }

  // Alternar idioma
  toggleLanguage(): Language {
    const newLanguage = this.currentLanguage === 'pt-BR' ? 'en-US' : 'pt-BR';
    this.setLanguage(newLanguage);
    return newLanguage;
  }

  // Traduzir texto
  t(key: string): string {
    const translations: Translations = {
      // Títulos principais
      'app.title': {
        'pt-BR': 'Nhangara Mirim',
        'en-US': 'Nhangara Mirim'
      },
      'app.subtitle': {
        'pt-BR': 'Sua jornada para proteger os biomas do Brasil começa agora.',
        'en-US': 'Your journey to protect Brazil\'s biomes begins now.'
      },

      // Home Screen
      'home.welcome': {
        'pt-BR': 'Bem-vindo, Guardião!',
        'en-US': 'Welcome, Guardian!'
      },
      'home.subtitle': {
        'pt-BR': 'Sua jornada para proteger e celebrar os biomas brasileiros começa agora. Suas ações têm poder.',
        'en-US': 'Your journey to protect and celebrate the Brazilian biomes begins now. Your actions have power.'
      },
      'home.explore.biomes': {
        'pt-BR': 'Explorar Biomas',
        'en-US': 'Explore Biomes'
      },
      'home.explore.description': {
        'pt-BR': 'Viaje por ecossistemas diversos, conheça mentores folclóricos e complete missões regenerativas.',
        'en-US': 'Travel through diverse ecosystems, meet folkloric mentors, and complete regenerative missions.'
      },
      'home.wallet.title': {
        'pt-BR': 'Carteira do Guardião',
        'en-US': 'Guardian\'s Wallet'
      },
      'home.wallet.description': {
        'pt-BR': 'Veja seus Bio-Amuletos e outros tesouros digitais que você ganhou em sua jornada.',
        'en-US': 'View your Bio-Amulets and other digital treasures you\'ve earned on your journey.'
      },
      'home.artist.title': {
        'pt-BR': 'Você é um Artista?',
        'en-US': 'Are you an Artist?'
      },
      'home.artist.description': {
        'pt-BR': 'Transforme sua arte e cultura em um ativo digital único na Academia de Raízes Digitais.',
        'en-US': 'Transform your art and culture into a unique digital asset at the Digital Roots Academy.'
      },
      'home.collective.impact': {
        'pt-BR': 'Impacto Coletivo',
        'en-US': 'Collective Impact'
      },
      'home.collective.description': {
        'pt-BR': 'Quando 5 jogadores coletam itens de diferentes biomas, uma missão de impacto coletivo é desbloqueada para todos. Fique atento!',
        'en-US': 'When 5 players collect items from different biomes, a collective impact mission is unlocked for everyone. Stay tuned!'
      },
      'home.access': {
        'pt-BR': 'Acessar',
        'en-US': 'Access'
      },

      // Login
      'login.google': {
        'pt-BR': 'Entrar com Google',
        'en-US': 'Login with Google'
      },
      'login.google.description': {
        'pt-BR': 'Faça login com sua conta Google para começar sua jornada',
        'en-US': 'Sign in with your Google account to start your journey'
      },
      'login.email': {
        'pt-BR': 'Entrar com Email',
        'en-US': 'Login with Email'
      },
      'login.email.placeholder': {
        'pt-BR': 'seu@email.com',
        'en-US': 'your@email.com'
      },
      'login.email.label': {
        'pt-BR': 'Email',
        'en-US': 'Email'
      },
      'login.loading': {
        'pt-BR': 'Entrando...',
        'en-US': 'Logging in...'
      },
      'login.error': {
        'pt-BR': 'Erro no login',
        'en-US': 'Login error'
      },
      'logout': {
        'pt-BR': 'Sair',
        'en-US': 'Logout'
      },

      // Wallet
      'wallet.title': {
        'pt-BR': 'Carteira do Guardião',
        'en-US': 'Guardian\'s Wallet'
      },
      'wallet.subtitle': {
        'pt-BR': 'Seus Bio-Amuletos e tesouros digitais, prova do seu compromisso.',
        'en-US': 'Your Bio-Amulets and digital treasures, proof of your commitment.'
      },
      'wallet.hedera.account': {
        'pt-BR': 'Conta Hedera',
        'en-US': 'Hedera Account'
      },
      'wallet.hedera.account.id': {
        'pt-BR': 'ID da Conta',
        'en-US': 'Account ID'
      },
      'wallet.hedera.balance': {
        'pt-BR': 'Saldo HBAR',
        'en-US': 'HBAR Balance'
      },
      'wallet.nfts.title': {
        'pt-BR': 'Seus Bio-Amuletos (NFTs)',
        'en-US': 'Your Bio-Amulets (NFTs)'
      },
      'wallet.empty.title': {
        'pt-BR': 'Sua carteira está vazia',
        'en-US': 'Your wallet is empty'
      },
      'wallet.empty.subtitle': {
        'pt-BR': 'Complete as missões principais nos biomas para ganhar Bio-Amuletos únicos!',
        'en-US': 'Complete the main missions in the biomes to earn unique Bio-Amulets!'
      },

      // Welcome Video
      'welcome.title': {
        'pt-BR': 'Bem-vindo ao seu novo mundo de aventuras!',
        'en-US': 'Welcome to your new world of adventures!'
      },
      'welcome.watch.video': {
        'pt-BR': 'Assistir Vídeo de Boas-vindas',
        'en-US': 'Watch Welcome Video'
      },
      'welcome.skip.video': {
        'pt-BR': 'Pular Vídeo',
        'en-US': 'Skip Video'
      },
      'welcome.step1.title': {
        'pt-BR': 'Bem-vindo ao Nhangara Mirim!',
        'en-US': 'Welcome to Nhangara Mirim!'
      },
      'welcome.step1.description': {
        'pt-BR': 'Um jogo incrível sobre proteger a natureza',
        'en-US': 'An amazing game about protecting nature'
      },
      'welcome.step2.title': {
        'pt-BR': 'Vamos proteger os biomas do Brasil!',
        'en-US': 'Let\'s protect Brazil\'s biomes!'
      },
      'welcome.step2.description': {
        'pt-BR': 'Mata Atlântica, Amazônia, Cerrado e muito mais',
        'en-US': 'Atlantic Forest, Amazon, Cerrado and much more'
      },
      'welcome.step3.title': {
        'pt-BR': 'Você será um Guardião da Natureza!',
        'en-US': 'You will be a Nature Guardian!'
      },
      'welcome.step3.description': {
        'pt-BR': 'Complete missões e ganhe Bio-Amuletos',
        'en-US': 'Complete missions and earn Bio-Amulets'
      },
      'welcome.step4.title': {
        'pt-BR': 'Sua jornada começa agora!',
        'en-US': 'Your journey begins now!'
      },
      'welcome.step4.description': {
        'pt-BR': 'Vamos juntos proteger nosso planeta',
        'en-US': 'Let\'s together protect our planet'
      },
      'welcome.features.discover': {
        'pt-BR': '✨ Descubra os biomas do Brasil',
        'en-US': '✨ Discover Brazil\'s biomes'
      },
      'welcome.features.missions': {
        'pt-BR': '🌱 Complete missões ecológicas',
        'en-US': '🌱 Complete ecological missions'
      },
      'welcome.features.collect': {
        'pt-BR': '🏆 Colecione Bio-Amuletos únicos',
        'en-US': '🏆 Collect unique Bio-Amulets'
      },

      // Navigation
      'nav.continue.journey': {
        'pt-BR': 'Continuar Jornada',
        'en-US': 'Continue Journey'
      },
      'nav.first.time': {
        'pt-BR': 'Primeira vez? Comece aqui',
        'en-US': 'First time? Start here'
      },
      'nav.back': {
        'pt-BR': 'Voltar',
        'en-US': 'Back'
      },

      // Loading
      'loading': {
        'pt-BR': 'Carregando...',
        'en-US': 'Loading...'
      },
      'loading.account': {
        'pt-BR': 'Carregando informações da conta...',
        'en-US': 'Loading account information...'
      },

      // Success messages
      'wallet.created': {
        'pt-BR': 'Wallet Hedera criada com sucesso!',
        'en-US': 'Hedera wallet created successfully!'
      },

      // User profile
      'profile.title': {
        'pt-BR': 'Perfil do Usuário',
        'en-US': 'User Profile'
      },
      'profile.name': {
        'pt-BR': 'Nome',
        'en-US': 'Name'
      },
      'profile.email': {
        'pt-BR': 'Email',
        'en-US': 'Email'
      },

      // Language
      'language.pt': {
        'pt-BR': 'Português',
        'en-US': 'Portuguese'
      },
      'language.en': {
        'pt-BR': 'English',
        'en-US': 'English'
      }
    };

    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }

    return translation[this.currentLanguage] || key;
  }
}

export const i18nService = new I18nService(); 