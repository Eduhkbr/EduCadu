import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import contentData from '../data/contentData';
import speechApi from '../services/speechApi';
import './ColorPopGame.css';

const ColorPopGameView = ({ onGoHome, onGameWin }) => {
    const { t, i18n } = useTranslation();
    const [targetColor, setTargetColor] = useState(null);
    const [balloons, setBalloons] = useState([]);
    const [popped, setPopped] = useState([]);

    const generateNewRound = useCallback(() => {
        const colors = contentData.colors;
        const newTarget = colors[Math.floor(Math.random() * colors.length)];
        const shuffledBalloons = [...colors].sort(() => 0.5 - Math.random());

        setTargetColor(newTarget);
        setBalloons(shuffledBalloons);
        setPopped([]);

        const instruction = t('pop_the_balloon_instruction', { color: t(newTarget.textKey) });
        speechApi.speak(instruction, i18n.language === 'pt' ? 'pt-BR' : 'en-US');
    }, [i18n.language, t]);

    useEffect(() => {
        generateNewRound();
    }, [generateNewRound]);

    const handleBalloonClick = (clickedBalloon) => {
        if (clickedBalloon.display === targetColor.display) {
            setPopped([clickedBalloon.display]);
            onGameWin();
            setTimeout(() => {
                generateNewRound();
            }, 1000); // Gera nova rodada após 1s
        } else {
            const instruction = t('try_again');
            speechApi.speak(instruction, i18n.language === 'pt' ? 'pt-BR' : 'en-US');
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-3xl font-bold text-[var(--text-color)] mb-8">
                {t('pop_the_balloon_instruction', { color: targetColor ? t(targetColor.textKey) : '' })}
            </h2>

            <div className="flex justify-center items-center gap-8 flex-wrap min-h-[250px]">
                {balloons.map(balloon => (
                    <div
                        key={balloon.display}
                        className={`balloon ${popped.includes(balloon.display) ? 'popped' : ''}`}
                        style={{ backgroundColor: balloon.display, animationDelay: `${Math.random() * 2}s` }}
                        onClick={() => handleBalloonClick(balloon)}
                    />
                ))}
            </div>

            <div className="w-full max-w-md mt-6">
                <button onClick={onGoHome} className="nav-button bg-white rounded-full p-5 shadow-lg text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>
                </button>
            </div>
        </div>
    );
};

export default ColorPopGameView;