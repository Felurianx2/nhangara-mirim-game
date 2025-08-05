import { QuizQuestion, Biome } from '../types';

// This is a MOCK service. In a real application, you would use:
// import { GoogleGenAI, Type } from "@google/genai";
// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MOCK_LATENCY = 800;

export const geminiService = {
  generateMentorDialogue: async (mentorName: string, biomeName: string): Promise<string> => {
    console.log(`Generating dialogue for ${mentorName} in ${biomeName}...`);
    // MOCK IMPLEMENTATION
    await new Promise(resolve => setTimeout(resolve, MOCK_LATENCY));
    
    const dialogues: { [key: string]: string } = {
        'Curupira': `Hello, guardian! I am Curupira. The Atlantic Forest needs our help. Many forget to take care of it, but together we can make a difference. Let's start by cleaning up the trash that doesn't belong here!`,
        'Maned Wolf': `Awooo! I am the Maned Wolf. Welcome to the Cerrado, a place of strength and rebirth. The seeds we plant today will be the great trees of tomorrow. Are you ready to cultivate the future?`,
        'Iara': `May the peace of the waters be with you. I am Iara. The Pantanal is a paradise, but it is fragile. I want you to show the beauty of this place to the world without anyone needing to disturb it. Let's create an unforgettable virtual journey.`,
        'Zé Pelintra': `Greetings! Zé Pelintra in the house. In the Caatinga, we learn that every drop of water and every grain of food is sacred. Wisdom is knowing how to use what you have. I will teach you to thrive with little, with a lot of swagger!`,
    };

    return dialogues[mentorName] || `Hello! Welcome to ${biomeName}. Let's protect this place!`;
  },

  generateQuiz: async (biome: Biome): Promise<QuizQuestion> => {
     console.log(`Generating quiz for ${biome.name}...`);
     // MOCK IMPLEMENTATION
     await new Promise(resolve => setTimeout(resolve, MOCK_LATENCY));
    
     const quizzes: { [key: string]: QuizQuestion } = {
        'mata-atlantica': {
            question: "Which animal, a symbol of the Atlantic Forest, is endangered?",
            options: ["Golden lion tamarin", "Maned Wolf", "Jaguar", "Capybara"],
            correctAnswer: "Golden lion tamarin",
            explanation: "The Golden Lion Tamarin is an endemic species of the Atlantic Forest and a strong symbol of conservation efforts in the region."
        },
        'cerrado': {
            question: "Which Cerrado fruit is famous for its exotic flavor and use in local cuisine?",
            options: ["Açaí", "Cupuaçu", "Pequi", "Cajá"],
            correctAnswer: "Pequi",
            explanation: "Pequi is known for its strong aroma and flavor, being an iconic ingredient in Cerrado dishes, such as 'rice with pequi'."
        },
        'pantanal': {
            question: "What is the largest feline in the Americas, easily found in the Pantanal?",
            options: ["Lion", "Tiger", "Jaguar", "Puma"],
            correctAnswer: "Jaguar",
            explanation: "The Jaguar is at the top of the food chain in the Pantanal and an indicator of the ecosystem's health."
        },
        'caatinga': {
            question: "What is the main characteristic of Caatinga's vegetation?",
            options: ["Wide and humid leaves", "Adaptation to drought, with thorns and leaf loss", "Very tall and dense trees", "Open fields with few trees"],
            correctAnswer: "Adaptation to drought, with thorns and leaf loss",
            explanation: "The xerophytic vegetation of the Caatinga is adapted to survive long periods of drought, often with thorns and leaves that fall to save water."
        }
     };

     return quizzes[biome.id] || quizzes['mata-atlantica'];
  }
};