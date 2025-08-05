import { databaseService } from '../services/databaseService';
import { initializeHederaWithSecrets } from '../src/services/hederaService';
import { createSecurityMiddleware, SecretsValidator, SECURITY_CONFIG } from '../src/utils/security';

export interface Env {
  DB: D1Database;
  // Environment
  ENVIRONMENT: string;
  HEDERA_NETWORK: string;
  
  // Development Secrets
  HEDERA_ACCOUNT_ID_DEV?: string;
  HEDERA_PRIVATE_KEY_DEV?: string;
  HEDERA_PUBLIC_KEY_DEV?: string;
  GOOGLE_CLIENT_ID_DEV?: string;
  GOOGLE_CLIENT_SECRET_DEV?: string;
  
  // Production Secrets
  HEDERA_ACCOUNT_ID_PROD?: string;
  HEDERA_PRIVATE_KEY_PROD?: string;
  HEDERA_PUBLIC_KEY_PROD?: string;
  GOOGLE_CLIENT_ID_PROD?: string;
  GOOGLE_CLIENT_SECRET_PROD?: string;
  
  // Cloudflare Secrets (shared)
  CLOUDFLARE_API_TOKEN?: string;
  CLOUDFLARE_ACCOUNT_ID?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Middleware de segurança
    const securityMiddleware = createSecurityMiddleware();
    
    return securityMiddleware(request, env, async (req: Request, env: Env) => {
      // Configurar banco de dados
      databaseService.setDatabase(env.DB);

      // Validar secrets antes de inicializar
      const environment = env.ENVIRONMENT || 'production';
      const isDev = environment === 'development';
      
      const secrets = {
        HEDERA_ACCOUNT_ID: isDev ? env.HEDERA_ACCOUNT_ID_DEV : env.HEDERA_ACCOUNT_ID_PROD,
        HEDERA_PRIVATE_KEY: isDev ? env.HEDERA_PRIVATE_KEY_DEV : env.HEDERA_PRIVATE_KEY_PROD,
        HEDERA_PUBLIC_KEY: isDev ? env.HEDERA_PUBLIC_KEY_DEV : env.HEDERA_PUBLIC_KEY_PROD,
      };

      // Validar secrets
      if (!SecretsValidator.validateHederaSecrets(secrets)) {
        console.error('❌ Invalid Hedera secrets configuration');
        return new Response('Internal Server Error', { status: 500 });
      }

      // Inicializar Hedera com secrets validados
      try {
        await initializeHederaWithSecrets(env);
      } catch (error) {
        console.error('Failed to initialize Hedera:', error);
        // Continue sem Hedera se falhar
      }

    const url = new URL(request.url);
    const path = url.pathname;

    // Headers de segurança
    const securityHeaders = {
      ...SECURITY_CONFIG.SECURITY_HEADERS,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: securityHeaders });
    }

    try {
      // Rotas da API
      if (path.startsWith('/api/users')) {
        return await handleUsers(request, env);
      } else if (path.startsWith('/api/auth')) {
        return await handleAuth(request, env);
      } else if (path.startsWith('/api/wallet')) {
        return await handleWallet(request, env);
      } else if (path.startsWith('/api/progress')) {
        return await handleProgress(request, env);
      } else if (path.startsWith('/api/hedera')) {
        return await handleHedera(request, env);
      } else {
        return new Response('Not Found', { status: 404, headers: securityHeaders });
      }
    } catch (error) {
      console.error('API Error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }),
        { status: 500, headers: { ...securityHeaders, 'Content-Type': 'application/json' } }
      );
    }
    });
  },
};

// Handlers para diferentes rotas
async function handleUsers(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/users' && request.method === 'POST') {
    const userData = await request.json();
    const user = await databaseService.createUser(userData);
    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('/api/users/') && request.method === 'GET') {
    const userId = path.split('/')[3];
    const user = await databaseService.getUserById(userId);
    if (!user) {
      return new Response('User not found', { status: 404 });
    }
    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Method not allowed', { status: 405 });
}

async function handleAuth(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/auth/login' && request.method === 'POST') {
    const { email, googleId } = await request.json();
    
    let user = null;
    if (googleId) {
      user = await databaseService.getUserByGoogleId(googleId);
    } else if (email) {
      user = await databaseService.getUserByEmail(email);
    }

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Atualizar último login
    await databaseService.updateUserLastLogin(user.id);

    // Criar sessão
    const session = await databaseService.createSession({ user_id: user.id });

    return new Response(JSON.stringify({ user, session }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path === '/api/auth/logout' && request.method === 'POST') {
    const { sessionToken } = await request.json();
    await databaseService.deleteSession(sessionToken);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Method not allowed', { status: 405 });
}

async function handleWallet(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/wallet' && request.method === 'POST') {
    const walletData = await request.json();
    const wallet = await databaseService.createWallet(walletData);
    return new Response(JSON.stringify(wallet), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('/api/wallet/') && request.method === 'GET') {
    const userId = path.split('/')[3];
    const wallet = await databaseService.getWalletByUserId(userId);
    return new Response(JSON.stringify(wallet), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Method not allowed', { status: 405 });
}

async function handleProgress(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/progress' && request.method === 'POST') {
    const progressData = await request.json();
    const progress = await databaseService.createUserProgress(progressData);
    return new Response(JSON.stringify(progress), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('/api/progress/') && request.method === 'GET') {
    const userId = path.split('/')[3];
    const progress = await databaseService.getUserProgress(userId);
    return new Response(JSON.stringify(progress), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  if (path.startsWith('/api/progress/') && request.method === 'PUT') {
    const userId = path.split('/')[3];
    const { welcome_video_seen } = await request.json();
    await databaseService.updateWelcomeVideoSeen(userId);
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response('Method not allowed', { status: 405 });
}

// Novo handler para Hedera
async function handleHedera(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/api/hedera/account' && request.method === 'GET') {
    try {
      const { hederaService } = await import('../src/services/hederaService');
      
      // Obter informações da conta principal (usando as secrets do Cloudflare)
      const accountInfo = await hederaService.getAccountInfo();
      
      return new Response(JSON.stringify({
        success: true,
        account: accountInfo
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Erro ao obter informações da conta Hedera:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to get Hedera account info'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  if (path === '/api/hedera/balance' && request.method === 'GET') {
    try {
      const { hederaService } = await import('../src/services/hederaService');
      
      // Obter saldo da conta principal
      const balance = await hederaService.getBalance(hederaService.getNetworkInfo().accountId!);
      
      return new Response(JSON.stringify({
        success: true,
        balance: balance
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Erro ao obter saldo da conta Hedera:', error);
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to get Hedera balance'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return new Response('Method not allowed', { status: 405 });
} 