import React from 'react';
import { useTranslation } from 'react-i18next';
import MenuButton from './MenuButton.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

const MenuView = ({ onSelectCategory }) => {
    const { t } = useTranslation();
    return (
        <div className="relative">
            <LanguageSwitcher />
            <h1 className="text-5xl md:text-7xl font-black text-center text-sky-700 mb-8 pt-16">{t('main_title')}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                <MenuButton bgColor="bg-red-400" icon="ABC" title={t('category_alphabet')} onClick={() => onSelectCategory('abc')} />
                <MenuButton bgColor="bg-blue-400" icon="123" title={t('category_numbers')} onClick={() => onSelectCategory('123')} />
                <MenuButton bgColor="bg-yellow-400" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2ZM6,12A6,6,0,0,1,12,6a5.91,5.91,0,0,1,1.76.28L12,8,9,11l4,4,1.72-1.72A5.91,5.91,0,0,1,18,12a6,6,0,0,1-6,6A6,6,0,0,1,6,12Z"/></svg>} title={t('category_colors')} onClick={() => onSelectCategory('colors')} />
                <MenuButton bgColor="bg-green-400" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2,2,22H22Z"/></svg>} title={t('category_shapes')} onClick={() => onSelectCategory('shapes')} />
                <MenuButton bgColor="bg-orange-400" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.2,3.35a1,1,0,0,0-1.41,0L5.32,10.82A8.33,8.33,0,0,0,3,16.21V18a1,1,0,0,0,1,1H6.22a8.3,8.3,0,0,0,5.39-2.32l7.47-7.47a1,1,0,0,0,0-1.41ZM8.82,17.18a6.34,6.34,0,0,1-4.24-1.76A6.6,6.6,0,0,1,4,12.34l1.88-1.88L9.7,14.29Zm10.6-9L17.54,10,14,6.46l1.88-1.88a3.13,3.13,0,0,1,4.42,4.42Z"/></svg>} title={t('category_animals')} onClick={() => onSelectCategory('animals')} />
            </div>
        </div>
    );
};

export default MenuView;