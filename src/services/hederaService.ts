import { Client, AccountId, PrivateKey, PublicKey, TransferTransaction, Hbar, TokenId, AccountBalanceQuery, AccountInfoQuery } from '@hashgraph/sdk';

// Interface para os secrets do ambiente
interface HederaSecrets {
  HEDERA_ACCOUNT_ID: string;
  HEDERA_PRIVATE_KEY: string;
  HEDERA_PUBLIC_KEY: string;
  HEDERA_NETWORK: string;
  ENVIRONMENT: string;
}

// Interface para informações da conta
export interface HederaAccountInfo {
  accountId: string;
  balance: string;
  tokens: Array<{
    tokenId: string;
    balance: number;
    name: string;
  }>;
}

// Interface para transação
export interface HederaTransaction {
  transactionId: string;
  status: string;
  timestamp: string;
}

/**
 * Cria um cliente Hedera configurado para Cloudflare Workers
 * Usa as secrets do ambiente do Worker
 */
export function createHederaClient(env: any): Client {
  const environment = env.ENVIRONMENT || 'production';
  const isDev = environment === 'development';
  
  const accountId = isDev ? env.HEDERA_ACCOUNT_ID_DEV : env.HEDERA_ACCOUNT_ID_PROD;
  const privateKey = isDev ? env.HEDERA_PRIVATE_KEY_DEV : env.HEDERA_PRIVATE_KEY_PROD;
  const network = env.HEDERA_NETWORK || (isDev ? 'testnet' : 'mainnet');

  if (!accountId || !privateKey) {
    throw new Error('HEDERA_ACCOUNT_ID e HEDERA_PRIVATE_KEY são obrigatórios no ambiente do Cloudflare Worker');
  }

  try {
    // Criar chaves a partir dos secrets
    const privateKeyObj = PrivateKey.fromString(privateKey);
    const accountIdObj = AccountId.fromString(accountId);

    // Configurar cliente
    const client = Client.forName(network)
      .setOperator(accountIdObj, privateKeyObj);

    console.log(`✅ Hedera client created for network: ${network}`);
    console.log(`   Environment: ${environment}`);
    console.log(`   Operator: ${client.operatorAccountId}`);
    
    return client;
  } catch (error) {
    console.error('❌ Failed to create Hedera client:', error);
    throw new Error('Failed to create Hedera client');
  }
}

/**
 * Obtém informações de uma conta
 */
export async function getAccountInfo(client: Client, accountId: string) {
  try {
    const accountIdObj = AccountId.fromString(accountId);
    const accountInfo = await new AccountInfoQuery()
      .setAccountId(accountIdObj)
      .execute(client);

    return accountInfo;
  } catch (error) {
    console.error('❌ Failed to get account info:', error);
    throw new Error('Failed to get account info');
  }
}

/**
 * Obtém o saldo de uma conta
 */
export async function getAccountBalance(client: Client, accountId: string) {
  try {
    const accountIdObj = AccountId.fromString(accountId);
    const balance = await new AccountBalanceQuery()
      .setAccountId(accountIdObj)
      .execute(client);

    return balance.hbars.toString();
  } catch (error) {
    console.error('❌ Failed to get account balance:', error);
    throw new Error('Failed to get account balance');
  }
}

class HederaService {
  private client: Client | null = null;
  private accountId: string | null = null;
  private privateKey: string | null = null;
  private publicKey: string | null = null;
  private network: string = 'testnet';
  private env: any = null;

  /**
   * Inicializa o cliente Hedera com os secrets do Cloudflare Worker
   */
  async initialize(env: any): Promise<void> {
    try {
      this.env = env;
      const environment = env.ENVIRONMENT || 'production';
      const isDev = environment === 'development';
      
      this.accountId = isDev ? env.HEDERA_ACCOUNT_ID_DEV : env.HEDERA_ACCOUNT_ID_PROD;
      this.privateKey = isDev ? env.HEDERA_PRIVATE_KEY_DEV : env.HEDERA_PRIVATE_KEY_PROD;
      this.publicKey = isDev ? env.HEDERA_PUBLIC_KEY_DEV : env.HEDERA_PUBLIC_KEY_PROD;
      this.network = env.HEDERA_NETWORK || (isDev ? 'testnet' : 'mainnet');

      // Usar a função createHederaClient para criar o cliente
      this.client = createHederaClient(env);

      console.log(`✅ Hedera client initialized for environment: ${environment}`);
      console.log(`🌐 Network: ${this.network}`);
    } catch (error) {
      console.error('❌ Failed to initialize Hedera client:', error);
      throw new Error('Failed to initialize Hedera client');
    }
  }

  /**
   * Obtém informações da conta
   */
  async getAccountInfo(accountId?: string): Promise<HederaAccountInfo> {
    if (!this.client) {
      throw new Error('Hedera client not initialized');
    }

    try {
      const targetAccountId = accountId || this.accountId!;
      const accountInfo = await getAccountInfo(this.client, targetAccountId);
      const balance = await getAccountBalance(this.client, targetAccountId);

      return {
        accountId: targetAccountId,
        balance: balance,
        tokens: accountInfo.tokens ? Object.entries(accountInfo.tokens).map(([tokenId, balance]) => ({
          tokenId,
          balance: balance.toNumber(),
          name: `Token ${tokenId}`
        })) : []
      };
    } catch (error) {
      console.error('❌ Failed to get account info:', error);
      throw new Error('Failed to get account info');
    }
  }

