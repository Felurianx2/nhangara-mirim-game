
import { Biome, Character, BiomeId, CharacterId, NFT, PlayerAvatar } from '@/types/types';

// --- LOCAL ASSETS BASE URL ---
const LOCAL_ASSETS_BASE_URL = '/images';

// --- NHANGARA MIRIM ASSETS REPOSITORY (fallback) ---
const ASSETS_BASE_URL = 'https://raw.githubusercontent.com/Felurianx2/nhangara-mirim-assets/main';

// --- BACKGROUNDS ---
export const BACKGROUNDS = {
    HERO_BANNER: `${LOCAL_ASSETS_BASE_URL}/backgrounds/mata-atlantica.png`,
    BIOME_MAP: `${LOCAL_ASSETS_BASE_URL}/backgrounds/mata-atlantica.png`,
    FOREST_BG: `${LOCAL_ASSETS_BASE_URL}/backgrounds/mata-atlantica.png`,
    SAVANNA_BG: `${LOCAL_ASSETS_BASE_URL}/backgrounds/cerrado.png`,
    WETLAND_BG: `${LOCAL_ASSETS_BASE_URL}/backgrounds/pantanal.png`,
    DESERT_BG: `${LOCAL_ASSETS_BASE_URL}/backgrounds/caatinga.png`,
    UI_BACKGROUND: `${LOCAL_ASSETS_BASE_URL}/backgrounds/mata-atlantica.png`,
};

// --- CHARACTERS ---
export const CHARACTERS: Character[] = [
    { 
        id: CharacterId.Curupira, 
        name: 'Curupira', 
        imageUrl: `${LOCAL_ASSETS_BASE_URL}/mentors/curupira.png`,
        description: 'Guardian of the Fauna and Flora',
        personality: 'Protective and wise'
    },
    { 
        id: CharacterId.LoboGuara, 
        name: 'Maned Wolf', 
        imageUrl: `${LOCAL_ASSETS_BASE_URL}/mentors/loboguara_mentor.png`,
        description: 'The Shy Guardian of the Savannas',
        personality: 'Shy and observant'
    },
    { 
        id: CharacterId.Iara, 
        name: 'Iara', 
        imageUrl: `${LOCAL_ASSETS_BASE_URL}/mentors/iara.png`,
        description: 'Mother of the Waters, Protector of the Rivers',
        personality: 'Mysterious and enchanting'
    },
    { 
        id: CharacterId.ZePelintra, 
        name: 'Zumbi', 
        imageUrl: `${LOCAL_ASSETS_BASE_URL}/mentors/Zumbi.png`,
        description: 'character.zumbi.description',
        personality: 'Wise and playful'
    }
];

