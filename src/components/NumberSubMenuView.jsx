import React from 'react';
import { useTranslation } from 'react-i18next';
import MenuButton from './MenuButton.jsx';

const NumberSubMenuView = ({ onSelectActivity, onGoHome }) => {
    const { t } = useTranslation();
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-7xl font-black text-center text-[var(--text-color)] mb-8">{t('category_numbers')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
                <MenuButton
                    bgColor="bg-blue-400"
                    icon={<span className="text-6xl">🖐️</span>}
                    title={t('counting_game_title')}
                    onClick={() => onSelectActivity('number_count_game')}
                />
                <MenuButton
                    bgColor="bg-sky-400"
                    icon="123"
                    title={t('meet_the_numbers_title')}
                    onClick={() => onSelectActivity('123')}
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

export default NumberSubMenuView;