
import { Biome, Character, BiomeId, CharacterId, NFT, PlayerAvatar } from '@/types/types';

// --- LOCAL IMAGES ---
// Images from the local imagens_lcc folder
export const LOCAL_IMAGES = {
    TELA: '/images/tela.jpg',
    SACI: '/images/saci.jpg',
    TALISMA_DA_SABEDORIA: '/images/talisma_da_sabedoria.jpg',
    BIOMAS: '/images/biomas.jpg',
    WELCOME_VIDEO: '/images/753b6295-8e4d-47ed-afc6-a5f94436fdef.mp4'
};

// --- STABLE IMAGE URLS ---
// Using raw GitHub links for stability and permanence.
export const HOME_BANNER_URL = LOCAL_IMAGES.TELA; // Using local image instead of remote
export const HUB_BACKGROUND_URL = LOCAL_IMAGES.BIOMAS; // Using local biomas image as background

// For small, critical UI icons, Base64 is efficient and reliable.
const IMAGE_RECYCLE_PLASTIC_B64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAN+SURBVHhe7ZxLy81xFMf/8x+k06JQiIUUUkK2yI6iVEpKyIpkIyVkIyv2hJSK2BUpUv6AEKVEKBLSRgqJLCQrG/n8vubcM/d5zjlzzn1u8zOf5H7v3HvOPfe55z73dEaj0Wg0Gr3hC4w/Wb0L92G/a/sXq18/YPyJ1bvwwNrvN/u/a/vfrH79gPEHVu/CA1u/pP3/av36A8afWN0LryP7T2v/v1r9+gHjD6xehQe2/iRp/1/L6tef8B8w/qTq3fA57H/L+r9e/foDxn949S6c7T7M7N8u/Rj8E0lJSv4p4C8rQkJCQv4K8JciISEhvwL8JSISH5P4E4VNSiQkJCQk/j8JCAm/gCT8P5OEhISkL2kSEl6SJCQk/v8nISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIkpIkKUlSkqQkSUpSpCUpTUmSkpQkKUnS/+fN1/84SkhISCKRSIQfSRISkp+kJElKEn+SktUkKUlSktUkKUliE5KkpCSlSUpSJCQhCSlJkiQkKUlSkj8JCUmSJCUpSZIkhCSEJCUpkiQkKUlSkj8JCUmSJCUpSZIkhCSEJCUpkiQkKUlSkr+klJSmpCSlSUpSJCQhCSnSV0pSkqQkSUl8CUnSfyQkJEn9D0lKkpQkSRISkISQJCUpkpIkKQkhSUpSpCRJSZKUJBKRSCSSkpQkSZIkhCS+SUhCEiQkKUlSkqQk/p+kv5n+95cAAAAASUVORK5CYII=';
const IMAGE_RECYCLE_GLASS_B64 = 'https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/recycling/glass.png?raw=true';
const IMAGE_RECYCLE_PAPER_B64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATLSURBVHhe7ZxZb9NQFMe/1d7uWntpb7t2hEBAoFAoQpEoC0kQx8YDL2hCPOAJkPjgC/wAJsYT40E8eAExMS+YoB55QEKxLJAqIYoWCFpCqe22t/v13l9+2p27XbM9205I8kt+S2/3zp/OOfM/p5Pz/1wqlUqlUqlUqlUKpXKg1L44H+4f708QyL8tP39L1T87QOW/oH4a+T+U/D4g4o/+D4E+s9g+9eP3P8I+pPzH0F+69f7j2L/8H8+wP4H/P9B/P+p8S3Wq1f/+O/+2f45vL8v9/0L/P8G1G/X175P/P4j4v9/q159pL/mK1C//n8A/P4t+R8f/i+I//nF6r9x/A+V/q56f/v4t68tP9v/T+m333b/B3D8R+H74/yRJP47yT9yPAn4m4QkJCQk/j8JCUlSJCUpSZIkhCSEJCQhCSlIkpQkJCQhCSlJUqSkJCEJSZKEpCQJSUhCUqSkSJKQJCRJEpKEJCQhCUlKkiQkKUli+vf0t9//7D8JCQkJ/5MkSWKSkpR+EpIQkjSRpCQkISQJSZIkpUkSkpCEL+m/JSUpSZIkhCSEJCQhSSpSmpKkJElS/ksISUgSEpLUJCQhSUjSJCUpSRKSkCS+JSUpkvg7JKRJSZIkSZIkhCQkSRISkqQkSUhCUqQkSZIkhKQkSUpSkpIkSRIShCRJSZIkJElKkpAkpKRIkpAkSEhSUpKkJElSEpKkJElSkqQkSZIkhCQkISRJkpIkSUpSEpKkJEliEhKSJCUpkpIkKQkhCSlJkiQkKUlSkqQkSUpKUpLUJElKkiQkIQlJUpIkJCUpSYhISP+f8N9S/pQ/UpKUJCQkJCQhSRJSkpIkSUiSJIQkKUliEpKQJCQJSVIkCUlIQpLUJCQhCSlJUqSkJEkJQpKkJEkSEpKQJCUpkpIkKQkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC/oH0G9e13B8v/YAAAAABJRU5ErkJggg==';

