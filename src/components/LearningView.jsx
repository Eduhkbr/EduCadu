import React, {useState, useEffect, useMemo} from 'react';
import { useTranslation } from 'react-i18next';
import contentData from '../data/contentData.jsx';
import speechApi from '../services/speechApi.jsx';

const LearningView = ({ category, onGoHome }) => {
    const { t, i18n } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const categoryData = contentData[category];
    const currentItem = categoryData[currentIndex];

    const getTextToSpeak = useMemo(() => {
        const word = t(currentItem.textKey);

        // Se não for a categoria do alfabeto, fala apenas a palavra
        if (category !== 'abc') {
            return word;
        }

        // Se for inglês, verifica a primeira letra da palavra
        if (i18n.language === 'en') {
            const firstLetter = word.charAt(0).toLowerCase();
            const vowels = ['a', 'e', 'i', 'o', 'u'];
            if (vowels.includes(firstLetter)) {
                return t('speech_template_vowel', { letter: currentItem.display, word: word });
            }
            return t('speech_template_consonant', { letter: currentItem.display, word: word });
        }

        // Para português ou outros idiomas, usa o template padrão
        return t('speech_template_letter', { letter: currentItem.display, word: word });

    }, [category, currentItem, i18n.language, t]);

    useEffect(() => {
        speechApi.speak(getTextToSpeak, i18n.language === 'pt' ? 'pt-BR' : 'en-US');
    }, [getTextToSpeak, i18n.language]);

    const goToNext = () => setCurrentIndex((prev) => (prev + 1) % categoryData.length);
    const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + categoryData.length) % categoryData.length);

    const cardStyle = {
        backgroundColor: 'var(--card-bg)',
        ...(category === 'colors' ? { backgroundColor: currentItem.display } : {})
    };

    const textStyle = {
        color: 'var(--text-color)',
        ...(category === 'colors' && ['#000000', '#9C27B0', '#F44336', '#2196F3'].includes(currentItem.display) ? { color: 'white' } : {})
    };

    const displayText = t(currentItem.textKey);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <div style={cardStyle} className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 flex-grow flex flex-col justify-between transition-colors duration-300">
                <div className="flex-grow flex flex-col items-center justify-center">
                    {category !== 'colors' && <div className={`font-black text-[var(--text-color)] ${category === 'animals' ? 'text-8xl' : 'text-9xl'}`}>{currentItem.displayKey ? t(currentItem.displayKey) : currentItem.display}</div>}
                    {currentItem.image && <img src={currentItem.image} alt={displayText} className="my-4 max-h-60 h-auto rounded-xl" />}
                    <div style={textStyle} className="text-5xl font-bold text-gray-700">{displayText}</div>
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={() => speechApi.speak(getTextToSpeak, i18n.language === 'pt' ? 'pt-BR' : 'en-US')} className="nav-button bg-pink-500 text-white rounded-full p-4 shadow-lg transition-transform transform active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M3,9V15H7L12,20V4L7,9H3M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12Z"/></svg>
                    </button>
                </div>
            </div>
            <div className="w-full max-w-md mt-6 flex justify-between items-center">
                <button onClick={goToPrev} className="nav-button bg-white rounded-full p-4 shadow-lg text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/></svg>
                </button>
                <button onClick={onGoHome} className="nav-button bg-white rounded-full p-5 shadow-lg text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>
                </button>
                <button onClick={goToNext} className="nav-button bg-white rounded-full p-4 shadow-lg text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                </button>
            </div>
        </div>
    );
};

export default LearningView;