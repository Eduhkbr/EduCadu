import React, { forwardRef } from 'react';
import { useDraggable } from '@dnd-kit/core';

const Draggable = forwardRef(({ id, children }, ref) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });

    const style = transform
        ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            touchAction: 'none',
        }
        : undefined;

    return (
        <div ref={(node) => {
            setNodeRef(node);
            if (ref) {
                ref.current = node;
            }
        }} style={style} {...attributes} {...listeners}>
            {children}
        </div>
    );
});

export default Draggable;