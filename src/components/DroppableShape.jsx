import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const DroppableShape = ({ id, shape, color, isOver }) => {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    // Estilo base para todas as formas
    const baseStyle = {
        width: '100%',
        height: '100%',
        transition: 'background-color 0.2s',
    };

    // Estilos específicos para cada forma
    const shapeStyles = {
        circle: { borderRadius: '50%' },
        square: { borderRadius: '0' },
        triangle: {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderLeft: '74px solid transparent',
            borderRight: '74px solid transparent',
            borderBottom: `148px solid ${color}`,
        },
    };

    // Aplica um contorno verde quando uma peça está sobre a área correta
    if (isOver) {
        if (shape === 'triangle') {
            shapeStyles.triangle.filter = 'drop-shadow(0 0 5px #22c55e)';
        } else {
            baseStyle.boxShadow = '0 0 0 5px #22c55e';
        }
    }

    // Combina os estilos
    const finalStyle = shape === 'triangle'
        ? { ...baseStyle, ...shapeStyles.triangle }
        : { ...baseStyle, ...shapeStyles[shape], backgroundColor: color };

    return <div ref={setNodeRef} style={finalStyle} />;
};

export default DroppableShape;