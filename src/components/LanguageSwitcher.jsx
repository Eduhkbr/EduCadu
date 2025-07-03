import React from 'react';
import {useTranslation} from "react-i18next";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="absolute top-4 right-4 flex space-x-2">
            <button onClick={() => changeLanguage('pt')} className={`p-2 rounded-full transition-transform transform hover:scale-110 ${i18n.language === 'pt' ? 'opacity-100' : 'opacity-50'}`}>🇧🇷</button>
            <button onClick={() => changeLanguage('en')} className={`p-2 rounded-full transition-transform transform hover:scale-110 ${i18n.language === 'en' ? 'opacity-100' : 'opacity-50'}`}>🇺🇸</button>
        </div>
    );
};

export default LanguageSwitcher;