// --- BIOMES ---
export const BIOME_IMAGES = {
    [BiomeId.MataAtlantica]: {
        hero: `${LOCAL_ASSETS_BASE_URL}/biomas/mata-atlantica/mata-map.png`,
        map: `${LOCAL_ASSETS_BASE_URL}/biomas/mata-atlantica/mata-map.png`,
        detail: `${LOCAL_ASSETS_BASE_URL}/backgrounds/mata-atlantica.png`,
        flora: `${LOCAL_ASSETS_BASE_URL}/backgrounds/mata-atlantica.png`,
        fauna: `${LOCAL_ASSETS_BASE_URL}/backgrounds/mata-atlantica.png`,
    },
    [BiomeId.Cerrado]: {
        hero: `${LOCAL_ASSETS_BASE_URL}/biomas/cerrado/cerrado-map.png`,
        map: `${LOCAL_ASSETS_BASE_URL}/biomas/cerrado/cerrado-map.png`,
        detail: `${LOCAL_ASSETS_BASE_URL}/backgrounds/cerrado.png`,
        flora: `${LOCAL_ASSETS_BASE_URL}/backgrounds/cerrado.png`,
        fauna: `${LOCAL_ASSETS_BASE_URL}/backgrounds/cerrado.png`,
    },
    [BiomeId.Pantanal]: {
        hero: `${LOCAL_ASSETS_BASE_URL}/biomas/pantanal/pantanal-map.png`,
        map: `${LOCAL_ASSETS_BASE_URL}/biomas/pantanal/pantanal-map.png`,
        detail: `${LOCAL_ASSETS_BASE_URL}/backgrounds/pantanal.png`,
        flora: `${LOCAL_ASSETS_BASE_URL}/backgrounds/pantanal.png`,
        fauna: `${LOCAL_ASSETS_BASE_URL}/backgrounds/pantanal.png`,
    },
    [BiomeId.Caatinga]: {
        hero: `${LOCAL_ASSETS_BASE_URL}/biomas/caatinga/caatinga-map.png`,
        map: `${LOCAL_ASSETS_BASE_URL}/biomas/caatinga/caatinga-map.png`,
        detail: `${LOCAL_ASSETS_BASE_URL}/backgrounds/caatinga.png`,
        flora: `${LOCAL_ASSETS_BASE_URL}/backgrounds/caatinga.png`,
        fauna: `${LOCAL_ASSETS_BASE_URL}/backgrounds/caatinga.png`,
    },
};

// --- NFTs ---
export const NFT_IMAGES = {
    [BiomeId.MataAtlantica]: `${LOCAL_ASSETS_BASE_URL}/bioamulets/amulet-mata.png`,
    [BiomeId.Cerrado]: `${LOCAL_ASSETS_BASE_URL}/bioamulets/amulet-cerrado.png`,
    [BiomeId.Pantanal]: `${LOCAL_ASSETS_BASE_URL}/bioamulets/amulet-pantanal.png`,
    [BiomeId.Caatinga]: `${LOCAL_ASSETS_BASE_URL}/bioamulets/amulet-caatinga.png`,
};

// --- UI/UX ELEMENTS ---
export const UI_ELEMENTS = {
    BUTTONS: {
        PRIMARY: `${ASSETS_BASE_URL}/ui-ux-elements/button-primary.png`,
        SECONDARY: `${ASSETS_BASE_URL}/ui-ux-elements/button-secondary.png`,
        SUCCESS: `${ASSETS_BASE_URL}/ui-ux-elements/button-success.png`,
        DANGER: `${ASSETS_BASE_URL}/ui-ux-elements/button-danger.png`,
    },
    CARDS: {
        BIOME_CARD: `${ASSETS_BASE_URL}/ui-ux-elements/biome-card.png`,
        MISSION_CARD: `${ASSETS_BASE_URL}/ui-ux-elements/mission-card.png`,
        NFT_CARD: `${ASSETS_BASE_URL}/ui-ux-elements/nft-card.png`,
    },
    ICONS: {
        XP_ICON: `${ASSETS_BASE_URL}/ui-ux-elements/xp-icon.png`,
        COIN_ICON: `${ASSETS_BASE_URL}/ui-ux-elements/coin-icon.png`,
        LOCK_ICON: `${ASSETS_BASE_URL}/ui-ux-elements/lock-icon.png`,
        UNLOCK_ICON: `${ASSETS_BASE_URL}/ui-ux-elements/unlock-icon.png`,
        CHECK_ICON: `${ASSETS_BASE_URL}/ui-ux-elements/check-icon.png`,
    },
    BACKGROUNDS: {
        MODAL_BG: `${ASSETS_BASE_URL}/ui-ux-elements/modal-background.png`,
        PANEL_BG: `${ASSETS_BASE_URL}/ui-ux-elements/panel-background.png`,
        HEADER_BG: `${ASSETS_BASE_URL}/ui-ux-elements/header-background.png`,
    }
};

