import React, { useState, useEffect, useMemo } from 'react';
import { DndContext, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import Draggable from './Draggable';
import Droppable from './Droppable';
import contentData from '../data/contentData';
import StarIcon from './StarIcon';

const AlphabetDragGameView = ({ onGoHome, onGameWin }) => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null); // null, true, or false
    const [shuffledTargets, setShuffledTargets] = useState([]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        })
    );

    const currentItem = contentData.abc[currentIndex];

    // Prepara as opções de alvo (uma correta, duas incorretas)
    useEffect(() => {
        const incorrectItems = contentData.abc
            .filter(item => item.display !== currentItem.display)
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);

        const targets = [currentItem, ...incorrectItems].sort(() => 0.5 - Math.random());
        setShuffledTargets(targets);
        setIsCorrect(null);
    }, [currentIndex, currentItem]);

    const handleNext = () => {
        if (currentIndex < contentData.abc.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onGameWin();
            onGoHome();
        }
    };

    function handleDragEnd(event) {
        if (event.over) {
            if (event.over.id === event.active.id) {
                setIsCorrect(true);
            } else {
                setIsCorrect(false);
                setTimeout(() => setIsCorrect(null), 1000); // Reseta após 1s
            }
        }
    }

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="w-full h-full flex flex-col items-center justify-between text-center p-4">
                {/* Área de Arrastar (a letra) */}
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold text-[var(--text-color)] mb-4">{t('drag_the_letter')}</p>
                    <Draggable id={currentItem.display}>
                        <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center text-6xl font-black text-sky-600 cursor-grab active:cursor-grabbing">
                            {currentItem.display}
                        </div>
                    </Draggable>
                </div>

                {/* Mensagem de Feedback */}
                <div className="h-16 flex items-center">
                    {isCorrect === true && <p className="text-3xl font-bold text-green-500">{t('correct')}</p>}
                    {isCorrect === false && <p className="text-3xl font-bold text-red-500">{t('try_again')}</p>}
                </div>

                {/* Área de Soltar (as imagens) */}
                <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
                    {shuffledTargets.map(target => (
                        <Droppable key={target.display} id={target.display} className="aspect-square">
                            <div className="bg-white w-full h-full rounded-2xl shadow-lg p-2 flex flex-col items-center justify-center">
                                <img src={target.image} alt={t(target.textKey)} className="max-w-full max-h-24 object-contain" />
                                <p className="text-xl font-bold mt-2 text-gray-700">{t(target.textKey)}</p>
                            </div>
                        </Droppable>
                    ))}
                </div>

                {/* Botões de Navegação */}
                <div className="w-full max-w-md mt-6 flex justify-around items-center">
                    <button onClick={onGoHome} className="nav-button bg-white rounded-full p-5 shadow-lg text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>
                    </button>
                    {isCorrect && (
                        <button onClick={handleNext} className="bg-green-500 text-white font-bold py-4 px-8 rounded-full shadow-lg text-2xl">
                            {currentIndex === contentData.abc.length - 1 ? <StarIcon className="w-8 h-8"/> : t('next')}
                        </button>
                    )}
                </div>
            </div>
        </DndContext>
    );
};

export default AlphabetDragGameView;