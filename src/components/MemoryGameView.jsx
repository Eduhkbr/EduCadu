import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import contentData from '../data/contentData.jsx';
import Card from './Card.jsx';
import StarIcon from './StarIcon.jsx';

const MemoryGameView = ({ onGoHome, onGameWin }) => {
    const { t } = useTranslation();
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [hasWon, setHasWon] = useState(false);

    const shuffleAndStartGame = useCallback(() => {
        const animalCards = contentData.animals;
        const duplicatedCards = [...animalCards, ...animalCards]
            .map((card, index) => ({ ...card, id: index }))
            .sort(() => Math.random() - 0.5);

        setCards(duplicatedCards);
        setFlipped([]);
        setMatched([]);
        setIsDisabled(false);
        setHasWon(false);
    }, []);

    useEffect(() => {
        shuffleAndStartGame();
    }, [shuffleAndStartGame]);

    useEffect(() => {
        if (matched.length > 0 && matched.length === contentData.animals.length && !hasWon) {
            onGameWin();
            setHasWon(true);
        }
    }, [matched, onGameWin, hasWon]);

    const handleCardClick = (clickedCard) => {
        if (isDisabled || flipped.length === 2 || flipped.some(c => c.id === clickedCard.id) || matched.includes(clickedCard.textKey)) {
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

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            {hasWon ? (
                <div className="text-center flex flex-col items-center">
                    <StarIcon className="w-24 h-24 text-yellow-400 mb-4" />
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