// --- MINI-GAMES ---
export const MINI_GAMES = {
    RECYCLING: {
        items: [
            { id: 'plastic1', type: 'plastic', name: 'Plastic Bottle', imageUrl: `${LOCAL_ASSETS_BASE_URL}/mini-games/recycling/plastic.png` },
            { id: 'glass1', type: 'glass', name: 'Glass Bottle', imageUrl: `${LOCAL_ASSETS_BASE_URL}/mini-games/recycling/glass.png` },
            { id: 'metal1', type: 'metal', name: 'Aluminum Can', imageUrl: `${LOCAL_ASSETS_BASE_URL}/mini-games/recycling/metal.png` },
            { id: 'paper1', type: 'paper', name: 'Newspaper', imageUrl: `${LOCAL_ASSETS_BASE_URL}/mini-games/recycling/paper.png` },
        ],
        bins: [
            { type: 'plastic', name: 'Plastic', imageUrl: `${LOCAL_ASSETS_BASE_URL}/mini-games/recycling/bin-plastic.png` },
            { type: 'glass', name: 'Glass', imageUrl: `${LOCAL_ASSETS_BASE_URL}/mini-games/recycling/bin-glass.png` },
            { type: 'metal', name: 'Metal', imageUrl: `${LOCAL_ASSETS_BASE_URL}/mini-games/recycling/bin-metal.png` },
            { type: 'paper', name: 'Paper', imageUrl: `${LOCAL_ASSETS_BASE_URL}/mini-games/recycling/bin-paper.png` }
        ]
    },
    PLANTING: {
        seed: `${LOCAL_ASSETS_BASE_URL}/mini-games/planting/seed.png`,
        seedClick: `${LOCAL_ASSETS_BASE_URL}/mini-games/planting/seed-click.png`,
        sapling: `${ASSETS_BASE_URL}/mini-games/planting/sapling.png`,
        tree: `${ASSETS_BASE_URL}/mini-games/planting/tree.png`,
        soil: `${ASSETS_BASE_URL}/mini-games/planting/soil.png`,
    },
    PHOTO_HUNT: {
        pantanal1: `${LOCAL_ASSETS_BASE_URL}/backgrounds/pantanal.png`,
        pantanal2: `${LOCAL_ASSETS_BASE_URL}/backgrounds/pantanal-without-animals.png`,
    },
    WATER_MANAGEMENT: {
        background: `${LOCAL_ASSETS_BASE_URL}/backgrounds/caatinga.png`,
    }
};

// --- FALLBACK IMAGES (for compatibility) ---
export const LOCAL_IMAGES = {
    TELA: '/images/tela.jpg',
    SACI: '/images/saci.jpg',
    TALISMA_DA_SABEDORIA: '/images/talisma_da_sabedoria.jpg',
    BIOMAS: '/images/biomas.jpg',
    CAATINGA_MAP: '/images/caatinga-map.png',
    MAP: '/images/map.png',
    WELCOME_VIDEO: '/images/753b6295-8e4d-47ed-afc6-a5f94436fdef.mp4'
};

// --- HUB BACKGROUND ---
export const HUB_BACKGROUND_URL = LOCAL_IMAGES.MAP;

// --- Avatars ---
export const AVATARS: PlayerAvatar[] = [
    { id: 'avatar1', name: 'Male Guardian', imageUrl: `${LOCAL_ASSETS_BASE_URL}/personagens/nhangara-male.png` },
    { id: 'avatar2', name: 'Female Guardian', imageUrl: `${LOCAL_ASSETS_BASE_URL}/personagens/nhangara-female.png` },
    { id: 'avatar3', name: 'Neutral Guardian', imageUrl: `${LOCAL_ASSETS_BASE_URL}/personagens/nhangara-neutral.png` },
];

