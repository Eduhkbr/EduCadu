import React from 'react';
import { useTranslation } from 'react-i18next';
import MenuButton from './MenuButton.jsx';

const ColorSubMenuView = ({ onSelectActivity, onGoHome }) => {
    const { t } = useTranslation();
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-black text-center text-[var(--text-color)] mb-8">{t('category_colors')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                <MenuButton
                    bgColor="bg-pink-400"
                    icon={<span className="text-6xl">🎈</span>}
                    title={t('pop_the_balloon_title')}
                    onClick={() => onSelectActivity('color_pop_game')}
                />
                <MenuButton
                    bgColor="bg-sky-400"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2ZM6,12A6,6,0,0,1,12,6a5.91,5.91,0,0,1,1.76.28L12,8,9,11l4,4,1.72-1.72A5.91,5.91,0,0,1,18,12a6,6,0,0,1-6,6A6,6,0,0,1,6,12Z"/></svg>}
                    title={t('meet_the_colors_title')}
                    onClick={() => onSelectActivity('colors')}
                />
            </div>
            <div className="w-full max-w-md mt-10">
                <button onClick={onGoHome} className="nav-button bg-white rounded-full p-5 shadow-lg text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>
                </button>
            </div>
        </div>
    );
};

export default ColorSubMenuView;