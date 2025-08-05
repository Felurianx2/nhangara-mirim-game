
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider } from './contexts/GameContext';
import HomeScreen from './screens/HomeScreen';
import BiomeMapScreen from './screens/BiomeMapScreen';
import BiomeDetailScreen from './screens/BiomeDetailScreen';
import WalletScreen from './screens/WalletScreen';
import ArtistAcademyScreen from './screens/ArtistAcademyScreen';
import MissionScreen from './screens/MissionScreen';
import AdminScreen from './screens/AdminScreen';
import MainLayout from './components/layout/MainLayout';
import StartScreen from './screens/StartScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import WelcomeVideoScreen from './screens/WelcomeVideoScreen';

const MainAppRoutes: React.FC = () => (
  <MainLayout>
    <Routes>
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/biomes" element={<BiomeMapScreen />} />
      <Route path="/biome/:biomeId" element={<BiomeDetailScreen />} />
      <Route path="/biome/:biomeId/mission/:missionId" element={<MissionScreen />} />
      <Route path="/wallet" element={<WalletScreen />} />
      <Route path="/artist-academy" element={<ArtistAcademyScreen />} />
      <Route path="/admin" element={<AdminScreen />} />
      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  </MainLayout>
);


const App: React.FC = () => {
  return (
    <GameProvider>
      <HashRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/start" />} />
            <Route path="/start" element={<StartScreen />} />
            <Route path="/welcome-video" element={<WelcomeVideoScreen />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/*" element={<MainAppRoutes />} />
          </Routes>
      </HashRouter>
    </GameProvider>
  );
};

export default App;
