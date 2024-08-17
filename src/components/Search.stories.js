import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import Search from './Search';

const queryClient = new QueryClient();

export default {
  title: 'Components/Search',
  component: Search,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <I18nextProvider i18n={i18n}>
            <Story />
          </I18nextProvider>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};

export const Default = () => <Search />;