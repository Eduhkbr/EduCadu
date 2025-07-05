import React, { useState, useEffect, useCallback } from 'react';
// 1. Importe MouseSensor e TouchSensor, em vez de PointerSensor
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import Draggable from './Draggable.jsx';
import DroppableShape from './DroppableShape.jsx';
import speechApi from '../services/speechApi.jsx';

// ... (o restante do seu componente DraggableShape permanece o mesmo)
const DraggableShape = ({ shape, color }) => {
    const baseStyle = { width: '100%', height: '100%' };
    const shapeStyles = {
        circle: { borderRadius: '50%' },
        square: { borderRadius: '0' },
        triangle: {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderLeft: '50px solid transparent',
            borderRight: '50px solid transparent',
            borderBottom: `100px solid ${color}`,
        },
    };
    const finalStyle = shape === 'triangle'
        ? { ...baseStyle, ...shapeStyles.triangle }
        : { ...baseStyle, ...shapeStyles[shape], backgroundColor: color };
    return <div style={finalStyle} />;
}


const ShapePuzzleGameView = ({ onGoHome, onGameWin }) => {
    const { t, i18n } = useTranslation();
    const [shapes, setShapes] = useState([]);
    const [targetShape, setTargetShape] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [gameKey, setGameKey] = useState(0);

    const colors = ['#f87171', '#60a5fa', '#facc15'];
    const shapeNames = ['circle', 'square', 'triangle'];

    const generateNewRound = useCallback(() => {
        const newTarget = shapeNames[Math.floor(Math.random() * shapeNames.length)];
        const shuffledShapes = shapeNames
            .sort(() => 0.5 - Math.random())
            .map((name, index) => ({
                name: name,
                color: colors[index]
            }));

        setTargetShape(newTarget);
        setShapes(shuffledShapes);
        setIsCorrect(false);

        const instruction = t('puzzle_instruction', { shape: t(`shape_${newTarget}`) });
        setTimeout(() => {
            speechApi.speak(instruction, i18n.language === 'pt' ? 'pt-BR' : 'en-US');
        }, 1000);
    }, [t, i18n]);

    // 2. Configure os sensores para usar MouseSensor e TouchSensor
    const sensors = useSensors(
        useSensor(MouseSensor, {
            // Garante que o clique em botões dentro do arrastável ainda funcione
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            // Evita que o arraste comece imediatamente ao tocar, permitindo scroll
            activationConstraint: {
                delay: 25,
                tolerance: 5,
            },
        })
    );

    const handleWin = () => {
        onGameWin();
        setTimeout(() => {
            setGameKey(prev => prev + 1);
        }, 1500);
    };

    useEffect(() => {
        generateNewRound();
    }, [gameKey, generateNewRound]);

    function handleDragEnd(event) {
        const { active, over } = event;

        if (over && over.id === targetShape && active.id === targetShape) {
            speechApi.speak(t('correct'), i18n.language === 'pt' ? 'pt-BR' : 'en-US');
            setIsCorrect(true);
            handleWin();
        } else {
            speechApi.speak(t('try_again'), i18n.language === 'pt' ? 'pt-BR' : 'en-US');
        }
    }

    return (
        <DndContext
            key={gameKey}
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCenter}
        >
            <div className="w-full h-full flex flex-col items-center justify-between text-center p-4">
                <h2 className="text-3xl font-bold text-[var(--text-color)] mb-4 h-16">
                    {targetShape && t('puzzle_instruction', { shape: t(`shape_${targetShape}`) })}
                </h2>

                <div className="w-48 h-48 mb-8 flex items-center justify-center">
                    <DroppableShape
                        id={targetShape}
                        shape={targetShape}
                        color={isCorrect ? '#4ade80' : '#e5e7eb'}
                    />
                </div>

                <div className="flex justify-around items-center w-full max-w-2xl min-h-[120px]">
                    {shapes.map(shapeInfo => (
                        // A mágica acontece aqui dentro do componente Draggable
                        <Draggable key={shapeInfo.name} id={shapeInfo.name}>
                            <div className={`w-24 h-24 flex items-center justify-center cursor-grab active:cursor-grabbing transition-opacity duration-300 ${isCorrect && shapeInfo.name !== targetShape ? 'opacity-0' : 'opacity-100'}`}>
                                <DraggableShape shape={shapeInfo.name} color={shapeInfo.color} />
                            </div>
                        </Draggable>
                    ))}
                </div>

                <div className="w-full max-w-md mt-6 flex justify-around items-center h-24">
                    <button onClick={onGoHome} className="nav-button bg-white rounded-full p-5 shadow-lg text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>
                    </button>
                </div>
            </div>
        </DndContext>
    );
};

export default ShapePuzzleGameView;