// --- NFTs with new images ---
const NFTS: { [key in BiomeId]: NFT } = {
    'mata-atlantica': {
        id: 'nft-mata-atlantica',
        name: 'Atlantic Forest Amulet',
        description: 'A symbol of your effort to preserve the rich biodiversity of the Atlantic Forest.',
        imageUrl: NFT_IMAGES[BiomeId.MataAtlantica],
        biomeId: BiomeId.MataAtlantica,
    },
    'cerrado': {
        id: 'nft-cerrado',
        name: 'Cerrado Seed Amulet',
        description: 'Represents your contribution to the reforestation of the Brazilian savanna.',
        imageUrl: NFT_IMAGES[BiomeId.Cerrado],
        biomeId: BiomeId.Cerrado,
    },
    'pantanal': {
        id: 'nft-pantanal',
        name: 'Pantanal Water Amulet',
        description: 'A mark of your help in preserving the pristine waters and fauna of the Pantanal.',
        imageUrl: NFT_IMAGES[BiomeId.Pantanal],
        biomeId: BiomeId.Pantanal,
    },
    'caatinga': {
        id: 'nft-caatinga',
        name: 'Caatinga Sun Amulet',
        description: 'Symbolizes your understanding of resilience and wise use of resources in the semi-arid.',
        imageUrl: NFT_IMAGES[BiomeId.Caatinga],
        biomeId: BiomeId.Caatinga,
    },
};

// --- Legacy data structures for compatibility ---
export const RECYCLING_DATA = MINI_GAMES.RECYCLING;
export const PLANTING_DATA = {
    target: 10,
    seedImageUrl: MINI_GAMES.PLANTING.seed,
};
export const PHOTO_HUNT_DATA = {
    imageA: MINI_GAMES.PHOTO_HUNT.pantanal1,
    imageB: MINI_GAMES.PHOTO_HUNT.pantanal2,
    differences: [
        { x: 25, y: 25, r: 8 },  // Tuiuiú (Bird in nest)
        { x: 75, y: 40, r: 8 },  // Jaguar
        { x: 15, y: 85, r: 8 },  // Capybara
        { x: 85, y: 20, r: 6 },  // Macaw
        { x: 50, y: 80, r: 7 },  // Caiman
    ]
};
export const WATER_MANAGEMENT_DATA = {
    totalWater: 100,
    sectors: ['Farming', 'Livestock', 'Community'],
};

