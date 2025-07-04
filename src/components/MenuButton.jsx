import React from 'react';
import StarIcon from './StarIcon';

const MenuButton = ({ bgColor, icon, title, onClick, isComplete }) => (
    <div onClick={onClick} className={`main-button aspect-square ${bgColor} rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer text-white p-4 transition-transform transform hover:scale-105`}>
        {isComplete && (
            <div className="absolute top-2 right-2 z-10">
                <StarIcon className="w-8 h-8 text-yellow-400" />
            </div>
        )}
        <div className="text-6xl md:text-8xl font-black">{icon}</div>
        <div className="text-xl md:text-2xl font-bold">{title}</div>
    </div>
);

export default MenuButton;