import React, { useState, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import { X } from 'lucide-react';

const DailyCheckinModal: React.FC = () => {
  const { hasDailyReward, claimDailyReward } = useGame();
  const [isOpen, setIsOpen] = useState(false);
  const [rewardAmount, setRewardAmount] = useState(0);

  useEffect(() => {
    // Open the modal only if a reward is available.
    // A small delay makes it feel less abrupt.
    if (hasDailyReward) {
        setTimeout(() => setIsOpen(true), 1000);
    }
  }, [hasDailyReward]);

  const handleClaim = () => {
    const { claimed, amount } = claimDailyReward();
    if (claimed) {
        setRewardAmount(amount);
        // Close modal after a short delay to show confirmation
        setTimeout(() => {
            setIsOpen(false);
        }, 2000);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full m-4 transform scale-100 transition-transform duration-300 text-center relative border-2 border-emerald-500">
        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <X size={24} />
        </button>
        
        {rewardAmount > 0 ? (
            <div>
                <h2 className="text-3xl font-bold text-white mb-4">Reward Collected!</h2>
                <p className="text-gray-300 text-lg">You've earned</p>
                <div className="my-6 flex items-center justify-center gap-3 text-yellow-400">
                    <img src="https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/planting/seed.png?raw=true" alt="Seed" className="w-16 h-16" />
                    <span className="text-5xl font-bold">{rewardAmount}</span>
                </div>
                 <p className="text-gray-300 text-lg">seeds!</p>
            </div>
        ) : (
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Daily Reward!</h2>
                <p className="text-gray-300 mb-6">Come back every day to earn seeds and help reforest Brazil!</p>
                <div className="my-8 flex justify-center">
                    <div className="p-6 bg-gray-700 rounded-full animate-pulse">
                        <img src="https://github.com/Felurianx2/nhangara-mirim-assets/blob/main/mini-games/planting/seed.png?raw=true" alt="Seed" className="w-16 h-16" />
                    </div>
                </div>
                <button 
                    onClick={handleClaim}
                    className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    Claim Reward
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default DailyCheckinModal;