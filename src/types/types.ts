
export enum BiomeId {
  MataAtlantica = 'mata-atlantica',
  Cerrado = 'cerrado',
  Pantanal = 'pantanal',
  Caatinga = 'caatinga',
}

export type MissionInteraction = 'quiz' | 'recycling' | 'planting' | 'photo_hunt' | 'water_management';

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'main' | 'cultural' | 'collective_impact';
  xpReward: number;
  interactionType: MissionInteraction;
}

export interface Biome {
  id: BiomeId;
  name: string;
  unlockLevel: number;
  mentor: Mentor;
  mainMission: Mission;
  culturalMissions: Mission[];
  reward: NFT;
  icon: string;
  color: string;
  description: string;
}

export interface Mentor {
  name: string;
  characterId: CharacterId;
  description: string;
}

export interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  biomeId: BiomeId;
}

export interface PlayerAvatar {
    id: string;
    name: string;
    imageUrl: string;
}

export interface PlayerState {
  level: number;
  xp: number;
  seeds: number;
  completedMissionIds: string[];
  nfts: NFT[];
  lastLogin: string | null;
  onboardingCompleted: boolean;
  avatar: PlayerAvatar | null;
}

export enum CharacterId {
    Curupira = 'curupira',
    LoboGuara = 'lobo-guara',
    Iara = 'iara',
    ZePelintra = 'ze-pelintra',
}

export interface Character {
    id: CharacterId;
    name: string;
    imageUrl: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
