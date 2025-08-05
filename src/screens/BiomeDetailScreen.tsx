import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { BIOMES, CHARACTERS } from '@/utils/constants';
import { Biome, Mission } from '@/types/types';
import { geminiService } from '../services/geminiService';
import { ChevronLeft, Lock, Star, RefreshCcw } from 'lucide-react';

const BiomeDetailScreen: React.FC = () => {
    const { biomeId } = useParams<{ biomeId: string }>();
    const navigate = useNavigate();
    const { playerState } = useGame();
    const [biome, setBiome] = useState<Biome | undefined>(undefined);
    const [mentorDialogue, setMentorDialogue] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const currentBiome = BIOMES.find(b => b.id === biomeId);
        if (!currentBiome) {
            navigate('/biomes');
            return;
        }
        
        if (playerState.level < currentBiome.unlockLevel) {
            navigate('/biomes');
            return;
        }

        setBiome(currentBiome);
        setIsLoading(true);
        geminiService.generateMentorDialogue(currentBiome.mentor.name, currentBiome.name)
            .then(dialogue => {
                setMentorDialogue(dialogue);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Failed to generate dialogue:", err);
                setMentorDialogue("Welcome! This place needs your protection.");
                setIsLoading(false);
            });
    }, [biomeId, navigate, playerState.level]);

    if (!biome) {
        return <div className="text-center p-8">Loading Biome...</div>;
    }

    const mentorCharacter = CHARACTERS.find(c => c.id === biome.mentor.characterId);
    const isMainMissionCompleted = playerState.completedMissionIds.includes(biome.mainMission.id);

    return (
        <div className="animate-fadeIn">
            <Link to="/biomes" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors">
                <ChevronLeft size={20} />
                <span>Back to map</span>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Mentor Column */}
                <div className="md:col-span-1 bg-gray-800/50 rounded-xl p-6 flex flex-col items-center text-center border-2 border-gray-700">
                    {mentorCharacter && (
                        <img 
                            src={mentorCharacter.imageUrl} 
                            alt={mentorCharacter.name} 
                            className="w-48 h-48 object-contain mb-4 transition-transform duration-500 hover:scale-110"
                        />
                    )}
                    <h2 className="text-3xl font-bold text-white">{biome.mentor.name}</h2>
                    <p className="text-gray-400 mb-4">{biome.mentor.description}</p>
                    <div className="bg-gray-700/50 p-4 rounded-lg italic text-gray-300">
                        {isLoading ? <div className="h-16 w-full bg-gray-600 rounded animate-pulse"></div> : `"${mentorDialogue}"`}
                    </div>
                </div>

                {/* Missions Column */}
                <div className="md:col-span-2">
                    <h1 className="text-4xl font-bold text-white mb-2">{biome.name}</h1>
                    <p className="text-lg text-gray-400 mb-8">{biome.description}</p>
                    
                    <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2"><Star />Main Mission</h3>
                    <MissionCard mission={biome.mainMission} biomeId={biome.id} isCompleted={isMainMissionCompleted} />
                    
                    <h3 className="text-2xl font-bold text-amber-400 mt-8 mb-4">Cultural Missions</h3>
                    <div className="space-y-4">
                        {biome.culturalMissions.map(mission => (
                            <MissionCard key={mission.id} mission={mission} biomeId={biome.id} isCompleted={playerState.completedMissionIds.includes(mission.id)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface MissionCardProps {
    mission: Mission;
    biomeId: string;
    isCompleted: boolean;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission, biomeId, isCompleted }) => {
    return (
        <Link
            to={`/biome/${biomeId}/mission/${mission.id}`}
            className={`
                block p-6 rounded-lg transition-all duration-300 
                hover:ring-2 ring-emerald-500 transform hover:-translate-y-1
                ${isCompleted
                    ? 'bg-gray-700/50'
                    : 'bg-gray-800'
                }
            `}
        >
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="text-xl font-bold text-white">{mission.title}</h4>
                    <p className="text-gray-400">{mission.description}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                    {isCompleted ? (
                        <div className="flex items-center gap-2 text-cyan-400">
                           <RefreshCcw size={18} />
                           <span>Replay</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-yellow-400">
                            <span>+{mission.xpReward} XP</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default BiomeDetailScreen;