import { UserData } from './authService';

export interface DatabaseUser {
    id: string;
    email: string;
    name: string;
    picture?: string;
    google_id?: string;
    created_at: string;
    last_login: string;
    is_active: boolean;
}

export interface DatabaseWallet {
    id: string;
    user_id: string;
    account_id: string;
    private_key: string;
    public_key: string;
    balance_hbar: number;
    created_at: string;
}

export interface DatabaseProgress {
    id: string;
    user_id: string;
    level: number;
    experience_points: number;
    seeds_earned: number;
    welcome_video_seen: boolean;
    created_at: string;
    updated_at: string;
}

export interface DatabaseNFT {
    id: string;
    user_id: string;
    nft_id: string;
    name: string;
    description?: string;
    image_url?: string;
    biome_id?: string;
    minted_at: string;
}

export interface DatabaseSession {
    id: string;
    user_id: string;
    session_token: string;
    expires_at: string;
    created_at: string;
}

class DatabaseService {
    private db: D1Database | null = null;

    constructor() {
        // Em desenvolvimento, usamos localStorage
        // Em produção, usamos Cloudflare D1
        if (typeof window !== 'undefined') {
            // Cliente-side: usar localStorage
            this.db = null;
        }
    }

    // Configurar banco de dados (chamado no servidor)
    setDatabase(database: D1Database) {
        this.db = database;
    }

    // === USUÁRIOS ===
    async createUser(userData: Partial<DatabaseUser>): Promise<DatabaseUser> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const id = userData.id || crypto.randomUUID();
        const now = new Date().toISOString();

        const result = await this.db.prepare(`
            INSERT INTO users (id, email, name, picture, google_id, created_at, last_login)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
            id,
            userData.email,
            userData.name,
            userData.picture || null,
            userData.google_id || null,
            now,
            now
        ).run();

        return {
            id,
            email: userData.email!,
            name: userData.name!,
            picture: userData.picture,
            google_id: userData.google_id,
            created_at: now,
            last_login: now,
            is_active: true
        };
    }

    async getUserById(id: string): Promise<DatabaseUser | null> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const result = await this.db.prepare(`
            SELECT * FROM users WHERE id = ? AND is_active = 1
        `).bind(id).first<DatabaseUser>();

        return result || null;
    }

    async getUserByEmail(email: string): Promise<DatabaseUser | null> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const result = await this.db.prepare(`
            SELECT * FROM users WHERE email = ? AND is_active = 1
        `).bind(email).first<DatabaseUser>();

        return result || null;
    }

    async getUserByGoogleId(googleId: string): Promise<DatabaseUser | null> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const result = await this.db.prepare(`
            SELECT * FROM users WHERE google_id = ? AND is_active = 1
        `).bind(googleId).first<DatabaseUser>();

        return result || null;
    }

    async updateUserLastLogin(id: string): Promise<void> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        await this.db.prepare(`
            UPDATE users SET last_login = ? WHERE id = ?
        `).bind(new Date().toISOString(), id).run();
    }

    // === WALLETS ===
    async createWallet(walletData: Partial<DatabaseWallet>): Promise<DatabaseWallet> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const id = walletData.id || crypto.randomUUID();
        const now = new Date().toISOString();

        await this.db.prepare(`
            INSERT INTO wallets (id, user_id, account_id, private_key, public_key, balance_hbar, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
            id,
            walletData.user_id,
            walletData.account_id,
            walletData.private_key,
            walletData.public_key,
            walletData.balance_hbar || 0,
            now
        ).run();

        return {
            id,
            user_id: walletData.user_id!,
            account_id: walletData.account_id!,
            private_key: walletData.private_key!,
            public_key: walletData.public_key!,
            balance_hbar: walletData.balance_hbar || 0,
            created_at: now
        };
    }

    async getWalletByUserId(userId: string): Promise<DatabaseWallet | null> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const result = await this.db.prepare(`
            SELECT * FROM wallets WHERE user_id = ?
        `).bind(userId).first<DatabaseWallet>();

        return result || null;
    }

    // === PROGRESSO ===
    async createUserProgress(progressData: Partial<DatabaseProgress>): Promise<DatabaseProgress> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const id = progressData.id || crypto.randomUUID();
        const now = new Date().toISOString();

        await this.db.prepare(`
            INSERT INTO user_progress (id, user_id, level, experience_points, seeds_earned, welcome_video_seen, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
            id,
            progressData.user_id,
            progressData.level || 1,
            progressData.experience_points || 0,
            progressData.seeds_earned || 0,
            progressData.welcome_video_seen || false,
            now,
            now
        ).run();

        return {
            id,
            user_id: progressData.user_id!,
            level: progressData.level || 1,
            experience_points: progressData.experience_points || 0,
            seeds_earned: progressData.seeds_earned || 0,
            welcome_video_seen: progressData.welcome_video_seen || false,
            created_at: now,
            updated_at: now
        };
    }

    async getUserProgress(userId: string): Promise<DatabaseProgress | null> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const result = await this.db.prepare(`
            SELECT * FROM user_progress WHERE user_id = ?
        `).bind(userId).first<DatabaseProgress>();

        return result || null;
    }

    async updateWelcomeVideoSeen(userId: string): Promise<void> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        await this.db.prepare(`
            UPDATE user_progress SET welcome_video_seen = 1, updated_at = ? WHERE user_id = ?
        `).bind(new Date().toISOString(), userId).run();
    }

    // === SESSÕES ===
    async createSession(sessionData: Partial<DatabaseSession>): Promise<DatabaseSession> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const id = sessionData.id || crypto.randomUUID();
        const sessionToken = sessionData.session_token || crypto.randomUUID();
        const now = new Date().toISOString();
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 dias

        await this.db.prepare(`
            INSERT INTO sessions (id, user_id, session_token, expires_at, created_at)
            VALUES (?, ?, ?, ?, ?)
        `).bind(
            id,
            sessionData.user_id,
            sessionToken,
            expiresAt,
            now
        ).run();

        return {
            id,
            user_id: sessionData.user_id!,
            session_token: sessionToken,
            expires_at: expiresAt,
            created_at: now
        };
    }

    async getSessionByToken(token: string): Promise<DatabaseSession | null> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        const result = await this.db.prepare(`
            SELECT * FROM sessions WHERE session_token = ? AND expires_at > datetime('now')
        `).bind(token).first<DatabaseSession>();

        return result || null;
    }

    async deleteSession(token: string): Promise<void> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        await this.db.prepare(`
            DELETE FROM sessions WHERE session_token = ?
        `).bind(token).run();
    }

    // === MIGRAÇÃO DE DADOS ===
    async migrateFromLocalStorage(userData: UserData): Promise<void> {
        if (!this.db) {
            throw new Error('Database not initialized');
        }

        // Verificar se usuário já existe
        const existingUser = await this.getUserByEmail(userData.email);
        if (existingUser) {
            return; // Usuário já existe no banco
        }

        // Criar usuário
        const dbUser = await this.createUser({
            id: userData.userId,
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
            google_id: userData.googleId
        });

        // Criar progresso
        await this.createUserProgress({
            user_id: dbUser.id,
            welcome_video_seen: userData.welcomeVideoSeen
        });

        // Se tem wallet, criar no banco
        if (userData.hasWallet && userData.walletAccountId) {
            await this.createWallet({
                user_id: dbUser.id,
                account_id: userData.walletAccountId,
                private_key: 'encrypted_private_key', // Em produção, criptografar
                public_key: 'public_key_here'
            });
        }
    }
}

export const databaseService = new DatabaseService(); 