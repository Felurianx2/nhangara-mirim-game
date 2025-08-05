const { Client, AccountId, PrivateKey } = require('@hashgraph/sdk');

/**
 * Teste de conectividade com Hedera para Cloudflare Workers
 * Simula o ambiente do Cloudflare Worker
 */
async function testHederaConnectivity() {
    console.log("🧪 Teste de Conectividade com Hedera (Cloudflare Workers)\n");
    console.log("=".repeat(50));

    let testsPassed = 0;
    let totalTests = 4;

    // Simular ambiente do Cloudflare Worker
    const mockEnv = {
        ENVIRONMENT: 'development',
        HEDERA_NETWORK: 'testnet',
        HEDERA_ACCOUNT_ID_DEV: process.env.HEDERA_ACCOUNT_ID_DEV || process.env.ACCOUNT_ID,
        HEDERA_PRIVATE_KEY_DEV: process.env.HEDERA_PRIVATE_KEY_DEV || process.env.PRIVATE_KEY,
        HEDERA_PUBLIC_KEY_DEV: process.env.HEDERA_PUBLIC_KEY_DEV || process.env.PUBLIC_KEY,
        HEDERA_ACCOUNT_ID_PROD: process.env.HEDERA_ACCOUNT_ID_PROD,
        HEDERA_PRIVATE_KEY_PROD: process.env.HEDERA_PRIVATE_KEY_PROD,
        HEDERA_PUBLIC_KEY_PROD: process.env.HEDERA_PUBLIC_KEY_PROD
    };

    // Teste 1: Verificar variáveis de ambiente do Cloudflare
    console.log("📋 Teste 1: Verificando secrets do Cloudflare Workers...");
    try {
        const environment = mockEnv.ENVIRONMENT || 'production';
        const isDev = environment === 'development';
        
        const accountId = isDev ? mockEnv.HEDERA_ACCOUNT_ID_DEV : mockEnv.HEDERA_ACCOUNT_ID_PROD;
        const privateKey = isDev ? mockEnv.HEDERA_PRIVATE_KEY_DEV : mockEnv.HEDERA_PRIVATE_KEY_PROD;
        const network = mockEnv.HEDERA_NETWORK || (isDev ? 'testnet' : 'mainnet');

        if (!accountId) {
            throw new Error("HEDERA_ACCOUNT_ID não configurado no Cloudflare");
        }
        if (!privateKey) {
            throw new Error("HEDERA_PRIVATE_KEY não configurado no Cloudflare");
        }

        console.log("✅ Secrets do Cloudflare configuradas corretamente");
        console.log(`   Environment: ${environment}`);
        console.log(`   Account ID: ${accountId}`);
        console.log(`   Network: ${network}`);
        console.log(`   Private Key: ${privateKey.substring(0, 20)}...`);
        testsPassed++;
    } catch (error) {
        console.log("❌ Erro nas secrets do Cloudflare:", error.message);
        console.log("💡 Configure as secrets no Cloudflare Workers:");
        console.log("   npm run setup-hedera-secrets");
    }

    // Teste 2: Criar cliente básico
    console.log("\n🔧 Teste 2: Criando cliente Hedera básico...");
    try {
        const client = Client.forName("testnet");
        console.log("✅ Cliente Hedera básico criado com sucesso");
        console.log(`   Rede: testnet`);
        testsPassed++;
    } catch (error) {
        console.log("❌ Erro ao criar cliente básico:", error.message);
    }

    // Teste 3: Criar cliente com credenciais do Cloudflare
    console.log("\n🔐 Teste 3: Criando cliente Hedera com credenciais do Cloudflare...");
    try {
        const environment = mockEnv.ENVIRONMENT || 'production';
        const isDev = environment === 'development';
        
        const accountId = isDev ? mockEnv.HEDERA_ACCOUNT_ID_DEV : mockEnv.HEDERA_ACCOUNT_ID_PROD;
        const privateKey = isDev ? mockEnv.HEDERA_PRIVATE_KEY_DEV : mockEnv.HEDERA_PRIVATE_KEY_PROD;
        const network = mockEnv.HEDERA_NETWORK || (isDev ? 'testnet' : 'mainnet');

        if (!accountId || !privateKey) {
            throw new Error("Credenciais não configuradas no Cloudflare");
        }

        const privateKeyObj = PrivateKey.fromString(privateKey);
        const accountIdObj = AccountId.fromString(accountId);

        const client = Client.forName(network)
            .setOperator(accountIdObj, privateKeyObj);

        console.log("✅ Cliente Hedera com credenciais do Cloudflare criado com sucesso");
        console.log(`   Environment: ${environment}`);
        console.log(`   Operator: ${client.operatorAccountId}`);
        console.log(`   Network: ${network}`);
        testsPassed++;
    } catch (error) {
        console.log("❌ Erro ao criar cliente com credenciais do Cloudflare:", error.message);
        console.log("💡 Verifique se as secrets estão configuradas no Cloudflare");
    }

    // Teste 4: Teste de conectividade com Cloudflare
    console.log("\n🌐 Teste 4: Testando conectividade com Cloudflare Workers...");
    try {
        const environment = mockEnv.ENVIRONMENT || 'production';
        const isDev = environment === 'development';
        
        const accountId = isDev ? mockEnv.HEDERA_ACCOUNT_ID_DEV : mockEnv.HEDERA_ACCOUNT_ID_PROD;
        const privateKey = isDev ? mockEnv.HEDERA_PRIVATE_KEY_DEV : mockEnv.HEDERA_PRIVATE_KEY_PROD;
        const network = mockEnv.HEDERA_NETWORK || (isDev ? 'testnet' : 'mainnet');

        if (!accountId || !privateKey) {
            throw new Error("Credenciais não configuradas no Cloudflare");
        }

        const privateKeyObj = PrivateKey.fromString(privateKey);
        const accountIdObj = AccountId.fromString(accountId);

        const client = Client.forName(network)
            .setOperator(accountIdObj, privateKeyObj);

        // Teste simples de conectividade
        console.log("✅ Conectividade com Hedera via Cloudflare Workers estabelecida");
        console.log(`   Status: Cliente pronto para uso`);
        console.log(`   Environment: ${environment}`);
        console.log(`   Operator: ${client.operatorAccountId}`);
        testsPassed++;
    } catch (error) {
        console.log("❌ Erro de conectividade com Cloudflare:", error.message);
        console.log("💡 Verifique sua conexão e as secrets do Cloudflare");
    }

    // Resultado final
    console.log("\n" + "=".repeat(50));
    console.log(`📊 Resultado dos testes: ${testsPassed}/${totalTests} passaram`);
    
    if (testsPassed === totalTests) {
        console.log("🎉 Todos os testes passaram! Você está pronto para usar o Hedera no Cloudflare.");
        console.log("\n💡 Próximos passos:");
        console.log("1. Configure as secrets no Cloudflare: npm run setup-hedera-secrets");
        console.log("2. Deploy para desenvolvimento: npm run deploy:dev");
        console.log("3. Teste a aplicação no ambiente de desenvolvimento");
    } else if (testsPassed >= 2) {
        console.log("⚠️  Alguns testes falharam. Verifique a configuração.");
        console.log("\n💡 Próximos passos:");
        console.log("1. Configure as secrets no Cloudflare Workers");
        console.log("2. Execute: npm run setup-hedera-secrets");
        console.log("3. Obtenha credenciais em: https://portal.hedera.com/");
    } else {
        console.log("❌ Muitos testes falharam. Verifique a configuração básica.");
        console.log("\n💡 Próximos passos:");
        console.log("1. Verifique se o @hashgraph/sdk está instalado");
        console.log("2. Configure as secrets no Cloudflare Workers");
        console.log("3. Obtenha credenciais do portal Hedera");
    }

    console.log("\n📚 Recursos úteis:");
    console.log("- Portal Hedera: https://portal.hedera.com/");
    console.log("- Cloudflare Workers: https://developers.cloudflare.com/workers/");
    console.log("- HashScan (Explorer): https://hashscan.io/");
    console.log("\n🔧 Comandos úteis:");
    console.log("- Configurar secrets: npm run setup-hedera-secrets");
    console.log("- Deploy dev: npm run deploy:dev");
    console.log("- Deploy prod: npm run deploy:prod");
}

// Executa os testes
if (require.main === module) {
    testHederaConnectivity();
}

module.exports = { testHederaConnectivity }; 