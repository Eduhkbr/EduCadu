import React, { useState, useEffect, useMemo } from 'react';
import { 
    DndContext, 
    PointerSensor, 
    TouchSensor, 
    useSensor, 
    useSensors, 
    closestCenter 
} from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import Draggable from './Draggable';
import Droppable from './Droppable';
import contentData from '../data/contentData';
import StarIcon from './StarIcon';
import speechApi from '../services/speechApi';

const AlphabetDragGameView = ({ onGoHome, onGameWin }) => {
    const { t, i18n } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isCorrect, setIsCorrect] = useState(null);
    const [shuffledTargets, setShuffledTargets] = useState([]);

    // Configuração de sensores otimizada
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1, // Ativa o arrasto com o menor movimento
            }
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 0,
                distance: 1, // Ativa o arrasto com o menor movimento
                tolerance: 5
            }
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

        const instruction = t('drag_the_letter_instruction', { letter: currentItem.display });
        speechApi.speak(instruction, i18n.language === 'pt' ? 'pt-BR' : 'en-US');

    }, [currentIndex, currentItem, t, i18n.language]);

    const handleNext = () => {
        if (currentIndex < contentData.abc.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onGameWin();
            onGoHome();
        }
    };

    function handleDragEnd(event) {
        const { active, over } = event;

        if (over && active) {
            if (over.id === active.id) {
                setIsCorrect(true);
            } else {
                setIsCorrect(false);
                setTimeout(() => setIsCorrect(null), 1000); // Reseta após 1s
            }
        }
    }

    // Adiciona preventDefault para eventos de toque
    useEffect(() => {
        const preventDefault = (e) => {
            e.preventDefault();
        };

        document.addEventListener('touchstart', preventDefault, { passive: false });
        document.addEventListener('touchmove', preventDefault, { passive: false });

        return () => {
            document.removeEventListener('touchstart', preventDefault);
            document.removeEventListener('touchmove', preventDefault);
        };
    }, []);

    return (
        <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div 
                className="w-full h-full flex flex-col items-center justify-between text-center p-4"
                style={{
                    touchAction: 'none', // Impede scroll e zoom
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                }}
            >
                {/* Área de Arrastar (a letra) */}
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold text-[var(--text-color)] mb-4">
                        {t('drag_the_letter_instruction', { letter: currentItem.display })}
                    </p>
                    <Draggable id={currentItem.display}>
                        <div 
                            className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center text-6xl font-black text-sky-600 cursor-grab active:cursor-grabbing"
                            style={{
                                touchAction: 'none',
                                userSelect: 'none'
                            }}
                        >
                            {currentItem.display}
                        </div>
                    </Draggable>
                </div>
            </div>
        </DndContext>
    );
};

export default AlphabetDragGameView;
