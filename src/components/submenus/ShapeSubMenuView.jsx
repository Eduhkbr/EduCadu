import React from 'react';
import { useTranslation } from 'react-i18next';
import MenuButton from '../MenuButton.jsx';

const ShapeSubMenuView = ({ onSelectActivity, onGoHome }) => {
    const { t } = useTranslation();
    return (
        <div className="w-full h-full flex flex-col items-center justify-center px-2 py-4">
            <h1 className="text-5xl md:text-7xl font-black text-center text-[var(--text-color)] mb-8" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>{t('category_shapes')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <MenuButton
                    bgColor="bg-green-500"
                    icon={<span className="text-6xl">🧩</span>}
                    title={t('puzzle_game_title')}
                    onClick={() => onSelectActivity('shape_puzzle_game')}
                />
                <MenuButton
                    bgColor="bg-sky-400"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2,2,22H22Z"/></svg>}
                    title={t('meet_the_shapes_title')}
                    onClick={() => onSelectActivity('shapes')}
                />
            </div>
            <div className="w-full max-w-md mt-10 flex justify-center">
                <button onClick={onGoHome} className="nav-button bg-white rounded-full p-5 shadow-lg text-gray-700 min-w-[44px] min-h-[44px]" aria-label={t('go_home')} tabIndex={0}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>
                </button>
            </div>
        </div>
    );
};

export default ShapeSubMenuView;