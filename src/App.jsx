import { useState, useEffect } from 'react';
import MenuView from './components/MenuView.jsx';
import LearningView from './components/LearningView.jsx';
import SettingsView from './components/SettingsView.jsx';
import MemoryGameView from './components/MemoryGameView.jsx';
import speechApi from './services/speechApi.jsx';
import AnimalSubMenuView from "./components/AnimalSubMenuView.jsx";

// =================================================================
// RESPONSABILIDADE: Orquestrar a aplicação.
// =================================================================
const App = () => {
    const [currentView, setCurrentView] = useState('menu');
    const [settings, setSettings] = useState({
        soundEnabled: true,
        theme: 'default',
    });

    useEffect(() => {
        speechApi.loadVoices();
        // Aplica a classe de tema ao body para que as variáveis CSS funcionem
        document.body.className = `theme-${settings.theme}`;
    }, [settings.theme]);

    const handleUpdateSettings = (key, value) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        if (key === 'soundEnabled') {
            speechApi.updateSettings({ soundEnabled: value });
        }
    };

    const handleSelectCategory = (category) => setCurrentView(category);
    const handleGoToSettings = () => setCurrentView('settings');
    const handleGoHome = () => setCurrentView('menu');

    // A função que decide qual componente renderizar
    const renderView = () => {
        switch (currentView) {
            case 'settings':
                return <SettingsView settings={settings} onUpdateSettings={handleUpdateSettings} onGoHome={handleGoHome} />;
            case 'menu':
                return <MenuView onSelectCategory={handleSelectCategory} onGoToSettings={handleGoToSettings} currentTheme={settings.theme} />;
            case 'animals_submenu':
                return <AnimalSubMenuView onSelectActivity={handleSelectCategory} onGoHome={handleGoHome} />;
            case 'animals_game':
                return <MemoryGameView onGoHome={handleGoHome} />;
            case 'animals':
                return <LearningView category="animals" onGoHome={handleGoHome} />;
            default:
                return <LearningView category={currentView} onGoHome={handleGoHome} />;
        }
    };

    return (
        <div className="bg-[var(--bg-color)] flex items-center justify-center min-h-screen p-4 transition-colors duration-300" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <div className="w-full max-w-4xl mx-auto">
                {renderView()}
            </div>
        </div>
    );
}

export default App;