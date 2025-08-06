// src/components/SearchResults/HotelImage.js
import React from 'react';

/**
 * Otel kartı için otel görselini gösteren bileşen.
 * @param {string} thumbnailFull - Otelin tam boyutlu resim URL'si.
 * @param {string} name - Otel adı (alt metin için).
 * @param {string} classname - otel görseli boyutunu ayarlamak için
 */
const HotelImage = ({ thumbnailFull, name, className }) => {
  return (
      <img
        src={thumbnailFull || 'https://placehold.co/400x300/e2e8f0/94a3b8?text=Resim+Yok'}
        alt={name}
        className= {className}
        onError={(e) => {
          e.target.src = 'https://placehold.co/400x300/e2e8f0/94a3b8?text=Resim+Yok';
        }}
      />
  );
};

export default HotelImage;
