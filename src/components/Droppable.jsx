import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const Droppable = ({ id, children, className }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    const style = {
        border: isOver ? '2px dashed #22c55e' : '2px dashed transparent',
        borderRadius: '1rem',
    };

    return (
        <div ref={setNodeRef} style={style} className={className}>
            {children}
        </div>
    );
};

export default Droppable;