  /**
   * Transfere HBAR entre contas
   */
  async transferHBAR(
    fromAccountId: string,
    toAccountId: string,
    amount: number
  ): Promise<HederaTransaction> {
    if (!this.client) {
      throw new Error('Hedera client not initialized');
    }

    try {
      const transferTx = new TransferTransaction()
        .addHbarTransfer(AccountId.fromString(fromAccountId), new Hbar(-amount))
        .addHbarTransfer(AccountId.fromString(toAccountId), new Hbar(amount))
        .setTransactionMemo('Nhangara Mirim Game Transfer');

      const response = await transferTx.execute(this.client);
      const receipt = await response.getReceipt(this.client);

      return {
        transactionId: response.transactionId.toString(),
        status: receipt.status.toString(),
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('❌ Failed to transfer HBAR:', error);
      throw new Error('Failed to transfer HBAR');
    }
  }

  /**
   * Cria uma nova conta Hedera
   */
  async createAccount(
    publicKey: string,
    initialBalance: number = 0
  ): Promise<{ accountId: string; privateKey: string }> {
    if (!this.client) {
      throw new Error('Hedera client not initialized');
    }

    try {
      // Gerar nova chave privada
      const newPrivateKey = PrivateKey.generateED25519();
      const newPublicKey = newPrivateKey.publicKey;

      // Criar transação de criação de conta
      const transaction = new TransferTransaction()
        .addHbarTransfer(AccountId.fromString(this.accountId!), new Hbar(-initialBalance))
        .addHbarTransfer(newPublicKey, new Hbar(initialBalance))
        .setTransactionMemo('Nhangara Mirim - New User Account');

      const response = await transaction.execute(this.client);
      const receipt = await response.getReceipt(this.client);

      // Obter o ID da nova conta
      const newAccountId = receipt.accountId;

      return {
        accountId: newAccountId!.toString(),
        privateKey: newPrivateKey.toString()
      };
    } catch (error) {
      console.error('❌ Failed to create account:', error);
      throw new Error('Failed to create account');
    }
  }

  /**
   * Verifica se uma conta existe
   */
  async accountExists(accountId: string): Promise<boolean> {
    try {
      await this.getAccountInfo(accountId);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtém o saldo de uma conta
   */
  async getBalance(accountId: string): Promise<string> {
    try {
      const accountInfo = await this.getAccountInfo(accountId);
      return accountInfo.balance;
    } catch (error) {
      console.error('❌ Failed to get balance:', error);
      throw new Error('Failed to get balance');
    }
  }

  /**
   * Obtém informações do token
   */
  async getTokenInfo(tokenId: string): Promise<{
    tokenId: string;
    name: string;
    symbol: string;
    totalSupply: number;
  }> {
    if (!this.client) {
      throw new Error('Hedera client not initialized');
    }

    try {
      const tokenIdObj = TokenId.fromString(tokenId);
      // Aqui você implementaria a lógica para obter informações do token
      // Por enquanto, retornamos dados mock
      return {
        tokenId,
        name: 'Nhangara Mirim Token',
        symbol: 'NHG',
        totalSupply: 1000000
      };
    } catch (error) {
      console.error('❌ Failed to get token info:', error);
      throw new Error('Failed to get token info');
    }
  }

  /**
   * Verifica a conectividade com a rede Hedera
   */
  async checkConnectivity(): Promise<boolean> {
    if (!this.client) {
      return false;
    }

    try {
      const accountInfo = await this.getAccountInfo(this.accountId!);
      return accountInfo.accountId === this.accountId;
    } catch (error) {
      console.error('❌ Hedera connectivity check failed:', error);
      return false;
    }
  }

  /**
   * Obtém informações da rede
   */
  getNetworkInfo(): {
    network: string;
    accountId: string | null;
    isConnected: boolean;
  } {
    return {
      network: this.network,
      accountId: this.accountId,
      isConnected: this.client !== null
    };
  }
}

// Instância singleton
export const hederaService = new HederaService();

// Função helper para inicializar com secrets do Cloudflare Worker
export async function initializeHederaWithSecrets(env: any): Promise<void> {
  const environment = env.ENVIRONMENT || 'production';
  const isDev = environment === 'development';
  
  console.log(`🔧 Initializing Hedera for environment: ${environment}`);
  console.log(`🌐 Network: ${env.HEDERA_NETWORK || (isDev ? 'testnet' : 'mainnet')}`);
  
  // Validar se as secrets estão configuradas
  const requiredSecrets = isDev 
    ? ['HEDERA_ACCOUNT_ID_DEV', 'HEDERA_PRIVATE_KEY_DEV', 'HEDERA_PUBLIC_KEY_DEV']
    : ['HEDERA_ACCOUNT_ID_PROD', 'HEDERA_PRIVATE_KEY_PROD', 'HEDERA_PUBLIC_KEY_PROD'];
  
  for (const secret of requiredSecrets) {
    if (!env[secret]) {
      console.error(`❌ Missing required secret: ${secret}`);
      throw new Error(`Missing required secret: ${secret}`);
    }
  }
  
  await hederaService.initialize(env);
} 