import React from 'react';
import { Link } from 'react-router-dom';
import { HOME_BANNER_URL } from '@/utils/constants';
import { Map, Wallet, Palette, Leaf } from 'lucide-react';
import { i18nService } from '../services/i18nService';
import LanguageToggle from '../components/LanguageToggle';
import LogoutButton from '../components/LogoutButton';

const HomeScreen: React.FC = () => {
    return (
        <div className="animate-fadeIn space-y-8">
            {/* Language Toggle */}
            <div className="absolute top-4 right-4 z-10">
                <LanguageToggle />
            </div>

            {/* Logout Button */}
            <div className="absolute top-4 left-4 z-10">
                <LogoutButton />
            </div>

            {/* Hero Banner */}
            <div className="relative rounded-xl overflow-hidden bg-gray-800 shadow-lg border border-gray-700">
                <img src={HOME_BANNER_URL} alt="A scene from a Brazilian biome" className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">{i18nService.t('home.welcome')}</h1>
                    <p className="text-lg text-gray-200 mt-2 max-w-xl drop-shadow-md">
                        {i18nService.t('home.subtitle')}
                    </p>
                </div>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <NavCard
                    to="/biomes"
                    icon={<Map className="h-10 w-10 text-green-400" />}
                    title={i18nService.t('home.explore.biomes')}
                    description={i18nService.t('home.explore.description')}
                    borderColor="border-green-500/50"
                />
                <NavCard
                    to="/wallet"
                    icon={<Wallet className="h-10 w-10 text-blue-400" />}
                    title={i18nService.t('home.wallet.title')}
                    description={i18nService.t('home.wallet.description')}
                    borderColor="border-blue-500/50"
                />
                <NavCard
                    to="/artist-academy"
                    icon={<Palette className="h-10 w-10 text-yellow-400" />}
                    title={i18nService.t('home.artist.title')}
                    description={i18nService.t('home.artist.description')}
                    borderColor="border-yellow-500/50"
                />
            </div>
            
            {/* Collective Impact Banner */}
            <div className="bg-gray-800/50 rounded-xl p-6 flex items-center gap-6 border border-gray-700">
                <div className="text-emerald-400">
                    <Leaf size={40} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-emerald-300">{i18nService.t('home.collective.impact')}</h3>
                    <p className="text-gray-300">{i18nService.t('home.collective.description')}</p>
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
    borderColor: string;
}

const NavCard: React.FC<NavCardProps> = ({ to, icon, title, description, borderColor }) => {
    return (
        <Link 
            to={to} 
            className={`
                group bg-gray-800 rounded-xl p-6 flex flex-col items-start gap-4 
                border-2 border-transparent transition-all duration-300 
                hover:border-emerald-500 hover:bg-gray-700/80 hover:shadow-lg transform hover:-translate-y-1
            `}
        >
            <div className={`p-3 bg-gray-900 rounded-lg border ${borderColor}`}>
                {icon}
            </div>
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 flex-grow">{description}</p>
            <span className="font-semibold text-emerald-400 group-hover:underline">
                {i18nService.t('home.access')} →
            </span>
        </Link>
    );
};

export default HomeScreen;