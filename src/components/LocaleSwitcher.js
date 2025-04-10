'use client';

import { useDispatch, useSelector } from 'react-redux';
import { changeLocale, setTranslations } from '../redux/features/translationSlice';

const LocaleSwitcher = () => {
  const dispatch = useDispatch();
  const { locale } = useSelector((state) => state.translation);

  const handleChange = async (newLocale) => {
    dispatch(changeLocale(newLocale));  // Update the locale in the state

    // Fetch the translations for the new locale
    const res = await fetch(`/locales/${newLocale}`);
    const data = await res.json();
    dispatch(setTranslations({ translations: data, locale: newLocale }));
  };

  return (
    <div className="locale-switcher">
      <button 
        onClick={() => handleChange('en')} 
        className={`px-2 ${locale === 'en' ? 'font-bold' : ''}`}
      >
        English
      </button>
      <button 
        onClick={() => handleChange('bn')} 
        className={`px-2 ${locale === 'bn' ? 'font-bold' : ''}`}
      >
        বাংলা
      </button>
    </div>
  );
};

export default LocaleSwitcher;
