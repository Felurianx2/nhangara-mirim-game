import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useGame } from '../hooks/useGame';
import { BIOMES, RECYCLING_DATA, PLANTING_DATA, PHOTO_HUNT_DATA, WATER_MANAGEMENT_DATA, MINI_GAMES } from '@/utils/constants';
import { Biome, Mission, QuizQuestion, MissionInteraction, BiomeId } from '@/types/types';
import { geminiService } from '../services/geminiService';
import { Check, X, ChevronLeft, Award, Trash2, Sprout, Eye, Droplets, HelpCircle, Loader } from 'lucide-react';

// --- Reusable Completion Logic ---
const useMissionCompletion = (mission: Mission | null, onComplete: () => void) => {
    const { completeMission } = useGame();
    return () => {
        if (mission) {
            completeMission(mission);
        }
        onComplete();
    };
};


// --- Mini-Game Components ---

const QuizGame: React.FC<{ mission: Mission, onComplete: () => void }> = ({ mission, onComplete }) => {
    const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [answerStatus, setAnswerStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    const { biomeId } = useParams<{ biomeId: string }>();
    const biome = BIOMES.find(b => b.id === biomeId)!;

    const handleMissionComplete = useMissionCompletion(mission, onComplete);

    useEffect(() => {
        setIsLoading(true);
        geminiService.generateQuiz(biome)
            .then(setQuizQuestion)
            .finally(() => setIsLoading(false));
    }, [biome]);
    
    const handleAnswer = (answer: string) => {
        if (answerStatus !== 'idle') return;

        setSelectedAnswer(answer);
        if (answer === quizQuestion?.correctAnswer) {
            setAnswerStatus('correct');
            setTimeout(() => {
                handleMissionComplete();
            }, 1500);
        } else {
            setAnswerStatus('incorrect');
        }
    };
    
    const handleTryAgain = () => {
        setSelectedAnswer(null);
        setAnswerStatus('idle');
    };
    
    if (isLoading || !quizQuestion) {
        return <div className="flex justify-center items-center h-64"><Loader className="animate-spin h-10 w-10 text-emerald-400"/></div>;
    }

    return (
        <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/30">
            <h3 className="text-xl font-semibold text-white mb-4">{quizQuestion.question}</h3>
            <div className="space-y-3">
                {quizQuestion.options.map(option => {
                    const isSelected = option === selectedAnswer;
                    let buttonClass = 'w-full text-left p-4 rounded-lg transition-all duration-200 border-2 border-gray-600 bg-gray-700 hover:bg-gray-600/80';
                    
                    if (answerStatus === 'correct' && isSelected) {
                        // User chose the right answer, highlight it green.
                        buttonClass = `${buttonClass} bg-green-500/30 border-green-500`;
                    } else if (answerStatus === 'incorrect' && isSelected) {
                        // User chose the wrong answer, highlight it red.
                        buttonClass = `${buttonClass} bg-red-500/30 border-red-500`;
                    }

                    return (
                        <button key={option} onClick={() => handleAnswer(option)} disabled={answerStatus !== 'idle'} className={buttonClass}>
                            <span className="font-medium">{option}</span>
                        </button>
                    );
                })}
            </div>
            {answerStatus === 'incorrect' && (
                 <div className="mt-6 p-4 bg-red-800/50 rounded-lg border border-red-600 text-center">
                    <h4 className="font-bold text-lg text-white mb-2">Incorrect Answer</h4>
                    <p className="text-gray-300 mb-4">{quizQuestion.explanation}</p>
                    <button onClick={handleTryAgain} className="bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-yellow-600 transition-colors">
                        Try Again
                    </button>
                </div>
            )}
             {answerStatus === 'correct' && (
                 <div className="mt-6 p-4 bg-green-800/50 rounded-lg border border-green-600">
                    <h4 className="font-bold text-lg text-white">Correct!</h4>
                    <p className="text-gray-300">{quizQuestion.explanation}</p>
                </div>
            )}
        </div>
    );
};

const RecyclingGame: React.FC<{ mission: Mission, onComplete: () => void }> = ({ mission, onComplete }) => {
    const [items, setItems] = useState(() => {
        return [...RECYCLING_DATA.items];
    });
    const [sortedCount, setSortedCount] = useState(0);
    const [shakingBin, setShakingBin] = useState<string | null>(null);
    const handleMissionComplete = useMissionCompletion(mission, onComplete);

    // Check for game completion
    useEffect(() => {
        if (sortedCount >= 4) {
            setTimeout(() => handleMissionComplete(), 1000);
        }
    }, [sortedCount, handleMissionComplete]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemType: string) => {
        e.dataTransfer.setData("itemType", itemType);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, binType: string) => {
        e.preventDefault();
        const itemType = e.dataTransfer.getData("itemType");
        
        if (itemType === binType) {
            // Remove the item from the list
            setItems(prev => prev.filter(item => item.type !== itemType));
            setSortedCount(prev => prev + 1);
        } else {
            if (shakingBin) return;
            setShakingBin(binType);
            setTimeout(() => setShakingBin(null), 820);
        }
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
    
    return (
        <div className="bg-gray-700/30 rounded-lg p-6 border border-gray-600/30">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {RECYCLING_DATA.bins.map(bin => (
                    <div 
                        key={bin.type} 
                        onDrop={(e) => handleDrop(e, bin.type)} 
                        onDragOver={handleDragOver}
                        className={`bg-gray-700/50 border-2 border-dashed border-gray-600 rounded-xl h-40 flex flex-col items-center justify-center transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500 ${shakingBin === bin.type ? 'animate-shake border-red-500' : ''}`}
                    >
                        <img src={bin.imageUrl} alt={`${bin.name} bin`} className="h-28 w-28 object-contain mb-2"/>
                        <span className="font-bold text-white capitalize text-lg">{bin.name}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center gap-6 flex-wrap min-h-[100px] bg-gray-700/20 rounded-lg p-4 border border-gray-600/20">
                {items.map(item => (
                     <div key={item.id} draggable onDragStart={(e) => handleDragStart(e, item.type)} className="p-3 bg-gray-700 rounded-lg cursor-grab hover:scale-110 transition-transform border border-gray-600/30">
                        <img src={item.imageUrl} alt={item.name} className="h-20 w-20 object-contain" />
                    </div>
                ))}
            </div>
             <div className="mt-4 text-center text-lg font-semibold text-emerald-400 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">Sorted: {sortedCount} / {RECYCLING_DATA.items.length}</div>
        </div>
    );
};

const PlantingGame: React.FC<{ mission: Mission, onComplete: () => void }> = ({ mission, onComplete }) => {
    const [plantedCount, setPlantedCount] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const handleMissionComplete = useMissionCompletion(mission, onComplete);
    const { target, seedImageUrl } = PLANTING_DATA;
    const progress = (plantedCount / target) * 100;

    useEffect(() => {
        if (plantedCount >= target) {
            setTimeout(() => handleMissionComplete(), 1000);
        }
    }, [plantedCount, target, handleMissionComplete]);

    const handlePlant = () => {
        if (plantedCount < target) {
            setIsClicked(true);
            setPlantedCount(c => c + 1);
            // Reset the clicked state after a short delay to show the click animation
            setTimeout(() => setIsClicked(false), 300);
        }
    };

    return (
        <div className="text-center bg-gray-700/30 rounded-lg p-6 border border-gray-600/30">
             <p className="text-lg text-gray-300 mb-4">Click the seed to plant it in the nursery.</p>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
                <div className="bg-gradient-to-r from-teal-400 to-emerald-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
            <button 
                onClick={handlePlant} 
                disabled={plantedCount >= target}
                className="mx-auto my-4 p-4 bg-yellow-900/50 rounded-full cursor-pointer hover:scale-110 disabled:scale-100 disabled:opacity-50 transition-transform"
            >
                <img 
                    src={isClicked ? MINI_GAMES.PLANTING.seedClick : MINI_GAMES.PLANTING.seed} 
                    alt="Seed" 
                    className="h-24 w-24"
                />
            </button>
            <div className="text-2xl font-bold text-white p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">{plantedCount} / {target} seeds planted</div>
        </div>
    );
};

const PhotoHuntGame: React.FC<{ mission: Mission, onComplete: () => void }> = ({ mission, onComplete }) => {
    const [found, setFound] = useState<boolean[]>(Array(PHOTO_HUNT_DATA.differences.length).fill(false));
    const [errorClicks, setErrorClicks] = useState<{x: number, y: number, id: number}[]>([]);
    const handleMissionComplete = useMissionCompletion(mission, onComplete);
    const numDifferences = PHOTO_HUNT_DATA.differences.length;

    useEffect(() => {
        if (found.every(Boolean)) {
             setTimeout(() => handleMissionComplete(), 1000);
        }
    }, [found, handleMissionComplete]);

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (found.every(Boolean)) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width * 100;
        const y = (e.clientY - rect.top) / rect.height * 100;
        
        let foundMatch = false;
        PHOTO_HUNT_DATA.differences.forEach((diff, i) => {
            if (found[i]) return;
            const distance = Math.sqrt(Math.pow(x - diff.x, 2) + Math.pow(y - diff.y, 2));
            if (distance < diff.r) {
                setFound(f => {
                    const newFound = [...f];
                    newFound[i] = true;
                    return newFound;
                });
                foundMatch = true;
            }
        });

        if (!foundMatch) {
            const errorId = Date.now();
            setErrorClicks(prev => [...prev, {x, y, id: errorId}]);
            setTimeout(() => {
                setErrorClicks(prev => prev.filter(c => c.id !== errorId));
            }, 500);
        }
    };
    
    return (
        <div className="text-center bg-gray-700/30 rounded-lg p-6 border border-gray-600/30">
             <p className="text-lg text-gray-300 mb-4">Click on the {numDifferences} differences in the right image.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700/30 rounded-lg p-2 border border-gray-600/30">
                <img src={PHOTO_HUNT_DATA.imageA} alt="Original" className="rounded-lg w-full" />
                </div>
                <div className="relative cursor-pointer bg-gray-700/30 rounded-lg p-2 border border-gray-600/30" onClick={handleClick}>
                    <img src={PHOTO_HUNT_DATA.imageB} alt="Modified" className="rounded-lg w-full" />
                    {PHOTO_HUNT_DATA.differences.map((diff, i) => found[i] && (
                        <div key={i} className="absolute border-4 border-yellow-400 rounded-full" style={{
                            top: `${diff.y}%`,
                            left: `${diff.x}%`,
                            width: `${diff.r * 2}%`,
                            height: `${diff.r * 2}%`,
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none'
                        }}></div>
                    ))}
                    {errorClicks.map(click => (
                        <div key={click.id} className="absolute text-red-500 text-4xl font-black animate-fadeOut" style={{
                            top: `${click.y}%`,
                            left: `${click.x}%`,
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none'
                        }}>
                           <X strokeWidth={4} />
                        </div>
                    ))}
                </div>
            </div>
             <div className="mt-4 text-xl font-semibold text-emerald-400 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">Found: {found.filter(Boolean).length} / {numDifferences}</div>
        </div>
    );
};

const WaterManagementGame: React.FC<{ mission: Mission, onComplete: () => void }> = ({ mission, onComplete }) => {
    const { totalWater, sectors } = WATER_MANAGEMENT_DATA;
    const [allocations, setAllocations] = useState(Array(sectors.length).fill(0));
    const [error, setError] = useState<string | null>(null);
    const [draggedSector, setDraggedSector] = useState<number | null>(null);
    const handleMissionComplete = useMissionCompletion(mission, onComplete);

    const totalAllocated = allocations.reduce((sum, val) => sum + val, 0);
    const remaining = totalWater - totalAllocated;

    const sectorIcons = {
        'Farming': '🌾',
        'Livestock': '🐄',
        'Community': '🏘️'
    };

    const handleAllocationChange = (index: number, value: number) => {
        setError(null);
        setAllocations(current => {
            const newAllocations = [...current];
            newAllocations[index] = value;
            return newAllocations;
        });
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, sectorIndex: number) => {
        setDraggedSector(sectorIndex);
        e.dataTransfer.setData("sectorIndex", sectorIndex.toString());
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, sectorIndex: number) => {
        e.preventDefault();
        const draggedIndex = parseInt(e.dataTransfer.getData("sectorIndex"));
        
        if (draggedIndex !== sectorIndex) {
            // Transfer water from dragged sector to target sector
            const newAllocations = [...allocations];
            const transferAmount = Math.min(newAllocations[draggedIndex], 10); // Transfer up to 10 units
            
            newAllocations[draggedIndex] = Math.max(0, newAllocations[draggedIndex] - transferAmount);
            newAllocations[sectorIndex] = Math.min(totalWater, newAllocations[sectorIndex] + transferAmount);
            
            setAllocations(newAllocations);
            setError(null);
        }
        setDraggedSector(null);
    };

    const handleSubmit = () => {
        if (remaining > 0) {
            setError(`You still need to allocate ${remaining} units of water.`);
        } else if (remaining < 0) {
            setError(`You have over-allocated by ${-remaining} units. The total must be exactly ${totalWater}.`);
        } else {
            handleMissionComplete();
        }
    };

    return (
        <div className="text-center bg-gray-700/30 rounded-lg p-6 border border-gray-600/30">
            <p className="text-lg text-gray-300 mb-4">Distribute {totalWater} units of water among the sectors.</p>
            <div className="space-y-6 my-8">
                {sectors.map((sector, i) => (
                    <div key={sector} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 flex items-center justify-center text-3xl">
                                {sectorIcons[sector as keyof typeof sectorIcons]}
                            </div>
                            <label className="text-xl font-semibold text-white">{sector}: {allocations[i]}</label>
                        </div>
                        
                        {/* Water Bar */}
                        <div className="relative mb-4">
                            <div className="w-full h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg overflow-hidden shadow-inner">
                                <div className="w-full h-full bg-gradient-to-r from-blue-300/30 to-blue-500/30"></div>
                            </div>
                            
                            {/* Water Droplet */}
                            <div 
                                draggable
                                onDragStart={(e) => handleDragStart(e, i)}
                                className={`absolute top-0 left-0 w-8 h-8 cursor-grab transition-all duration-300 ${
                                    draggedSector === i ? 'scale-110' : 'hover:scale-105'
                                }`}
                                style={{ 
                                    left: `${(allocations[i] / totalWater) * 100}%`,
                                    transform: `translateX(-50%)`
                                }}
                            >
                                <img 
                                    src="/images/mini-games/water-management/water-icon.png" 
                                    alt="Water drop" 
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        
                        {/* Slider for precise control */}
                        <input
                            type="range"
                            min="0"
                            max={totalWater}
                            value={allocations[i]}
                            onChange={e => handleAllocationChange(i, parseInt(e.target.value))}
                            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-emerald-500"
                        />
                    </div>
                ))}
            </div>
            <div className={`text-2xl font-bold my-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/30 ${remaining < 0 ? 'text-red-500' : 'text-white'}`}>
                Water Remaining: {remaining}
            </div>
            <button 
                onClick={handleSubmit}
                disabled={remaining !== 0}
                className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-emerald-700 transition-transform transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                Confirm Allocation
            </button>
            {error && (
                <div className="mt-4 p-3 bg-red-800/50 rounded-lg border border-red-600">
                    <p className="text-red-300 font-semibold">{error}</p>
                </div>
            )}
        </div>
    );
};


// --- Main Screen Component ---

const MissionScreen: React.FC = () => {
    const { biomeId, missionId } = useParams<{ biomeId: string; missionId: string }>();
    const navigate = useNavigate();
    const { playerState } = useGame();

    const [mission, setMission] = useState<Mission | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [currentBiome, setCurrentBiome] = useState<Biome | null>(null);

    useEffect(() => {
        const foundBiome = BIOMES.find(b => b.id === biomeId);
        if (foundBiome) {
            setCurrentBiome(foundBiome);
            const currentMission = [foundBiome.mainMission, ...foundBiome.culturalMissions].find(m => m.id === missionId);
            if (currentMission) {
                // Now allows re-playing missions. Rewards are only given once via GameContext.
                setMission(currentMission);
            } else {
                navigate(`/biome/${biomeId}`);
            }
        } else {
            navigate('/biomes');
        }
    }, [biomeId, missionId, navigate]);

    const renderMissionContent = () => {
        if (!mission) {
            return <div className="flex justify-center items-center h-64"><Loader className="animate-spin h-10 w-10 text-emerald-400"/></div>;
        }

        switch (mission.interactionType) {
            case 'quiz': return <QuizGame mission={mission} onComplete={() => setIsCompleted(true)} />;
            case 'recycling': return <RecyclingGame mission={mission} onComplete={() => setIsCompleted(true)} />;
            case 'planting': return <PlantingGame mission={mission} onComplete={() => setIsCompleted(true)} />;
            case 'photo_hunt': return <PhotoHuntGame mission={mission} onComplete={() => setIsCompleted(true)} />;
            case 'water_management': return <WaterManagementGame mission={mission} onComplete={() => setIsCompleted(true)} />;
            default: return <div>Unknown mission type</div>;
        }
    };

    if (isCompleted) {
        return (
            <div className="min-h-screen relative flex items-center justify-center">
                {/* Background específico para cada bioma */}
                {currentBiome && currentBiome.id === 'mata-atlantica' ? (
                    <div 
                        className="fixed inset-0 opacity-15 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/biomas/mata-atlantica/mata-map.png')`,
                            zIndex: -1
                        }}
                    />
                ) : currentBiome && currentBiome.id === 'pantanal' ? (
                    <div 
                        className="fixed inset-0 opacity-15 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/biomas/pantanal/pantanal-map.png')`,
                            zIndex: -1
                        }}
                    />
                ) : currentBiome && currentBiome.id === 'cerrado' ? (
                    <div 
                        className="fixed inset-0 opacity-15 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/biomas/cerrado/cerrado-map.png')`,
                            zIndex: -1
                        }}
                    />
                ) : currentBiome && currentBiome.id === 'caatinga' ? (
                    <div 
                        className="fixed inset-0 opacity-15 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/biomas/caatinga/caatinga-map.png')`,
                            zIndex: -1
                        }}
                    />
                ) : currentBiome ? (
                    <div 
                        className="fixed inset-0 opacity-20 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${currentBiome.images?.detail || currentBiome.images?.flora})`,
                            zIndex: -1
                        }}
                    />
                ) : null}
                
                {/* Overlay para melhorar legibilidade */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80" style={{ zIndex: -1 }} />
                
                <div className="text-center animate-fadeIn p-8 bg-gray-800/90 backdrop-blur-sm rounded-xl max-w-lg mx-auto relative z-10 border border-gray-700">
                    <img 
                        src="/images/bioamulets/bioamulet.png" 
                        alt="Mission Complete" 
                        className="mx-auto w-16 h-16 mb-4"
                        onError={(e) => {
                            e.currentTarget.src = '/images/talisma_da_sabedoria.jpg'; // Fallback
                        }}
                    />
                <h2 className="text-3xl font-bold text-white">Mission Complete!</h2>
                <p className="text-gray-300 mt-2">You earned +{mission?.xpReward} XP!</p>
                <Link 
                    to={`/biome/${biomeId}`}
                    className="mt-6 inline-block bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    Back to the Biome
                </Link>
                </div>
            </div>
        );
    }
    
    if (!mission) {
        return (
            <div className="min-h-screen relative flex items-center justify-center">
                {/* Background específico para cada bioma */}
                {currentBiome && currentBiome.id === 'mata-atlantica' ? (
                    <div 
                        className="fixed inset-0 opacity-15 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/biomas/mata-atlantica/mata-map.png')`,
                            zIndex: -1
                        }}
                    />
                ) : currentBiome && currentBiome.id === 'pantanal' ? (
                    <div 
                        className="fixed inset-0 opacity-15 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/biomas/pantanal/pantanal-map.png')`,
                            zIndex: -1
                        }}
                    />
                ) : currentBiome && currentBiome.id === 'cerrado' ? (
                    <div 
                        className="fixed inset-0 opacity-15 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/biomas/cerrado/cerrado-map.png')`,
                            zIndex: -1
                        }}
                    />
                ) : currentBiome && currentBiome.id === 'caatinga' ? (
                    <div 
                        className="fixed inset-0 opacity-15 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('/images/biomas/caatinga/caatinga-map.png')`,
                            zIndex: -1
                        }}
                    />
                ) : currentBiome ? (
                    <div 
                        className="fixed inset-0 opacity-20 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${currentBiome.images?.detail || currentBiome.images?.flora})`,
                            zIndex: -1
                        }}
                    />
                ) : null}
                
                {/* Overlay para melhorar legibilidade */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80" style={{ zIndex: -1 }} />
                
                <div className="text-center p-8 relative z-10">
                    <Loader className="animate-spin h-10 w-10 text-emerald-400 mx-auto"/>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative">
            {/* Background específico para cada bioma */}
            {currentBiome && currentBiome.id === BiomeId.MataAtlantica ? (
                <div 
                    className="fixed inset-0 opacity-15 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/images/biomas/mata-atlantica/mata-map.png')`,
                        zIndex: -1
                    }}
                />
            ) : currentBiome && currentBiome.id === BiomeId.Pantanal ? (
                <div 
                    className="fixed inset-0 opacity-15 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/images/biomas/pantanal/pantanal-map.png')`,
                        zIndex: -1
                    }}
                />
            ) : currentBiome && currentBiome.id === BiomeId.Cerrado ? (
                <div 
                    className="fixed inset-0 opacity-15 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/images/biomas/cerrado/cerrado-map.png')`,
                        zIndex: -1
                    }}
                />
            ) : currentBiome && currentBiome.id === BiomeId.Caatinga ? (
                <div 
                    className="fixed inset-0 opacity-15 bg-cover bg-center"
                    style={{
                        backgroundImage: `url('/images/biomas/caatinga/caatinga-map.png')`,
                        zIndex: -1
                    }}
                />
            ) : currentBiome ? (
                <div 
                    className="fixed inset-0 opacity-20 bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${currentBiome.images?.detail || currentBiome.images?.flora})`,
                        zIndex: -1
                    }}
                />
            ) : null}
            
            {/* Overlay para melhorar legibilidade */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80" style={{ zIndex: -1 }} />
            
            <div className="max-w-4xl mx-auto animate-fadeIn relative z-10">
            <Link to={`/biome/${biomeId}`} className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-6 transition-colors">
                <ChevronLeft size={20} />
                <span>Back to the biome</span>
            </Link>
                <div className="bg-gray-800/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg border border-gray-700">
                <h1 className="text-3xl font-bold text-white mb-2">{mission.title}</h1>
                <p className="text-gray-400 mb-6">{mission.description}</p>
                <div className="border-t border-gray-700 my-6"></div>
                {renderMissionContent()}
                </div>
            </div>
        </div>
    );
};

export default MissionScreen;