import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default {
  title: 'Components/LanguageSwitcher',
  component: LanguageSwitcher,
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    ),
  ],
};

export const Default = () => <LanguageSwitcher />;