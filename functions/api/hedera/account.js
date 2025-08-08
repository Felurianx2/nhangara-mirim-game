// Cloudflare Pages Function para /api/hedera/account
export async function onRequest(context) {
  const { request, env } = context;

  // Headers de segurança
  const securityHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: securityHeaders });
  }

  try {
    // Detectar ambiente baseado nas variáveis disponíveis
    const environment = env.ENVIRONMENT || 'production';
    const isPreview = env.ENVIRONMENT === 'preview';
    const isDev = env.ENVIRONMENT === 'development';
    
    console.log('🔍 Environment:', environment);
    console.log('🔍 Is Preview:', isPreview);
    console.log('🔍 Is Dev:', isDev);

    // Verificar se as secrets estão disponíveis
    const hasProdSecrets = env.HEDERA_ACCOUNT_ID_PROD && env.HEDERA_PRIVATE_KEY_PROD;
    const hasDevSecrets = env.HEDERA_ACCOUNT_ID_DEV && env.HEDERA_PRIVATE_KEY_DEV;

    console.log('🔍 Has Prod Secrets:', hasProdSecrets);
    console.log('🔍 Has Dev Secrets:', hasDevSecrets);

    // Por enquanto, retornar dados simulados para demonstrar que a integração funciona
    // Em produção real, você faria a chamada para a API Hedera
    const accountInfo = {
      accountId: "0.0.1234567", // Account ID simulado
      balance: "1000.0",
      tokens: [
        {
          tokenId: "0.0.123456",
          balance: 10,
          name: "NHANGARA_TOKEN"
        },
        {
          tokenId: "0.0.789012",
          balance: 5,
          name: "BIOME_GUARDIAN_TOKEN"
        }
      ]
    };

    return new Response(JSON.stringify({
      success: true,
      account: accountInfo,
      message: "Hedera integration working!",
      environment: environment,
      network: "mainnet",
      status: "simulated",
      note: "This is a simulated response. Real Hedera integration requires proper secret configuration.",
      secretsStatus: {
        hasProdSecrets,
        hasDevSecrets,
        environment
      }
    }), { headers: securityHeaders });

  } catch (error) {
    console.error('Erro ao obter informações da conta Hedera:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to get Hedera account info',
      details: error.message
    }), { status: 500, headers: securityHeaders });
  }
} 