import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGame } from '../../hooks/useGame';
import { XP_PER_LEVEL } from '@/utils/constants';
import { Leaf, Settings } from 'lucide-react';

const Header: React.FC = () => {
  const { playerState } = useGame();
  const xpPercentage = Math.round((playerState.xp / XP_PER_LEVEL) * 100);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-emerald-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <NavLink to="/home" className="flex-shrink-0 flex items-center gap-2 text-white font-bold text-xl">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span>Nhangara Mirim</span>
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/home" className={navLinkClass}>Home</NavLink>
              <NavLink to="/biomes" className={navLinkClass}>Explore Biomes</NavLink>
              <NavLink to="/wallet" className={navLinkClass}>Wallet</NavLink>
              <NavLink to="/artist-academy" className={navLinkClass}>Artist Academy</NavLink>
              <NavLink to="/admin" className={navLinkClass}>
                <Settings size={16} />
                Admin
              </NavLink>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm bg-gray-700 px-3 py-1.5 rounded-full">
               <img src="https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/planting/seed.png?raw=true" alt="Seed" className="w-5 h-5" />
               <span className="font-semibold text-white">{playerState.seeds} Seeds</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="font-bold text-lg text-white">Level {playerState.level}</div>
                <div className="w-32 bg-gray-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-teal-400 to-emerald-500 h-2.5 rounded-full" style={{ width: `${xpPercentage}%` }}></div>
                </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;