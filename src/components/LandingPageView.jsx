import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import './LandingPageView.css';

const HighlightIcon = ({ children, color }) => (
    <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-${color}-100 text-${color}-600`}>
        {children}
    </div>
);

const LandingPageView = ({ onStart, currentTheme }) => {
    const { t } = useTranslation();

    return (
        <div className="w-full text-center text-[var(--text-color)]">
            <LanguageSwitcher currentTheme={currentTheme} />

            {/* Seção Principal (Hero) */}
            <header className="py-16 md:py-24">
                <h1 className="text-4xl font-black text-pink-500 md:text-6xl">{t('landing_title')}</h1>
                <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl">{t('landing_subtitle')}</p>
                <button
                    onClick={onStart}
                    className="mt-8 rounded-full bg-pink-500 px-10 py-4 text-xl font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                    {t('landing_cta')}
                </button>
            </header>

            <main>
                {/* Seção de Funcionalidades */}
                <section className="py-12 bg-[var(--card-bg)] rounded-3xl shadow-inner">
                    <div className="mx-auto max-w-5xl px-4">
                        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                            <div className="p-4">
                                <HighlightIcon color="blue">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                </HighlightIcon>
                                <h3 className="mb-2 text-2xl font-bold">{t('landing_feature_pwa_title')}</h3>
                                <p>{t('landing_feature_pwa_desc')}</p>
                            </div>
                            <div className="p-4">
                                <HighlightIcon color="green">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                </HighlightIcon>
                                <h3 className="mb-2 text-2xl font-bold">{t('landing_feature_accessibility_title')}</h3>
                                <p>{t('landing_feature_accessibility_desc')}</p>
                            </div>
                            <div className="p-4">
                                <HighlightIcon color="yellow">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m4 13-4-4m0 0l4-4m-4 4h12M3 17h12a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </HighlightIcon>
                                <h3 className="mb-2 text-2xl font-bold">{t('landing_feature_bilingual_title')}</h3>
                                <p>{t('landing_feature_bilingual_desc')}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Seção "Para Pais e Educadores" */}
                <section className="py-16 md:py-24">
                    <h2 className="text-3xl font-black text-sky-700 md:text-4xl">{t('landing_for_parents_title')}</h2>
                    <p className="mx-auto mt-4 max-w-3xl text-lg">{t('landing_for_parents_desc')}</p>
                    <div className="mt-8 flex justify-center gap-4 flex-wrap">
                        <span className="rounded-full bg-green-200 px-4 py-2 font-semibold text-green-800">{t('safety_badge_no_ads')}</span>
                        <span className="rounded-full bg-green-200 px-4 py-2 font-semibold text-green-800">{t('safety_badge_verified_content')}</span>
                    </div>
                </section>
            </main>

            <footer className="py-8 text-sm opacity-70">
                <p>{t('landing_footer')}</p>
            </footer>
        </div>
    );
};

export default LandingPageView;