// --- Biome Definitions with new images ---
export const BIOMES: Biome[] = [
    {
        id: BiomeId.MataAtlantica,
        name: 'Atlantic Forest',
        unlockLevel: 1,
        mentor: {
            name: 'Curupira',
            characterId: CharacterId.Curupira,
            description: "Guardian of the Fauna and Flora",
            imageUrl: CHARACTERS.find(c => c.id === CharacterId.Curupira)?.imageUrl,
        },
        mainMission: {
            id: 'mata-atlantica-main',
            title: 'Clean Up the Forest',
            description: 'The forest is cluttered with items left by visitors. Drag each piece of trash to the correct recycling bin.',
            type: 'main',
            xpReward: 200,
            interactionType: 'recycling',
        },
        culturalMissions: [
            { id: 'ma-cult-1', title: 'Curupira\'s Quiz', description: 'Test your knowledge about the forest protector.', type: 'cultural', xpReward: 50, interactionType: 'quiz' }
        ],
        reward: {
            id: 'mata-atlantica-nft',
            biomeId: BiomeId.MataAtlantica,
            name: 'Atlantic Forest Amulet',
            description: 'A sacred amulet representing the protection of the Atlantic Forest',
            imageUrl: NFT_IMAGES[BiomeId.MataAtlantica]
        },
        icon: '🌳',
        color: 'text-green-400',
        description: 'A vibrant ecosystem teeming with life, facing the challenges of deforestation.',
        images: BIOME_IMAGES[BiomeId.MataAtlantica]
    },
    {
        id: BiomeId.Cerrado,
        name: 'Cerrado',
        unlockLevel: 2,
        mentor: {
            name: 'Maned Wolf',
            characterId: CharacterId.LoboGuara,
            description: 'The Shy Guardian of the Savannas',
            imageUrl: CHARACTERS.find(c => c.id === CharacterId.LoboGuara)?.imageUrl,
        },
        mainMission: {
            id: 'cerrado-main',
            title: 'Reforestation Effort',
            description: 'The Cerrado suffers from fires. Help reforest by planting new seeds.',
            type: 'main',
            xpReward: 200,
            interactionType: 'planting'
        },
        culturalMissions: [
            { id: 'ce-cult-1', title: 'Cerrado\'s Flavors', description: 'Discover the unique fruits of this biome.', type: 'cultural', xpReward: 50, interactionType: 'quiz' }
        ],
        reward: {
            id: 'cerrado-nft',
            biomeId: BiomeId.Cerrado,
            name: 'Cerrado Amulet',
            description: 'A sacred amulet representing the protection of the Cerrado',
            imageUrl: NFT_IMAGES[BiomeId.Cerrado]
        },
        icon: '🌾',
        color: 'text-yellow-400',
        description: 'The most biodiverse savanna in the world, known for its twisted trees and vast grasslands.',
        images: BIOME_IMAGES[BiomeId.Cerrado]
    },
    {
        id: BiomeId.Pantanal,
        name: 'Pantanal',
        unlockLevel: 3,
        mentor: {
            name: 'Iara',
            characterId: CharacterId.Iara,
            description: 'Mother of the Waters, Protector of the Rivers',
            imageUrl: CHARACTERS.find(c => c.id === CharacterId.Iara)?.imageUrl,
        },
        mainMission: {
            id: 'pantanal-main',
            title: 'Sustainable Virtual Tourism',
            description: 'Spot the 5 differences between the two photos to create a virtual tour of the Pantanal.',
            type: 'main',
            xpReward: 200,
            interactionType: 'photo_hunt'
        },
        culturalMissions: [
            { id: 'pa-cult-1', title: 'Legends of the Waters', description: 'Learn about the fantastic creatures of the rivers.', type: 'cultural', xpReward: 50, interactionType: 'quiz' }
        ],
        reward: {
            id: 'pantanal-nft',
            biomeId: BiomeId.Pantanal,
            name: 'Pantanal Amulet',
            description: 'A sacred amulet representing the protection of the Pantanal',
            imageUrl: NFT_IMAGES[BiomeId.Pantanal]
        },
        icon: '🐊',
        color: 'text-blue-400',
        description: 'The world\'s largest tropical wetland, a spectacular wildlife sanctuary.',
        images: BIOME_IMAGES[BiomeId.Pantanal]
    },
    {
        id: BiomeId.Caatinga,
        name: 'Caatinga',
        unlockLevel: 4,
        mentor: {
            name: 'Zumbi',
            characterId: CharacterId.ZePelintra,
            description: 'character.zumbi.description',
            imageUrl: CHARACTERS.find(c => c.id === CharacterId.ZePelintra)?.imageUrl,
        },
        mainMission: {
            id: 'caatinga-main',
            title: 'Water Management',
            description: 'Water is scarce. Distribute the available water wisely among the sectors.',
            type: 'main',
            xpReward: 200,
            interactionType: 'water_management'
        },
        culturalMissions: [
            { id: 'ca-cult-1', title: 'Wisdom of the Sertão', description: 'Answer questions about life in the semi-arid.', type: 'cultural', xpReward: 50, interactionType: 'quiz' }
        ],
        reward: {
            id: 'caatinga-nft',
            biomeId: BiomeId.Caatinga,
            name: 'Caatinga Amulet',
            description: 'A sacred amulet representing the protection of the Caatinga',
            imageUrl: NFT_IMAGES[BiomeId.Caatinga]
        },
        icon: '🌵',
        color: 'text-orange-400',
        description: 'A uniquely Brazilian semi-arid biome, full of resilient and adaptive life.',
        images: BIOME_IMAGES[BiomeId.Caatinga]
    },
];

export const XP_PER_LEVEL = 250;
