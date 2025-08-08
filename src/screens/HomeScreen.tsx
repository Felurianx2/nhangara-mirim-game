import React from 'react';
import { Link } from 'react-router-dom';
import { CHARACTERS } from '@/utils/constants';
import { Map, Wallet, Palette, Leaf, Star, Trophy, Users } from 'lucide-react';
import { i18nService } from '../services/i18nService';
import LanguageToggle from '../components/LanguageToggle';
import LogoutButton from '../components/LogoutButton';

const HomeScreen: React.FC = () => {
    return (
        <div className="animate-fadeIn min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900">
            {/* Language Toggle */}
            <div className="absolute top-4 right-4 z-20">
                <LanguageToggle />
            </div>

            {/* Logout Button */}
            <div className="absolute top-4 left-4 z-20">
                <LogoutButton />
            </div>

            <div className="relative z-10 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-emerald-800/80 to-teal-800/80 backdrop-blur-sm shadow-2xl border border-emerald-500/30 mb-12">
                    {/* Background Image */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-60"
                        style={{backgroundImage: `url('/images/backgrounds/pantanal-without-animals.png')`}}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/60 via-transparent to-teal-900/60"></div>
                    
                    <div className="relative p-8 md:p-12 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="bg-emerald-500/20 backdrop-blur-sm rounded-full p-4 border border-emerald-400/30">
                                <Leaf className="h-12 w-12 text-emerald-300" />
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                            {i18nService.t('home.welcome')}
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto drop-shadow-md">
                            {i18nService.t('home.subtitle')}
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-4 text-emerald-200">
                            <div className="flex items-center gap-2 bg-emerald-800/40 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-400/30">
                                <Star className="h-5 w-5 text-yellow-400" />
                                <span className="font-semibold">Explore Biomes</span>
                            </div>
                            <div className="flex items-center gap-2 bg-emerald-800/40 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-400/30">
                                <Trophy className="h-5 w-5 text-yellow-400" />
                                <span className="font-semibold">Earn NFTs</span>
                            </div>
                            <div className="flex items-center gap-2 bg-emerald-800/40 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-400/30">
                                <Users className="h-5 w-5 text-yellow-400" />
                                <span className="font-semibold">Join Community</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <NavCard
                        to="/biomes"
                        icon={<Map className="h-12 w-12 text-emerald-400" />}
                        title={i18nService.t('home.explore.biomes')}
                        description={i18nService.t('home.explore.description')}
                        gradient="from-emerald-500/20 to-green-500/20"
                        borderColor="border-emerald-500/50"
                    />
                    <NavCard
                        to="/wallet"
                        icon={<Wallet className="h-12 w-12 text-blue-400" />}
                        title={i18nService.t('home.wallet.title')}
                        description={i18nService.t('home.wallet.description')}
                        gradient="from-blue-500/20 to-cyan-500/20"
                        borderColor="border-blue-500/50"
                    />
                    <NavCard
                        to="/artist-academy"
                        icon={<Palette className="h-12 w-12 text-purple-400" />}
                        title={i18nService.t('home.artist.title')}
                        description={i18nService.t('home.artist.description')}
                        gradient="from-purple-500/20 to-pink-500/20"
                        borderColor="border-purple-500/50"
                    />
                </div>
                
                {/* Characters Section */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
                        Meet Your Guides
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CHARACTERS.map((character) => (
                            <CharacterCard key={character.id} character={character} />
                        ))}
                    </div>
                </div>
                
                {/* Collective Impact Banner */}
                <div className="bg-gradient-to-r from-emerald-800/60 to-teal-800/60 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/30 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="bg-emerald-500/20 backdrop-blur-sm rounded-full p-6 border border-emerald-400/30">
                            <Leaf size={48} className="text-emerald-300" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-emerald-200 mb-4">
                                {i18nService.t('home.collective.impact')}
                            </h3>
                            <p className="text-lg text-emerald-100 leading-relaxed">
                                {i18nService.t('home.collective.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface NavCardProps {
    to: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    borderColor: string;
}

const NavCard: React.FC<NavCardProps> = ({ to, icon, title, description, gradient, borderColor }) => {
    return (
        <Link 
            to={to} 
            className={`
                group relative overflow-hidden rounded-2xl p-8 
                bg-gradient-to-br ${gradient} backdrop-blur-sm
                border-2 border-transparent transition-all duration-500 
                hover:border-emerald-500 hover:shadow-2xl transform hover:-translate-y-2
                cursor-pointer h-full flex flex-col
            `}
        >
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                <div className={`p-4 bg-white/10 backdrop-blur-sm rounded-xl border ${borderColor} mb-6 w-fit`}>
                    {icon}
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{title}</h2>
                <p className="text-gray-200 flex-grow leading-relaxed">{description}</p>
                
                <div className="mt-6 flex items-center justify-between">
                    <span className="font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors">
                        {i18nService.t('home.access')} →
                    </span>
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors">
                        <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

interface CharacterCardProps {
    character: any;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    return (
        <div className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl">
            <div className="text-center">
                <div className="relative mb-4">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-emerald-500/30 group-hover:border-emerald-400 transition-colors bg-gray-700/50">
                        <img 
                            src={character.imageUrl} 
                            alt={character.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                e.currentTarget.src = '/images/saci.jpg'; // Fallback
                            }}
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{character.name}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    {character.description.startsWith('character.') 
                        ? i18nService.t(character.description)
                        : (character.description || 'Guardian of the Brazilian biomes')
                    }
                </p>
                
                {character.personality && (
                    <div className="mt-3">
                        <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-500/30">
                            {character.personality}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;