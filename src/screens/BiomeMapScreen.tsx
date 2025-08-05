import React from 'react';
import { Link } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { BIOMES } from '@/utils/constants';
import { Lock, CheckCircle, Radio } from 'lucide-react';

const BiomeMapScreen: React.FC = () => {
    const { playerState } = useGame();

    return (
        <div className="animate-fadeIn">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Explore the Brazilian Biomes</h1>
                <p className="text-lg text-gray-400 mt-2">Each biome is a world of unique challenges, learning, and rewards.</p>
            </div>
            <div className="space-y-4">
                {BIOMES.map((biome) => {
                    const isUnlocked = playerState.level >= biome.unlockLevel;
                    const isCompleted = playerState.nfts.some(nft => nft.biomeId === biome.id);
                    
                    let statusIcon;
                    let statusText;
                    let statusColor;

                    if (isCompleted) {
                        statusIcon = <CheckCircle className="text-green-400" />;
                        statusText = "Completed";
                        statusColor = 'text-green-400';
                    } else if (isUnlocked) {
                        statusIcon = <Radio className="text-yellow-400 animate-pulse" />;
                        statusText = "Available";
                        statusColor = 'text-yellow-400';
                    } else {
                        statusIcon = <Lock className="text-gray-500" />;
                        statusText = `Unlocks at Level ${biome.unlockLevel}`;
                        statusColor = 'text-gray-500';
                    }

                    return (
                        <Link 
                            key={biome.id} 
                            to={isUnlocked ? `/biome/${biome.id}` : '#'}
                            className={`
                                flex items-center p-6 rounded-xl transition-all duration-300
                                ${isUnlocked 
                                    ? 'bg-gray-800 hover:bg-gray-700/80 hover:shadow-lg hover:border-emerald-500/50 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent'
                                    : 'bg-gray-800/50 filter grayscale cursor-not-allowed border-2 border-transparent'
                                }
                            `}
                        >
                            <div className={`text-5xl mr-6`}>{biome.icon}</div>
                            <div className="flex-grow">
                                <h2 className="text-2xl font-bold text-white">{biome.name}</h2>
                                <p className={`text-sm ${isUnlocked ? 'text-gray-300' : 'text-gray-500'}`}>{biome.description}</p>
                            </div>
                            <div className="flex items-center gap-2 ml-6 text-sm font-semibold">
                                <span className={statusColor}>{statusText}</span>
                                {statusIcon}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BiomeMapScreen;