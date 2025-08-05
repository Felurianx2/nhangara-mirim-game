import { hederaService } from './hederaService';

export interface UserData {
  email: string;
  name: string;
  picture?: string;
  isLoggedIn: boolean;
  userId?: string;
  createdAt?: string;
  lastLogin?: string;
  hasWallet?: boolean;
  walletAccountId?: string;
  welcomeVideoSeen?: boolean;
}

export interface AuthResponse {
  success: boolean;
  user?: UserData;
  error?: string;
  walletCreated?: boolean;
}

class AuthService {
  private readonly STORAGE_KEY = 'nhangaraUserData';
  private readonly CLOUDFLARE_API_URL = 'https://api.cloudflare.com/client/v4';

  // Verificar se usuário está logado
  isLoggedIn(): boolean {
    const userData = this.getUserData();
    return userData?.isLoggedIn || false;
  }

  // Obter dados do usuário
  getUserData(): UserData | null {
    try {
      console.log('🔍 Buscando dados do localStorage...');
      const data = localStorage.getItem(this.STORAGE_KEY);
      console.log('📄 Dados brutos do localStorage:', data);
      const result = data ? JSON.parse(data) : null;
      console.log('✅ Dados parseados:', result);
      return result;
    } catch (error) {
      console.error('❌ Erro ao obter dados do usuário:', error);
      return null;
    }
  }

  // Salvar dados do usuário
  saveUserData(userData: UserData): void {
    try {
      console.log('💾 Salvando no localStorage:', userData);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(userData));
      console.log('✅ Dados salvos com sucesso no localStorage');
    } catch (error) {
      console.error('❌ Erro ao salvar dados do usuário:', error);
    }
  }

  // Verificar se usuário tem wallet
  async checkUserWallet(userId: string): Promise<boolean> {
    try {
      // Para desenvolvimento, vamos simular que o usuário tem wallet
      // Em produção, você verificaria se a conta existe na Hedera
      console.log('🔍 Verificando wallet para usuário:', userId);
      return true; // Simulado para desenvolvimento
    } catch (error) {
      console.error('❌ Erro ao verificar wallet:', error);
      return false;
    }
  }

  // Criar wallet para usuário
  async createUserWallet(userId: string, userEmail: string): Promise<boolean> {
    try {
      console.log('🆕 Criando wallet para usuário:', userId, userEmail);
      // Para desenvolvimento, vamos simular a criação de wallet
      // Em produção, você criaria uma conta real na Hedera
      return true; // Simulado para desenvolvimento
    } catch (error) {
      console.error('❌ Erro ao criar wallet:', error);
      return false;
    }
  }

  // Verificar se usuário já viu o vídeo de boas-vindas
  hasSeenWelcomeVideo(): boolean {
    const userData = this.getUserData();
    return userData?.welcomeVideoSeen || false;
  }

  // Marcar vídeo como visto
  markWelcomeVideoAsSeen(): void {
    const userData = this.getUserData();
    if (userData) {
      userData.welcomeVideoSeen = true;
      this.saveUserData(userData);
    }
  }

  // Login com Google (mockado para desenvolvimento)
  async loginWithGoogle(): Promise<AuthResponse> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      const userId = 'user_' + Math.random().toString(36).substr(2, 9);
      const mockUserData: UserData = {
        email: 'guardian@nhangara.com',
        name: 'Guardian Player',
        picture: 'https://via.placeholder.com/40',
        isLoggedIn: true,
        userId,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        welcomeVideoSeen: false
      };

      // Verificar se usuário já tem wallet
      const hasWallet = await this.checkUserWallet(userId);
      mockUserData.hasWallet = hasWallet;

      // Se não tem wallet, criar uma
      let walletCreated = false;
      if (!hasWallet) {
        console.log('Criando wallet para novo usuário...');
        walletCreated = await this.createUserWallet(userId, mockUserData.email);
        mockUserData.hasWallet = walletCreated;
        
        if (walletCreated) {
          const userWallet = hederaService.getUserWallet(userId);
          if (userWallet) {
            mockUserData.walletAccountId = userWallet.accountId;
          }
        }
      }

      this.saveUserData(mockUserData);

      return {
        success: true,
        user: mockUserData,
        walletCreated
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro no login com Google'
      };
    }
  }

  // Login com email
  async loginWithEmail(email: string): Promise<AuthResponse> {
    try {
      if (!email || !email.includes('@')) {
        return {
          success: false,
          error: 'Email inválido'
        };
      }

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));

      const userId = 'user_' + Math.random().toString(36).substr(2, 9);
      const userData: UserData = {
        email: email,
        name: email.split('@')[0], // Usar parte do email como nome
        isLoggedIn: true,
        userId,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        welcomeVideoSeen: false
      };

      // Verificar se usuário já tem wallet
      const hasWallet = await this.checkUserWallet(userId);
      userData.hasWallet = hasWallet;

      // Se não tem wallet, criar uma
      let walletCreated = false;
      if (!hasWallet) {
        console.log('Criando wallet para novo usuário...');
        walletCreated = await this.createUserWallet(userId, email);
        userData.hasWallet = walletCreated;
        
        if (walletCreated) {
          const userWallet = hederaService.getUserWallet(userId);
          if (userWallet) {
            userData.walletAccountId = userWallet.accountId;
          }
        }
      }

      this.saveUserData(userData);

      return {
        success: true,
        user: userData,
        walletCreated
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro no login com email'
      };
    }
  }

  // Logout
  logout(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  // Verificar se é primeira vez
  isFirstTime(): boolean {
    const userData = this.getUserData();
    return !userData || !userData.lastLogin;
  }

  // Atualizar último login
  updateLastLogin(): void {
    const userData = this.getUserData();
    if (userData) {
      userData.lastLogin = new Date().toISOString();
      this.saveUserData(userData);
    }
  }

  // Sincronizar com Cloudflare (para produção)
  async syncWithCloudflare(userData: UserData): Promise<boolean> {
    try {
      // Em produção, aqui você faria uma chamada para a API do Cloudflare
      // para salvar os dados do usuário
      console.log('Sincronizando com Cloudflare:', userData);
      return true;
    } catch (error) {
      console.error('Erro ao sincronizar com Cloudflare:', error);
      return false;
    }
  }
}

export const authService = new AuthService(); 