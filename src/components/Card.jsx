import React from 'react';


const Card = ({ item, isFlipped, onClick }) => {
    const cardSideBaseStyle = "absolute w-full h-full rounded-lg shadow-lg backface-hidden flex items-center justify-center";

    return (
        <div className="group h-full w-full aspect-square [perspective:1000px]" onClick={onClick}>
            <div className={`relative h-full w-full rounded-lg shadow-md transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
                <div className={`${cardSideBaseStyle} bg-sky-500 border-4 border-white`}></div>
                <div className={`${cardSideBaseStyle} bg-sky-50 [transform:rotateY(180deg)]`}>
                    <img src={item.image} alt={item.textKey} className="max-w-[90%] max-h-[90%] object-contain" />
                </div>
            </div>
        </div>
    );
};

Card.displayName = 'Card';

export default Card;