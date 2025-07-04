// src/components/MemoryGameView.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import contentData from '../data/contentData.jsx';
import Card from './Card.jsx';

const MemoryGameView = ({ onGoHome }) => {
    const { t } = useTranslation();
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const shuffleAndStartGame = useCallback(() => {
        const animalCards = contentData.animals;

        console.log('Dados dos animais carregados:', animalCards);

        const duplicatedCards = [...animalCards, ...animalCards]
            .map((card, index) => ({ ...card, id: index }))
            .sort(() => Math.random() - 0.5);

        console.log('Baralho de cartas pronto para o jogo:', duplicatedCards);

        setCards(duplicatedCards);
        setFlipped([]);
        setMatched([]);
        setIsDisabled(false);
    }, []);

    useEffect(() => {
        shuffleAndStartGame();
    }, [shuffleAndStartGame]);

    const handleCardClick = (clickedCard) => {
        if (isDisabled || flipped.some(c => c.id === clickedCard.id) || matched.includes(clickedCard.textKey)) {
            return;
        }

        const newFlipped = [...flipped, clickedCard];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setIsDisabled(true);
            if (newFlipped[0].textKey === newFlipped[1].textKey) {
                setMatched(prev => [...prev, newFlipped[0].textKey]);
                setFlipped([]);
                setIsDisabled(false);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setIsDisabled(false);
                }, 1200);
            }
        }
    };

    const allPairsFound = matched.length === contentData.animals.length;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            {allPairsFound ? (
                <div className="text-center">
                    <h1 className="text-5xl font-black text-green-500 mb-4">{t('memory_game_win')}</h1>
                    <button onClick={shuffleAndStartGame} className="bg-white text-sky-700 font-bold py-3 px-6 rounded-full shadow-lg text-2xl">
                        {t('play_again')}
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-4xl mx-auto p-4">
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                        {cards.map((card) => (
                            <Card
                                key={card.id}
                                item={card}
                                isFlipped={flipped.some(c => c.id === card.id) || matched.includes(card.textKey)}
                                onClick={() => handleCardClick(card)}
                            />
                        ))}
                    </div>
                </div>
            )}
            <div className="w-full max-w-md mt-6">
                <button onClick={onGoHome} className="nav-button bg-white rounded-full p-5 shadow-lg text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>
                </button>
            </div>
        </div>
    );
};

export default MemoryGameView;