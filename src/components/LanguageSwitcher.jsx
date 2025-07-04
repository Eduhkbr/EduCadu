import React from 'react';
import {useTranslation} from "react-i18next";

const LanguageSwitcher = ({ currentTheme }) => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const textColorClass = currentTheme === 'high-contrast' ? 'text-white' : 'text-gray-700';

    return (
        <div className={`absolute top-4 right-4 flex space-x-2 font-bold ${textColorClass}`}>
            <button onClick={() => changeLanguage('pt')} className={`p-2 rounded-full transition-transform transform hover:scale-110 ${i18n.language === 'pt' ? 'opacity-100' : 'opacity-50'}`}>Português</button>
            <span className="p-2">/</span>
            <button onClick={() => changeLanguage('en')} className={`p-2 rounded-full transition-transform transform hover:scale-110 ${i18n.language === 'en' ? 'opacity-100' : 'opacity-50'}`}>Inglês</button>
        </div>
    );
};

export default LanguageSwitcher;