import React from 'react';
import { useTranslation } from 'react-i18next';
import MenuButton from './MenuButton.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import SettingsButton from './SettingsButton.jsx';
import animalsIcon from '../assets/img/animals.png';
import colorsIcon from '../assets/img/colors.png';

const MenuView = ({ onSelectCategory, onGoToSettings, currentTheme, rewards }) => {
    const { t } = useTranslation();
    return (
        <div className="relative">
            <SettingsButton onClick={onGoToSettings} />
            <LanguageSwitcher currentTheme={currentTheme} />
            <h1 className="text-5xl md:text-7xl font-black text-center text-[var(--text-color)] mb-8 pt-16">{t('main_title')}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                <MenuButton bgColor="bg-red-400" icon="ABC" title={t('category_alphabet')} onClick={() => onSelectCategory('alphabet_submenu')}
                            isComplete={rewards.alphabet_drag_game} />
                <MenuButton
                    bgColor="bg-blue-400"
                    icon="123"
                    title={t('category_numbers')}
                    onClick={() => onSelectCategory('number_submenu')}
                    isComplete={rewards.number_count_game}/>
                <MenuButton
                    bgColor="bg-green-400"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2,2,22H22Z"/></svg>}
                    title={t('category_shapes')}
                    onClick={() => onSelectCategory('shape_submenu')}
                    isComplete={rewards.shape_puzzle_game}
                />
                <MenuButton
                    bgColor="bg-yellow-400"
                    icon={<img src={colorsIcon} alt="Colors Icon" className="h-16 w-16 md:h-24 md:w-24 object-contain"/>}
                    title={t('category_colors')}
                    onClick={() => onSelectCategory('color_submenu')}
                    isComplete={rewards.color_pop_game}/>
                <MenuButton
                    bgColor="bg-orange-400"
                    icon={<img src={animalsIcon} alt="Animals Icon" className="h-16 w-16 md:h-24 md:w-24 object-contain"/>}
                    title={t('category_animals')}
                    onClick={() => onSelectCategory('animals_submenu')}
                    isComplete={rewards.animals_game}/>
            </div>
        </div>
    );
};

export default MenuView;