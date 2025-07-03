import { useState, useEffect } from 'react';
import MenuView from './components/MenuView.jsx';
import LearningView from './components/LearningView.jsx';
import speechApi from './services/speechApi.jsx';

// =================================================================
// RESPONSABILIDADE: Orquestrar a aplicação.
// =================================================================
const App = () => {
    const [currentView, setCurrentView] = useState('menu');

    useEffect(() => {
        speechApi.loadVoices();
    }, []);

    const handleSelectCategory = (category) => setCurrentView(category);
    const handleGoHome = () => setCurrentView('menu');

    return (
        <div className="bg-sky-100 flex items-center justify-center min-h-screen p-4" style={{fontFamily: "'Nunito', sans-serif"}}>
            <div className="w-full max-w-4xl mx-auto">
                {currentView === 'menu' ? (
                    <MenuView onSelectCategory={handleSelectCategory} />
                ) : (
                    <LearningView category={currentView} onGoHome={handleGoHome} />
                )}
            </div>
        </div>
    );
}

export default App;