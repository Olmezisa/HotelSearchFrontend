// src/components/SearchResults/HotelCard.js
import React from 'react';
import HotelImage from './HotelImage';
import HotelInfo from './HotelInfo';
import HotelPriceAndAction from './HotelPriceAndAction';

/**
 * Tek bir otelin bilgilerini ve eylemlerini gösteren kart bileşenlerinin ana taşıyıcısı.
 *
 * @param {object} hotel - Görüntülenecek otel verisi.
 * @param {string} currency - Fiyatların para birimi.
 * @param {function} onHotelSelect - Otel seçildiğinde çağrılan fonksiyon.
 * @param {string} [variant='search-result'] - Kartın hangi varyantının (görünümünün) kullanılacağını belirler.
 */
const HotelCard = ({ hotel, currency, onHotelSelect, variant = 'search-result' }) => {
  // Variant'a göre ana kart stil sınıflarını belirle
  const cardClasses = variant === 'popular'
    ? 'w-[340px] h-[400px] flex-shrink-0 flex-col bg-white rounded-2xl shadow-xl transition-all duration-300 overflow-hidden border border-gray-200'
    : 'w-full h-[200px] md:h-[200px] flex-col md:flex-row bg-white rounded-2xl shadow-xl hover:bg-[#B5E2FA]/20 transition-all duration-300 overflow-hidden border border-gray-200';

  return (
    <div
      className={`flex ${variant === 'popular' ? 'flex-col' : 'flex-col md:flex-row'} ${cardClasses}`}
      key={hotel.id}
    >
      {variant === 'popular' ? (
        <div className="relative overflow-hidden rounded-t-2xl">
          <HotelImage
            thumbnailFull={hotel.thumbnailFull}
            name={hotel.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : (
        <HotelImage
          thumbnailFull={hotel.thumbnailFull}
          name={hotel.name}
          className="w-full md:w-1/3 h-48 md:h-full object-cover md:rounded-l-2xl"
        />
      )}

      <div className="p-6 flex flex-col flex-grow justify-between">
        <HotelInfo
          name={hotel.name}
          stars={hotel.stars}
          city={hotel.city?.name}
        />
        <HotelPriceAndAction
          offers={hotel.offers}
          currency={currency}
          onHotelSelect={() => onHotelSelect(hotel.id, hotel.provider)}
        />
      </div>
    </div>
  );
};

export default HotelCard;
