import React from 'react';
import { LogOut } from 'lucide-react';
import { authService } from '../services/authService';

const LogoutButton: React.FC = () => {
    const handleLogout = () => {
        authService.logout();
        window.location.href = '/';
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600/20 text-red-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600/40 hover:text-white transition-colors"
        >
            <LogOut size={16} />
            <span>Sair</span>
        </button>
    );
};

export default LogoutButton; 