import { useState, useEffect } from 'react';
import MenuView from './components/MenuView.jsx';
import LearningView from './components/LearningView.jsx';
import SettingsView from './components/SettingsView.jsx';
import MemoryGameView from './components/MemoryGameView.jsx';
import AnimalSubMenuView from './components/AnimalSubMenuView.jsx';
import speechApi from './services/speechApi.jsx';

const App = () => {
    const [currentView, setCurrentView] = useState('menu');
    const [settings, setSettings] = useState({
        soundEnabled: true,
        theme: 'default',
    });

    // Estado para guardar as recompensas
    const [rewards, setRewards] = useState({});

    useEffect(() => {
        speechApi.loadVoices();
        document.body.className = `theme-${settings.theme}`;
    }, [settings.theme]);

    const handleUpdateSettings = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        if (key === 'soundEnabled') {
            speechApi.updateSettings({ soundEnabled: value });
        }
    };

    // Função para registrar a vitória em um jogo
    const handleGameWin = (gameId) => {
        setRewards(prevRewards => ({
            ...prevRewards,
            [gameId]: true
        }));
    };

    const handleSelectCategory = (category) => setCurrentView(category);
    const handleGoToSettings = () => setCurrentView('settings');
    const handleGoHome = () => setCurrentView('menu');

    const renderView = () => {
        switch (currentView) {
            case 'settings':
                return <SettingsView settings={settings} onUpdateSettings={handleUpdateSettings} onGoHome={handleGoHome} />;
            case 'menu':
                return <MenuView onSelectCategory={handleSelectCategory} onGoToSettings={handleGoToSettings} currentTheme={settings.theme} rewards={rewards} />;
            case 'animals_submenu':
                return <AnimalSubMenuView onSelectActivity={handleSelectCategory} onGoHome={handleGoHome} />;
            case 'animals_game':
                // Passa a função de vitória para o jogo
                return <MemoryGameView onGoHome={handleGoHome} onGameWin={() => handleGameWin('animals_game')} />;
            default:
                return <LearningView category={currentView} onGoHome={handleGoHome} />;
        }
    };

    return (
        <div className="bg-[var(--bg-color)] flex items-center justify-center min-h-screen p-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <div className="w-full max-w-4xl mx-auto">
                {renderView()}
            </div>
        </div>
    );
};

export default App;