import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormButton } from './ui/FormComponents';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <FormButton
        onClick={() => changeLanguage('en')}
        variant={i18n.language === 'en' ? 'primary' : 'secondary'}
        className="px-2 py-1 text-sm"
      >
        EN
      </FormButton>
      <FormButton
        onClick={() => changeLanguage('es')}
        variant={i18n.language === 'es' ? 'primary' : 'secondary'}
        className="px-2 py-1 text-sm"
      >
        ES
      </FormButton>
    </div>
  );
};

export default LanguageSwitcher;