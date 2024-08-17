import React from 'react';
import { useTranslation } from 'react-i18next';
import OrderedFavorites from './OrderedFavorites';

const Favorites = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('favorites')}</h2>
      <h3>{t('favoriteActors')}</h3>
      <OrderedFavorites type="actors" />
      <h3>{t('favoriteTVSeries')}</h3>
      <OrderedFavorites type="tvSeries" />
    </div>
  );
};

export default Favorites;