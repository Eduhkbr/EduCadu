import React from 'react';
import { useTranslation } from 'react-i18next';

const SettingsView = ({ settings, onUpdateSettings, onGoHome }) => {
    const { t } = useTranslation();

    const handleThemeChange = (theme) => {
        onUpdateSettings('theme', theme);
    };

    const handleSoundToggle = () => {
        onUpdateSettings('soundEnabled', !settings.soundEnabled);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
                <h1 className="text-4xl font-black text-sky-700 mb-8">{t('settings_title')}</h1>

                {/* Controle de Som */}
                <div className="setting-row flex justify-between items-center mb-6">
                    <span className="text-xl font-bold text-gray-700">{t('sound_control')}</span>
                    <button onClick={handleSoundToggle} className={`p-2 rounded-full transition-colors ${settings.soundEnabled ? 'bg-green-500' : 'bg-red-500'}`}>
                        {settings.soundEnabled ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.88 5.88a15 15 0 00-2.02 12.24M18.12 5.88A15 15 0 0120 12.06" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a2 2 0 01-2-2V11a2 2 0 012-2h1.586l4.707-4.707a1 1 0 011.414 0L14 6.586M17 14l-5-5" /></svg>
                        )}
                    </button>
                </div>

                {/* Seletor de Tema */}
                <div className="setting-row">
                    <span className="text-xl font-bold text-gray-700 block mb-4">{t('color_theme')}</span>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleThemeChange('default')} className="theme-button p-4 rounded-lg bg-sky-100 text-sky-800 font-bold">{t('theme_default')}</button>
                        <button onClick={() => handleThemeChange('calm')} className="theme-button p-4 rounded-lg bg-gray-200 text-gray-800 font-bold">{t('theme_calm')}</button>
                        <button onClick={() => handleThemeChange('high-contrast')} className="theme-button p-4 rounded-lg bg-black text-white font-bold">{t('theme_high_contrast')}</button>
                    </div>
                </div>
            </div>
            <div className="w-full max-w-md mt-6">
                <button onClick={onGoHome} className="nav-button bg-white rounded-full p-5 shadow-lg text-gray-700 transition-transform transform active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor"><path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/></svg>
                </button>
            </div>
        </div>
    );
};

export default SettingsView;