// --- Avatars ---
export const AVATARS: PlayerAvatar[] = [
    { id: 'avatar1', name: 'Male Guardian', imageUrl: LOCAL_IMAGES.SACI }, // Using Saci image as avatar
    { id: 'avatar2', name: 'Female Guardian', imageUrl: 'https://raw.githubusercontent.com/unb-mds/2024-1-squad02-nhangamirirm-images/main/avatars/female-guardian.png' },
];

// --- Recycling Bin Images ---
const IMAGE_RECYCLE_BIN_PLASTIC_URL = 'https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/recycling/bin-plastic.png?raw=true';
const IMAGE_RECYCLE_BIN_GLASS_URL = 'https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/recycling/bin-glass.png?raw=true';
const IMAGE_RECYCLE_BIN_METAL_URL = 'https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/recycling/bin-metal.png?raw=true';
const IMAGE_RECYCLE_BIN_PAPER_URL = 'https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/recycling/bin-paper.png?raw=true';

// --- Characters ---
export const CHARACTERS: Character[] = [
    { id: CharacterId.Curupira, name: 'Curupira', imageUrl: LOCAL_IMAGES.SACI }, // Using Saci image for Curupira
    { id: CharacterId.LoboGuara, name: 'Maned Wolf', imageUrl: 'https://raw.githubusercontent.com/unb-mds/2024-1-squad02-nhangamirirm-images/main/characters/lobo-guara.png' },
    { id: CharacterId.Iara, name: 'Iara', imageUrl: 'https://raw.githubusercontent.com/unb-mds/2024-1-squad02-nhangamirirm-images/main/characters/iara.png' },
    { id: CharacterId.ZePelintra, name: 'Zé Pelintra', imageUrl: 'https://raw.githubusercontent.com/unb-mds/2024-1-squad02-nhangamirirm-images/main/characters/ze-pelintra.png' }
];

// --- NFTs ---
const NFTS: { [key in BiomeId]: NFT } = {
    'mata-atlantica': {
        id: 'nft-mata-atlantica',
        name: 'Atlantic Forest Amulet',
        description: 'A symbol of your effort to preserve the rich biodiversity of the Atlantic Forest.',
        imageUrl: LOCAL_IMAGES.TALISMA_DA_SABEDORIA, // Using local talisman image
        biomeId: BiomeId.MataAtlantica,
    },
    'cerrado': {
        id: 'nft-cerrado',
        name: 'Cerrado Seed Amulet',
        description: 'Represents your contribution to the reforestation of the Brazilian savanna.',
        imageUrl: LOCAL_IMAGES.TALISMA_DA_SABEDORIA, // Using local talisman image
        biomeId: BiomeId.Cerrado,
    },
    'pantanal': {
        id: 'nft-pantanal',
        name: 'Pantanal Water Amulet',
        description: 'A mark of your help in preserving the pristine waters and fauna of the Pantanal.',
        imageUrl: LOCAL_IMAGES.TALISMA_DA_SABEDORIA, // Using local talisman image
        biomeId: BiomeId.Pantanal,
    },
    'caatinga': {
        id: 'nft-caatinga',
        name: 'Caatinga Sun Amulet',
        description: 'Symbolizes your understanding of resilience and wise use of resources in the semi-arid.',
        imageUrl: LOCAL_IMAGES.TALISMA_DA_SABEDORIA, // Using local talisman image
        biomeId: BiomeId.Caatinga,
    },
};

