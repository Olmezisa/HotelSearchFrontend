// src/components/SearchResults/HotelPriceAndAction.js
import React from 'react';
import { ChevronRight } from 'lucide-react';

/**
 * Otel kartı için fiyat ve aksiyon butonunu gösteren bileşen.
 * @param {Array<Object>} offers - Otelin mevcut teklifleri.
 * @param {string} currency - Fiyatın para birimi.
 * @param {function} onHotelSelect - Butona tıklandığında çağrılan fonksiyon.
 */
const HotelPriceAndAction = ({ offers, currency, onHotelSelect }) => {
  // Gecelik en düşük fiyatı hesapla
  const oneNightPrices = offers?.map(o => {
    const nights = o.night || 1;
    const totalAmount = o.price?.amount || 0;
    return nights > 0 ? totalAmount / nights : totalAmount;
  });

  const minPrice = oneNightPrices?.length > 0
    ? Math.min(...oneNightPrices)
    : null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
      {minPrice ? (
        <div className="text-left">
          <p className="text-sm text-gray-500">Gecelik en düşük</p>
          <p className="text-2xl font-bold text-[#001624]">
            {minPrice.toFixed(2)} {currency}
          </p>
        </div>
      ) : <div />}

      <button
        onClick={onHotelSelect}
        className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#F7A072] to-[#D46A00] text-white hover:brightness-110 hover:scale-[1.02] transition-all duration-300"
      >
        Otel Detayları <ChevronRight className="h-5 w-5 ml-1" />
      </button>
    </div>
  );
};

export default HotelPriceAndAction;
