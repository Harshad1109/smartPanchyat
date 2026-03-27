import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher({ className }) {
  const { i18n } = useTranslation();
  // `i18n.resolvedLanguage` gets the actually used language, e.g. "en" instead of "en-US"
  const [lang, setLang] = useState(i18n.resolvedLanguage || i18n.language || 'en');

  // Sync state if language changes outside
  useEffect(() => {
    if (i18n.resolvedLanguage) {
      setLang(i18n.resolvedLanguage);
    }
  }, [i18n.resolvedLanguage]);

  const changeLanguage = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  return (
    <select 
      value={lang} 
      onChange={changeLanguage}
      className={`bg-emerald-50 text-emerald-800 border focus:border-emerald-300 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer hover:bg-emerald-100 transition-colors shadow-sm ${className || ''}`}
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
      <option value="mr">मराठी</option>
    </select>
  );
}
