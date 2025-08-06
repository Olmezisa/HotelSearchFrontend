// src/components/SearchResults/HotelInfo.js
import React from 'react';
import { MapPin } from 'lucide-react';
import StarRating from '../common/StarRating';

/**
 * Otel kartı için otelin temel bilgilerini gösteren bileşen.
 * @param {string} name - Otelin adı.
 * @param {number} stars - Otelin yıldız derecesi.
 * @param {string} city - Otelin bulunduğu şehir.
 */
const HotelInfo = ({ name, stars, city }) => {
  return (
    <div>
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-[#D46A00]">{name}</h2>
      </div>
      <div className="flex items-center text-[#2883BB] mt-2">
        <MapPin className="h-5 w-5 mr-2" />
        <span>{city || 'Şehir bilgisi yok'}</span>
      </div>
      {stars > 0 && <StarRating rating={stars} />}
    </div>
  );
};

export default HotelInfo;
