import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import contentData from '../data/contentData';
import speechApi from '../services/speechApi';

const NumberCountGameView = ({ onGoHome, onGameWin }) => {
    const { t, i18n } = useTranslation();
    const [currentNumber, setCurrentNumber] = useState(0);
    const [options, setOptions] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [completedRounds, setCompletedRounds] = useState(0);

    const countingItem = contentData.counting_item;

    const levelRanges = {
        1: { min: 1, max: 10 },
        2: { min: 1, max: 15 },
        3: { min: 1, max: 20 }
    };

    const roundsToComplete = 5;

    const generateNewRound = () => {
        const { min, max } = levelRanges[currentLevel];

        const newCorrectNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        const incorrectOptions = new Set();
        while (incorrectOptions.size < 2) {
            const randomIncorrect = Math.floor(Math.random() * (max - min + 1)) + min;
            if (randomIncorrect !== newCorrectNumber) {
                incorrectOptions.add(randomIncorrect);
            }
        }

        const newOptions = [newCorrectNumber, ...incorrectOptions].sort(() => 0.5 - Math.random());
        setCurrentNumber(newCorrectNumber);
        setOptions(newOptions);
        setIsCorrect(null);
    };

    useEffect(() => {
        if (currentNumber === 0) {
            generateNewRound();
        }

        const instruction = t('how_many_items');
        speechApi.speak(instruction, i18n.language === 'pt' ? 'pt-BR' : 'en-US');

    }, [currentNumber, t, i18n.language, currentLevel]);

    const handleAnswerClick = (selectedNumber) => {
        if (isCorrect) return;

        if (selectedNumber === currentNumber) {
            setIsCorrect(true);
            setCompletedRounds(prev => prev + 1); // Incrementa as rodadas completadas

            if (completedRounds + 1 >= roundsToComplete) {
                setCompletedRounds(0);
                setCurrentLevel(prev => (prev < 3 ? prev + 1 : prev)); // Não além do nível 3
            }
            onGameWin();
        } else {
            setIsCorrect(false);
            setTimeout(() => setIsCorrect(null), 1000);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-between text-center p-4">
            <div>
                <p className="text-3xl font-bold text-[var(--text-color)] mb-4">
                    {t('how_many_items')} - {t('level')} {currentLevel}
                </p>
                <div className="grid grid-cols-3 gap-2 p-4 bg-white rounded-2xl shadow-lg min-h-[200px] items-center">
                    {Array.from({ length: currentNumber }).map((_, i) => (
                        <img key={i} src={countingItem.image} alt={countingItem.alt} className="w-16 h-16 object-contain" />
                    ))}
                </div>
            </div>

            <div className="h-16 flex items-center">
                {isCorrect === true && <p className="text-3xl font-bold text-green-500">{t('correct')}</p>}
                {isCorrect === false && <p className="text-3xl font-bold text-red-500">{t('try_again')}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                {options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleAnswerClick(option)}
                        className="bg-white aspect-square rounded-2xl shadow-lg flex items-center justify-center text-6xl font-black text-blue-600 transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50"
                        disabled={isCorrect !== null}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="w-full max-w-md mt-6 flex justify-around items-center">
                <button onClick={onGoHome} className="nav-button bg-white rounded-full p-5 shadow-lg text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>
                    </svg>
                </button>
                {isCorrect && (
                    <button
                        onClick={generateNewRound}
                        className="bg-green-500 text-white font-bold py-4 px-8 rounded-full shadow-lg text-2xl"
                    >
                        {completedRounds + 1 < roundsToComplete ? t('next_round') : t('finish_level')}
                    </button>
                )}
            </div>
        </div>
    );
};

export default NumberCountGameView;