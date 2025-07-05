import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import Draggable from './Draggable.jsx';
import DroppableShape from './DroppableShape.jsx';
import speechApi from '../services/speechApi.jsx';

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
    const [activeId, setActiveId] = useState(null);
    const [gameKey, setGameKey] = useState(0);

    const dropZoneRef = useRef(null);
    const dropZoneCenterRef = useRef(null);

    const colors = ['#f87171', '#60a5fa', '#facc15'];
    const shapeNames = ['circle', 'square', 'triangle'];

    const [draggableRefs] = useState(() => {
        const refs = {};
        shapeNames.forEach(name => {
            refs[name] = React.createRef();
        });
        return refs;
    });

    // Gerar nova rodada
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
        setActiveId(null);

        // Falar a instrução
        const instruction = t('puzzle_instruction', { shape: t(`shape_${newTarget}`) });
        setTimeout(() => {
            speechApi.speak(instruction, i18n.language === 'pt' ? 'pt-BR' : 'en-US');
        }, 2000);
    }, [t, i18n, shapeNames, colors]);

    // Calcular centro da zona de drop
    const calculateDropZone = useCallback(() => {
        if (!dropZoneRef.current) return;

        // Calcular posição absoluta do centro
        const rect = dropZoneRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        dropZoneCenterRef.current = { x: centerX, y: centerY };
    }, []);

    // Efeito para calcular zona de drop
    useEffect(() => {
        const timer = setTimeout(() => {
            calculateDropZone();
        }, 300);

        const handleResize = () => calculateDropZone();
        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateDropZone, targetShape]);

    const isNearDropZone = (dragEndPosition) => {
        if (!dropZoneRef.current) {
            return false;
        }
        const dropZoneRect = dropZoneRef.current.getBoundingClientRect();
        return (
            dragEndPosition.x >= dropZoneRect.left &&
            dragEndPosition.x <= dropZoneRect.right &&
            dragEndPosition.y >= dropZoneRect.top &&
            dragEndPosition.y <= dropZoneRect.bottom
        );
    };

    // Sensores para arrastar e soltar (AQUI ESTÁ A MUDANÇA)
    const sensors = useSensors(
        useSensor(MouseSensor, {
            // Requer que o mouse se mova 8px antes de ativar
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            // Requer um atraso de 250ms e um movimento de 5px para o toque
            activationConstraint: {
                delay: 25,
                tolerance: 5,
            },
        })
    );

    const handleWin = () => {
        setGameKey(prev => prev + 1);
        setTimeout(() => {
            generateNewRound();
            onGameWin();
        }, 500);
    };

    useEffect(() => {
        generateNewRound();
    }, []);

    return (
        <DndContext
            key={gameKey}
            sensors={sensors}
            onDragStart={({ active }) => {
                setActiveId(active.id);
            }}
            onDragEnd={({ active }) => {
                const draggedElementRef = draggableRefs[active.id];
                let finalPosition = { x: 0, y: 0 };

                if (draggedElementRef.current) {
                    const rect = draggedElementRef.current.getBoundingClientRect();
                    finalPosition = {
                        x: rect.left + (rect.width / 2),
                        y: rect.top + (rect.height / 2)
                    };
                }

                const isCorrectPiece = active.id === targetShape;
                const isNearTarget = isNearDropZone(finalPosition);

                if (isCorrectPiece && isNearTarget) {
                    speechApi.speak(t('correct'), i18n.language === 'pt' ? 'pt-BR' : 'en-US');
                    setIsCorrect(true);
                    handleWin();
                } else {
                    setTimeout(() => {
                        speechApi.speak(t('try_again'), i18n.language === 'pt' ? 'pt-BR' : 'en-US');
                    }, 100);
                }
            }}
        >
            <div className="w-full h-full flex flex-col items-center justify-between text-center p-4">
                <h2 className="text-3xl font-bold text-[var(--text-color)] mb-4">
                    {t('puzzle_instruction', { shape: targetShape ? t(`shape_${targetShape}`) : '' })}
                </h2>

                <div
                    ref={dropZoneRef}
                    className="w-48 h-48 mb-8 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-dashed border-gray-300"
                >
                    <DroppableShape
                        id={targetShape}
                        shape={targetShape}
                        color={isCorrect ? '#4ade80' : '#e5e7eb'}
                        isOver={activeId === targetShape}
                    />
                </div>

                <div className="flex justify-around items-center w-full max-w-2xl min-h-[100px]">
                    {shapes.map(shapeInfo => (
                        <Draggable key={shapeInfo.name} id={shapeInfo.name} ref={draggableRefs[shapeInfo.name]}>
                            <div className="w-24 h-24 flex items-center justify-center cursor-grab active:cursor-grabbing">
                                <DraggableShape shape={shapeInfo.name} color={shapeInfo.color} />
                            </div>
                        </Draggable>
                    ))}
                </div>

                <div className="w-full max-w-md mt-6 flex justify-around items-center">
                    <button onClick={onGoHome} className="nav-button bg-white rounded-full p-5 shadow-lg text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>
                    </button>
                    {isCorrect && (
                        <button onClick={generateNewRound} className="bg-green-500 text-white font-bold py-4 px-8 rounded-full shadow-lg text-2xl">
                            {t('next')}
                        </button>
                    )}
                </div>
            </div>
        </DndContext>
    );
};

export default ShapePuzzleGameView;