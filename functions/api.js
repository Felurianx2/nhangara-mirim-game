// Cloudflare Pages Functions - API para Hedera
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

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
    // Rota para informações da conta Hedera
    if (path === '/api/hedera/account' && request.method === 'GET') {
      return await handleHederaAccount(env, securityHeaders);
    }

    // Rota para saldo da conta Hedera
    if (path === '/api/hedera/balance' && request.method === 'GET') {
      return await handleHederaBalance(env, securityHeaders);
    }

    // Rota não encontrada
    return new Response(JSON.stringify({ error: 'Route not found' }), {
      status: 404,
      headers: securityHeaders
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error.message }),
      { status: 500, headers: securityHeaders }
    );
  }
}

async function handleHederaAccount(env, headers) {
  try {
    // Obter secrets do ambiente
    const environment = env.ENVIRONMENT || 'production';
    const isDev = environment === 'development';
    
    const accountId = isDev ? env.HEDERA_ACCOUNT_ID_DEV : env.HEDERA_ACCOUNT_ID_PROD;
    const privateKey = isDev ? env.HEDERA_PRIVATE_KEY_DEV : env.HEDERA_PRIVATE_KEY_PROD;
    const network = env.HEDERA_NETWORK || (isDev ? 'testnet' : 'mainnet');

    if (!accountId || !privateKey) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Hedera secrets not configured'
      }), { status: 500, headers });
    }

    // Simular dados da conta (por enquanto)
    // Em produção, você faria a chamada real para a API Hedera
    const accountInfo = {
      accountId: accountId,
      balance: "1000.0",
      tokens: [
        {
          tokenId: "0.0.123456",
          balance: 10,
          name: "NHANGARA_TOKEN"
        }
      ]
    };

    return new Response(JSON.stringify({
      success: true,
      account: accountInfo
    }), { headers });

  } catch (error) {
    console.error('Erro ao obter informações da conta Hedera:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to get Hedera account info',
      details: error.message
    }), { status: 500, headers });
  }
}

async function handleHederaBalance(env, headers) {
  try {
    const environment = env.ENVIRONMENT || 'production';
    const isDev = environment === 'development';
    
    const accountId = isDev ? env.HEDERA_ACCOUNT_ID_DEV : env.HEDERA_ACCOUNT_ID_PROD;

    if (!accountId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Hedera account ID not configured'
      }), { status: 500, headers });
    }

    // Simular saldo (por enquanto)
    const balance = "1000.0";

    return new Response(JSON.stringify({
      success: true,
      balance: balance
    }), { headers });

  } catch (error) {
    console.error('Erro ao obter saldo da conta Hedera:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to get Hedera balance',
      details: error.message
    }), { status: 500, headers });
  }
} 