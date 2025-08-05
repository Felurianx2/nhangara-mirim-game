import React, { useState, useEffect } from 'react';
import { 
    Settings, 
    Coins, 
    Image, 
    Plus, 
    Trash2, 
    Eye,
    Wallet,
    FileText,
    Hash
} from 'lucide-react';
import { hederaService, HederaToken, HederaNFT } from '../services/hederaService';

const AdminScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'tokens' | 'nfts' | 'account'>('account');
    const [tokens, setTokens] = useState<HederaToken[]>([]);
    const [nfts, setNfts] = useState<HederaNFT[]>([]);
    const [loading, setLoading] = useState(false);

    // Estados para criação de tokens
    const [tokenForm, setTokenForm] = useState({
        name: '',
        symbol: '',
        decimals: 0,
        initialSupply: 0,
        description: ''
    });

    // Estados para criação de NFTs
    const [nftForm, setNftForm] = useState({
        name: '',
        symbol: '',
        metadata: ''
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [tokensData, nftsData] = await Promise.all([
                hederaService.getAccountTokens(),
                hederaService.getAccountNFTs()
            ]);
            setTokens(tokensData);
            setNfts(nftsData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateToken = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await hederaService.createToken(
                tokenForm.name,
                tokenForm.symbol,
                tokenForm.decimals,
                tokenForm.initialSupply,
                tokenForm.description
            );
            if (result.success) {
                alert(`Token criado com sucesso! ID: ${result.tokenId}`);
                setTokenForm({ name: '', symbol: '', decimals: 0, initialSupply: 0, description: '' });
                loadData();
            }
        } catch (error) {
            alert('Erro ao criar token: ' + error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNFT = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await hederaService.createNFT(
                nftForm.name,
                nftForm.symbol,
                nftForm.metadata
            );
            if (result.success) {
                alert(`NFT criado com sucesso! ID: ${result.tokenId}, Serial: ${result.serialNumber}`);
                setNftForm({ name: '', symbol: '', metadata: '' });
                loadData();
            }
        } catch (error) {
            alert('Erro ao criar NFT: ' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fadeIn">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Admin Panel</h1>
                <p className="text-lg text-gray-400 mt-2">Manage your Hedera tokens and NFTs</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-800/50 rounded-lg p-1 mb-8">
                <button
                    onClick={() => setActiveTab('account')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                        activeTab === 'account' 
                            ? 'bg-emerald-600 text-white' 
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <Wallet size={16} />
                    Account
                </button>
                <button
                    onClick={() => setActiveTab('tokens')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                        activeTab === 'tokens' 
                            ? 'bg-emerald-600 text-white' 
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <Coins size={16} />
                    Tokens
                </button>
                <button
                    onClick={() => setActiveTab('nfts')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                        activeTab === 'nfts' 
                            ? 'bg-emerald-600 text-white' 
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    <Image size={16} />
                    NFTs
                </button>
            </div>

            {/* Account Tab */}
            {activeTab === 'account' && (
                <div className="space-y-6">
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-4">Account Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-700/50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Hash className="h-5 w-5 text-emerald-400" />
                                    <span className="text-sm text-gray-400">Account ID</span>
                                </div>
                                <p className="text-white font-mono">{import.meta.env.VITE_HEDERA_ACCOUNT_ID || '0.0.123456'}</p>
                            </div>
                            <div className="bg-gray-700/50 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Coins className="h-5 w-5 text-yellow-400" />
                                    <span className="text-sm text-gray-400">Network</span>
                                </div>
                                <p className="text-white">{import.meta.env.VITE_HEDERA_NETWORK || 'testnet'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tokens Tab */}
            {activeTab === 'tokens' && (
                <div className="space-y-6">
                    {/* Create Token Form */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-4">Create New Token</h2>
                        <form onSubmit={handleCreateToken} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={tokenForm.name}
                                        onChange={(e) => setTokenForm({...tokenForm, name: e.target.value})}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Symbol</label>
                                    <input
                                        type="text"
                                        value={tokenForm.symbol}
                                        onChange={(e) => setTokenForm({...tokenForm, symbol: e.target.value})}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Decimals</label>
                                    <input
                                        type="number"
                                        value={tokenForm.decimals}
                                        onChange={(e) => setTokenForm({...tokenForm, decimals: parseInt(e.target.value)})}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                        min="0"
                                        max="18"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Initial Supply</label>
                                    <input
                                        type="number"
                                        value={tokenForm.initialSupply}
                                        onChange={(e) => setTokenForm({...tokenForm, initialSupply: parseInt(e.target.value)})}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                        min="0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                    <input
                                        type="text"
                                        value={tokenForm.description}
                                        onChange={(e) => setTokenForm({...tokenForm, description: e.target.value})}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                <Plus size={16} />
                                {loading ? 'Creating...' : 'Create Token'}
                            </button>
                        </form>
                    </div>

                    {/* Tokens List */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-4">Your Tokens</h2>
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mx-auto"></div>
                            </div>
                        ) : tokens.length > 0 ? (
                            <div className="space-y-4">
                                {tokens.map((token) => (
                                    <div key={token.tokenId} className="bg-gray-700/50 rounded-lg p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{token.name}</h3>
                                                <p className="text-gray-400">{token.symbol} • {token.balance} tokens</p>
                                                <p className="text-sm text-gray-500 font-mono">{token.tokenId}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 text-emerald-400 hover:text-emerald-300">
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                No tokens found
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* NFTs Tab */}
            {activeTab === 'nfts' && (
                <div className="space-y-6">
                    {/* Create NFT Form */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-4">Create New NFT</h2>
                        <form onSubmit={handleCreateNFT} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={nftForm.name}
                                        onChange={(e) => setNftForm({...nftForm, name: e.target.value})}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Symbol</label>
                                    <input
                                        type="text"
                                        value={nftForm.symbol}
                                        onChange={(e) => setNftForm({...nftForm, symbol: e.target.value})}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Metadata (JSON)</label>
                                <textarea
                                    value={nftForm.metadata}
                                    onChange={(e) => setNftForm({...nftForm, metadata: e.target.value})}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-24"
                                    placeholder='{"name": "NFT Name", "description": "NFT Description"}'
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                <Plus size={16} />
                                {loading ? 'Creating...' : 'Create NFT'}
                            </button>
                        </form>
                    </div>

                    {/* NFTs List */}
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-2xl font-bold text-white mb-4">Your NFTs</h2>
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400 mx-auto"></div>
                            </div>
                        ) : nfts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {nfts.map((nft) => (
                                    <div key={`${nft.tokenId}-${nft.serialNumber}`} className="bg-gray-700/50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-semibold text-white">{nft.name}</h3>
                                            <span className="text-sm text-emerald-400">#{nft.serialNumber}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-2">{nft.symbol}</p>
                                        <p className="text-xs text-gray-500 font-mono mb-3">{nft.tokenId}</p>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 text-emerald-400 hover:text-emerald-300">
                                                <Eye size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                No NFTs found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminScreen; 