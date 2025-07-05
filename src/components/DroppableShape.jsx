import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const DroppableShape = ({ id, shape, color }) => {
    const { isOver, setNodeRef } = useDroppable({ // 'isOver' agora vem direto do hook
        id: id,
    });

    const baseStyle = {
        width: '100%',
        height: '100%',
        transition: 'all 0.2s',
        border: isOver ? '5px dashed #22c55e' : '2px dashed #d1d5db',
        boxSizing: 'border-box',
    };

    const shapeStyles = {
        circle: { borderRadius: '50%' },
        square: { borderRadius: '0.5rem' },
        triangle: {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderLeft: '74px solid transparent',
            borderRight: '74px solid transparent',
            borderBottom: `148px solid ${color}`,
            borderTopWidth: 0,
            borderBottomLeftRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
        },
    };

    if (shape === 'triangle') {
        baseStyle.border = 'none';
        if(isOver) {
            shapeStyles.triangle.filter = 'drop-shadow(0px 6px 0px #22c55e)';
        }
    }

    const finalStyle = shape === 'triangle'
        ? { ...baseStyle, ...shapeStyles.triangle }
        : { ...baseStyle, ...shapeStyles[shape], backgroundColor: color };


    return <div ref={setNodeRef} style={finalStyle} />;
};

export default DroppableShape;