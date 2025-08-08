import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { BIOMES, BACKGROUNDS } from '@/utils/constants';
import { Lock, CheckCircle, Radio, MapPin, Star, Award } from 'lucide-react';
import { i18nService } from '../services/i18nService';

const BiomeMapScreen: React.FC = () => {
    const { playerState } = useGame();

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 relative">
            {/* Background Image */}
            <div 
                className="fixed inset-0 opacity-15"
                style={{
                    backgroundImage: `url('/images/backgrounds/mata-atlantica.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            ></div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-green-800/60 to-teal-900/80"></div>

            <div className="relative z-10 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="bg-emerald-500/20 backdrop-blur-sm rounded-full p-4 border border-emerald-400/30">
                            <MapPin className="h-12 w-12 text-emerald-300" />
                        </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                        Explore the Brazilian Biomes
                    </h1>
                    <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                        Each biome is a world of unique challenges, learning, and rewards. 
                        Discover the rich biodiversity of Brazil's natural wonders.
                    </p>
                    
                    {/* Progress Indicator */}
                    <div className="mt-8 flex justify-center">
                        <div className="bg-emerald-800/60 backdrop-blur-md rounded-full px-6 py-3 border border-emerald-400/30">
                            <div className="flex items-center gap-4 text-emerald-200">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5 text-green-400" />
                                    <span className="font-semibold">
                                        {playerState.nfts.length} / {BIOMES.length} Completed
                                    </span>
                                </div>
                                <div className="w-px h-6 bg-emerald-400/30"></div>
                                <div className="flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-400" />
                                    <span className="font-semibold">Level {playerState.level}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Biomes Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {BIOMES.map((biome) => {
                        const isUnlocked = playerState.level >= biome.unlockLevel;
                        const isCompleted = playerState.nfts.some(nft => nft.biomeId === biome.id);
                        
                        let statusIcon;
                        let statusText;
                        let statusColor;
                        let statusBg;

                        if (isCompleted) {
                            statusIcon = <CheckCircle className="text-green-400" />;
                            statusText = "Completed";
                            statusColor = 'text-green-400';
                            statusBg = 'bg-green-500/20';
                        } else if (isUnlocked) {
                            statusIcon = <Radio className="text-yellow-400 animate-pulse" />;
                            statusText = "Available";
                            statusColor = 'text-yellow-400';
                            statusBg = 'bg-yellow-500/20';
                        } else {
                            statusIcon = <Lock className="text-gray-500" />;
                            statusText = `Unlocks at Level ${biome.unlockLevel}`;
                            statusColor = 'text-gray-500';
                            statusBg = 'bg-gray-500/20';
                        }

                        return (
                            <BiomeCard
                                key={biome.id}
                                biome={biome}
                                isUnlocked={isUnlocked}
                                isCompleted={isCompleted}
                                statusIcon={statusIcon}
                                statusText={statusText}
                                statusColor={statusColor}
                                statusBg={statusBg}
                            />
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="mt-12 bg-emerald-800/60 backdrop-blur-md rounded-2xl p-6 border border-emerald-400/30">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">Legend</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                                <CheckCircle className="h-5 w-5 text-green-400" />
                            </div>
                            <span className="text-emerald-200">Completed Biome</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-400/30">
                                <Radio className="h-5 w-5 text-yellow-400" />
                            </div>
                            <span className="text-emerald-200">Available to Play</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-500/20 rounded-full flex items-center justify-center border border-gray-400/30">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <span className="text-emerald-200">Locked (Level Required)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface BiomeCardProps {
    biome: any;
    isUnlocked: boolean;
    isCompleted: boolean;
    statusIcon: React.ReactNode;
    statusText: string;
    statusColor: string;
    statusBg: string;
}

const BiomeCard: React.FC<BiomeCardProps> = ({ 
    biome, 
    isUnlocked, 
    isCompleted, 
    statusIcon, 
    statusText, 
    statusColor, 
    statusBg 
}) => {
    return (
        <Link 
            to={isUnlocked ? `/biome/${biome.id}` : '#'}
            className={`
                group relative overflow-hidden rounded-2xl transition-all duration-500
                ${isUnlocked 
                    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-emerald-800/70 hover:to-teal-800/70 hover:shadow-2xl hover:border-emerald-500/50 transform hover:-translate-y-2 cursor-pointer border-2 border-transparent'
                    : 'bg-gradient-to-br from-gray-800/70 to-gray-900/70 filter grayscale cursor-not-allowed border-2 border-transparent'
                }
                backdrop-blur-md border-2 border-transparent
            `}
        >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-25">
                <img 
                    src={biome.images?.hero || '/images/biomas.jpg'} 
                    alt={biome.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = '/images/biomas.jpg'; // Fallback
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 p-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`text-6xl ${isUnlocked ? 'filter-none' : 'filter grayscale'}`}>
                            {biome.icon}
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">{biome.name}</h2>
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${statusBg} border border-current ${statusColor}`}>
                                {statusIcon}
                                <span className="text-sm font-semibold">{statusText}</span>
                            </div>
                        </div>
                    </div>
                    
                    {isCompleted && (
                        <div className="bg-yellow-500/20 backdrop-blur-sm rounded-full p-3 border border-yellow-400/30">
                            <Award className="h-6 w-6 text-yellow-400" />
                        </div>
                    )}
                </div>

                <p className={`text-lg leading-relaxed mb-6 ${isUnlocked ? 'text-gray-200' : 'text-gray-500'}`}>
                    {biome.description}
                </p>

                <div className="space-y-4">
                    {/* Mentor Info */}
                    <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-emerald-500/30 bg-gray-700/50">
                            <img 
                                src={biome.mentor?.imageUrl || '/images/saci.jpg'} 
                                alt={biome.mentor?.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/saci.jpg'; // Fallback
                                }}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold text-emerald-300">{biome.mentor?.name}</h4>
                            <p className="text-sm text-gray-400">
                                {biome.mentor?.description?.startsWith('character.') 
                                    ? i18nService.t(biome.mentor.description)
                                    : biome.mentor?.description
                                }
                            </p>
                        </div>
                    </div>

                    {/* Mission Preview */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <h4 className="font-semibold text-white mb-2">Main Mission</h4>
                        <p className="text-sm text-gray-300">{biome.mainMission?.title}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span className="text-xs text-emerald-300 font-medium">
                                {biome.mainMission?.xpReward} XP Reward
                            </span>
                        </div>
                    </div>

                    {/* Reward Preview */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-yellow-500/30">
                            <img 
                                src={biome.reward?.imageUrl || '/images/talisma_da_sabedoria.jpg'} 
                                alt={biome.reward?.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = '/images/talisma_da_sabedoria.jpg'; // Fallback
                                }}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold text-yellow-300">{biome.reward?.name}</h4>
                            <p className="text-sm text-gray-400">{biome.reward?.description}</p>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                {isUnlocked && (
                    <div className="mt-6 flex items-center justify-between">
                        <span className="font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors">
                            {isCompleted ? 'Replay Mission' : 'Start Mission'} →
                        </span>
                        <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center group-hover:bg-emerald-500/40 transition-colors">
                            <div className="w-2 h-2 bg-emerald-300 rounded-full"></div>
                        </div>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default BiomeMapScreen;