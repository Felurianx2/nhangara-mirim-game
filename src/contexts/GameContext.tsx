
import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { PlayerState, Mission, Biome, PlayerAvatar } from '@/types/types';
import { XP_PER_LEVEL, BIOMES } from '@/utils/constants';

interface GameContextType {
  playerState: PlayerState;
  completeMission: (mission: Mission) => void;
  claimDailyReward: () => { claimed: boolean; amount: number };
  hasDailyReward: boolean;
  setPlayerAvatar: (avatar: PlayerAvatar) => void;
}

const defaultPlayerState: PlayerState = {
  level: 1,
  xp: 0,
  seeds: 0,
  completedMissionIds: [],
  nfts: [],
  lastLogin: null,
  onboardingCompleted: false,
  avatar: null,
};

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [playerState, setPlayerState] = useState<PlayerState>(() => {
    try {
      const savedState = localStorage.getItem('nhangaraMirimGameState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        // Merge saved state with defaults to ensure all properties are present
        return { ...defaultPlayerState, ...parsed };
      }
      return defaultPlayerState;
    } catch (error) {
      console.error('Failed to load game state from localStorage', error);
      return defaultPlayerState;
    }
  });

  const [hasDailyReward, setHasDailyReward] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('nhangaraMirimGameState', JSON.stringify(playerState));
    } catch (error) {
      console.error('Failed to save game state to localStorage', error);
    }
  }, [playerState]);

  const checkDailyReward = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    if (playerState.lastLogin !== today) {
        setHasDailyReward(true);
    }
  }, [playerState.lastLogin]);

  useEffect(() => {
    checkDailyReward();
  }, [checkDailyReward]);

  const completeMission = useCallback((mission: Mission) => {
    // Prevent re-completing
    if (playerState.completedMissionIds.includes(mission.id)) {
      return;
    }

    setPlayerState(prevState => {
      // 1. Calculate new XP and Level
      let newXp = prevState.xp + mission.xpReward;
      let newLevel = prevState.level;
      while (newXp >= XP_PER_LEVEL) {
        newXp -= XP_PER_LEVEL;
        newLevel++;
      }

      // 2. Find the biome this mission belongs to, to check for NFT reward
      const missionBiome = BIOMES.find(b => 
        b.mainMission.id === mission.id || b.culturalMissions.some(cm => cm.id === mission.id)
      );

      let newNfts = [...prevState.nfts];
      // 3. If it's a main mission and the biome is found, add the NFT reward
      if (missionBiome && mission.type === 'main' && !newNfts.some(n => n.id === missionBiome.reward.id)) {
        newNfts.push(missionBiome.reward);
      }
      
      // 4. Return the new, complete state object
      return {
        ...prevState,
        xp: newXp,
        level: newLevel,
        completedMissionIds: [...prevState.completedMissionIds, mission.id],
        nfts: newNfts,
      };
    });
  }, [playerState.completedMissionIds]);
  
  const claimDailyReward = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    if (playerState.lastLogin !== today) {
      const rewardAmount = Math.floor(Math.random() * 10) + 5; // 5 to 14 seeds
      setPlayerState(prevState => ({
        ...prevState,
        seeds: prevState.seeds + rewardAmount,
        lastLogin: today,
      }));
      setHasDailyReward(false);
      return { claimed: true, amount: rewardAmount };
    }
    return { claimed: false, amount: 0 };
  }, [playerState.lastLogin]);

  const setPlayerAvatar = useCallback((avatar: PlayerAvatar) => {
    setPlayerState(prevState => ({
      ...prevState,
      avatar: avatar,
      onboardingCompleted: true,
    }));
  }, []);


  const value = {
    playerState,
    completeMission,
    claimDailyReward,
    hasDailyReward,
    setPlayerAvatar,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
