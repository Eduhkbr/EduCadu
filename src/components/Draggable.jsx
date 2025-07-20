import React, { forwardRef } from 'react';
import { useDraggable } from '@dnd-kit/core';

const Draggable = forwardRef(({ id, children }, ref) => {
    const { 
        attributes, 
        listeners, 
        setNodeRef, 
        transform 
    } = useDraggable({
        id,
        // Configuração para garantir que o arrasto funcione com o menor movimento
        activationConstraint: {
            distance: 1
        }
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            touchAction: 'none', // Impede interferências do navegador
            position: 'relative',
            zIndex: 10
        }
        : { 
            touchAction: 'none',
            position: 'relative',
            zIndex: 1
        };

    return (
        <div 
            ref={(node) => {
                setNodeRef(node);
                if (ref) {
                    ref.current = node;
                }
            }} 
            style={style} 
            {...attributes} 
            {...listeners}
        >
            {children}
        </div>
    );
});

export default Draggable;