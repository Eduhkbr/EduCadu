import React from 'react';
import StarIcon from './StarIcon';

const MenuButton = ({ bgColor, icon, title, onClick, isComplete }) => (
    <div
        onClick={onClick}
        className={`main-button aspect-square ${bgColor} rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer text-white p-4 transition-transform transform hover:scale-105 relative`}
        style={{ minWidth: 64, minHeight: 64, touchAction: 'manipulation' }}
        tabIndex={0}
        role="button"
        aria-label={title}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
        {isComplete && (
            <div className="absolute top-2 right-2 z-10">
                <StarIcon className="w-8 h-8 text-yellow-400" />
            </div>
        )}
        <div className="text-6xl md:text-8xl font-black pointer-events-none select-none flex items-center justify-center" style={{ minHeight: 44, minWidth: 44 }}>{icon}</div>
        <div className="text-xl md:text-2xl font-bold mt-2 pointer-events-none select-none" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>{title}</div>
    </div>
);

export default MenuButton;