// --- Mini-Game Data ---
export const RECYCLING_DATA = {
    items: [
        { id: 'plastic', type: 'plastic', name: 'Plastic Bottle', imageUrl: IMAGE_RECYCLE_PLASTIC_B64 },
        { id: 'glass', type: 'glass', name: 'Glass Bottle', imageUrl: IMAGE_RECYCLE_GLASS_B64 },
        { id: 'metal', type: 'metal', name: 'Can', imageUrl: 'https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/recycling/metal.png?raw=true' },
        { id: 'paper', type: 'paper', name: 'Newspaper', imageUrl: IMAGE_RECYCLE_PAPER_B64 },
    ],
    bins: [
        { type: 'plastic', name: 'Plastic', imageUrl: IMAGE_RECYCLE_BIN_PLASTIC_URL },
        { type: 'glass', name: 'Glass', imageUrl: IMAGE_RECYCLE_BIN_GLASS_URL },
        { type: 'metal', name: 'Metal', imageUrl: IMAGE_RECYCLE_BIN_METAL_URL },
        { type: 'paper', name: 'Paper', imageUrl: IMAGE_RECYCLE_BIN_PAPER_URL }
    ]
};

export const PLANTING_DATA = {
    target: 10,
    seedImageUrl: 'https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/planting/seed.png?raw=true',
};

export const PHOTO_HUNT_DATA = {
    imageA: 'https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/photo-hunt/photo-hunt-with-animals.png?raw=true',
    imageB: 'https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/photo-hunt/photo-hunt-without-animals.png?raw=true',
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

// --- Biome Definitions ---
export const BIOMES: Biome[] = [
    {
        id: BiomeId.MataAtlantica,
        name: 'Atlantic Forest',
        unlockLevel: 1,
        mentor: {
            name: 'Curupira',
            characterId: CharacterId.Curupira,
            description: "Guardian of the Fauna and Flora",
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
        reward: NFTS['mata-atlantica'],
        icon: '🌳',
        color: 'text-green-400',
        description: 'A vibrant ecosystem teeming with life, facing the challenges of deforestation.'
    },
    {
        id: BiomeId.Cerrado,
        name: 'Cerrado',
        unlockLevel: 2,
        mentor: {
            name: 'Maned Wolf',
            characterId: CharacterId.LoboGuara,
            description: 'The Shy Guardian of the Savannas',
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
        reward: NFTS['cerrado'],
        icon: '🌾',
        color: 'text-yellow-400',
        description: 'The most biodiverse savanna in the world, known for its twisted trees and vast grasslands.'
    },
    {
        id: BiomeId.Pantanal,
        name: 'Pantanal',
        unlockLevel: 3,
        mentor: {
            name: 'Iara',
            characterId: CharacterId.Iara,
            description: 'Mother of the Waters, Protector of the Rivers',
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
        reward: NFTS['pantanal'],
        icon: '🐊',
        color: 'text-blue-400',
        description: 'The world\'s largest tropical wetland, a spectacular wildlife sanctuary.'
    },
    {
        id: BiomeId.Caatinga,
        name: 'Caatinga',
        unlockLevel: 4,
        mentor: {
            name: 'Zé Pelintra',
            characterId: CharacterId.ZePelintra,
            description: 'The Wise Trickster of the Sertão',
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
        reward: NFTS['caatinga'],
        icon: '🌵',
        color: 'text-orange-400',
        description: 'A uniquely Brazilian semi-arid biome, full of resilient and adaptive life.'
    },
];

export const XP_PER_LEVEL = 250;
