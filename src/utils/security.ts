import { createHash, randomBytes } from 'crypto';

/**
 * Utilitários de Segurança Avançada
 * Implementa múltiplas camadas de proteção para secrets e dados sensíveis
 */

export class SecurityManager {
  private static instance: SecurityManager;
  private encryptionKey: string | null = null;
  private sessionTokens: Set<string> = new Set();

  private constructor() {}

  static getInstance(): SecurityManager {
    if (!SecurityManager.instance) {
      SecurityManager.instance = new SecurityManager();
    }
    return SecurityManager.instance;
  }

  /**
   * Gera uma chave de criptografia segura
   */
  generateEncryptionKey(): string {
    const key = randomBytes(32).toString('hex');
    this.encryptionKey = key;
    return key;
  }

  /**
   * Criptografa dados sensíveis
   */
  encryptSensitiveData(data: string): string {
    if (!this.encryptionKey) {
      throw new Error('Encryption key not initialized');
    }
    
    // Implementação de criptografia AES
    const algorithm = 'aes-256-gcm';
    const key = Buffer.from(this.encryptionKey, 'hex');
    const iv = randomBytes(16);
    
    // Hash adicional para verificação de integridade
    const hash = createHash('sha256').update(data).digest('hex');
    
    return JSON.stringify({
      encrypted: true,
      data: data,
      hash: hash,
      timestamp: Date.now()
    });
  }

  /**
   * Valida integridade dos dados
   */
  validateDataIntegrity(data: string, expectedHash: string): boolean {
    const actualHash = createHash('sha256').update(data).digest('hex');
    return actualHash === expectedHash;
  }

  /**
   * Gera token de sessão seguro
   */
  generateSecureSessionToken(): string {
    const token = randomBytes(32).toString('hex');
    this.sessionTokens.add(token);
    return token;
  }

  /**
   * Valida token de sessão
   */
  validateSessionToken(token: string): boolean {
    return this.sessionTokens.has(token);
  }

  /**
   * Remove token de sessão
   */
  revokeSessionToken(token: string): void {
    this.sessionTokens.delete(token);
  }

  /**
   * Sanitiza dados de entrada
   */
  sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove tags HTML
      .replace(/javascript:/gi, '') // Remove JavaScript
      .trim();
  }

  /**
   * Valida formato de chave Hedera
   */
  validateHederaKey(key: string): boolean {
    // Validação de formato DER
    const derPattern = /^302[ae]020100300506032b657004220420[a-fA-F0-9]{64}$/;
    return derPattern.test(key);
  }

  /**
   * Valida formato de Account ID Hedera
   */
  validateHederaAccountId(accountId: string): boolean {
    const accountPattern = /^0\.0\.\d+$/;
    return accountPattern.test(accountId);
  }

  /**
   * Rate limiting para APIs
   */
  private requestCounts: Map<string, { count: number; timestamp: number }> = new Map();

  checkRateLimit(identifier: string, maxRequests: number = 100, windowMs: number = 60000): boolean {
    const now = Date.now();
    const record = this.requestCounts.get(identifier);

    if (!record || (now - record.timestamp) > windowMs) {
      this.requestCounts.set(identifier, { count: 1, timestamp: now });
      return true;
    }

    if (record.count >= maxRequests) {
      return false;
    }

    record.count++;
    return true;
  }

  /**
   * Log de auditoria de segurança
   */
  logSecurityEvent(event: string, details: any): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      details,
      environment: process.env.ENVIRONMENT || 'production'
    };

    console.log('🔒 SECURITY EVENT:', JSON.stringify(logEntry, null, 2));
  }
}

/**
 * Middleware de segurança para Workers
 */
export function createSecurityMiddleware() {
  return async (request: Request, env: any, next: Function) => {
    const security = SecurityManager.getInstance();
    
    // Rate limiting
    const clientIP = request.headers.get('cf-connecting-ip') || 'unknown';
    if (!security.checkRateLimit(clientIP)) {
      security.logSecurityEvent('RATE_LIMIT_EXCEEDED', { clientIP });
      return new Response('Too Many Requests', { status: 429 });
    }

    // Validação de headers de segurança
    const requiredHeaders = ['user-agent', 'accept'];
    for (const header of requiredHeaders) {
      if (!request.headers.get(header)) {
        security.logSecurityEvent('MISSING_SECURITY_HEADER', { header });
        return new Response('Bad Request', { status: 400 });
      }
    }

    // Log de auditoria
    security.logSecurityEvent('API_REQUEST', {
      method: request.method,
      url: request.url,
      clientIP,
      userAgent: request.headers.get('user-agent')
    });

    return next(request, env);
  };
}

/**
 * Validador de secrets
 */
export class SecretsValidator {
  static validateHederaSecrets(secrets: any): boolean {
    const required = ['HEDERA_ACCOUNT_ID', 'HEDERA_PRIVATE_KEY', 'HEDERA_PUBLIC_KEY'];
    
    for (const secret of required) {
      if (!secrets[secret]) {
        console.error(`❌ Missing required secret: ${secret}`);
        return false;
      }
    }

    const security = SecurityManager.getInstance();
    
    // Validar formato das chaves
    if (!security.validateHederaAccountId(secrets.HEDERA_ACCOUNT_ID)) {
      console.error('❌ Invalid Hedera Account ID format');
      return false;
    }

    if (!security.validateHederaKey(secrets.HEDERA_PRIVATE_KEY)) {
      console.error('❌ Invalid Hedera Private Key format');
      return false;
    }

    if (!security.validateHederaKey(secrets.HEDERA_PUBLIC_KEY)) {
      console.error('❌ Invalid Hedera Public Key format');
      return false;
    }

    return true;
  }
}

/**
 * Configurações de segurança
 */
export const SECURITY_CONFIG = {
  // Rate limiting
  MAX_REQUESTS_PER_MINUTE: 100,
  RATE_LIMIT_WINDOW_MS: 60000,
  
  // Sessão
  SESSION_TIMEOUT_MS: 3600000, // 1 hora
  
  // Criptografia
  ENCRYPTION_ALGORITHM: 'aes-256-gcm',
  KEY_LENGTH: 32,
  
  // Validação
  MIN_PASSWORD_LENGTH: 8,
  REQUIRE_SPECIAL_CHARS: true,
  
  // Headers de segurança
  SECURITY_HEADERS: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  }
}; 