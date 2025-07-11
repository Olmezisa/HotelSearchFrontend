import React from 'react';
import { ChevronRight } from 'lucide-react';
import { StarRating } from '../common/StarRating';

export const SearchResults = ({ results, onHotelSelect, currency }) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold text-gray-800">Arama Sonuçları</h2>
    {results.length === 0 ? (<p className="text-gray-600 bg-white p-4 rounded-lg">Bu kriterlere uygun otel bulunamadı.</p>) : (
      results.map(hotel => (
        <div key={hotel.id} onClick={() => onHotelSelect(hotel.id)} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col md:flex-row gap-4">
          <img src={hotel.thumbnailFull || 'https://placehold.co/200x200/e2e8f0/e2e8f0?text=Otel'} alt={hotel.name} className="w-full md:w-48 h-48 md:h-auto object-cover rounded-lg" />
          <div className="flex-grow"><h3 className="text-xl font-bold text-gray-800">{hotel.name}</h3><p className="text-sm text-gray-500 mb-2">{hotel.city?.name}, {hotel.country?.name}</p><StarRating stars={hotel.stars} />
            <div className="mt-4 text-right"><p className="text-sm text-gray-600">gecelik en iyi fiyat</p><p className="text-2xl font-bold text-blue-600">{hotel.offers[0]?.price.amount.toFixed(2)} {currency}</p><div className="text-blue-500 font-semibold flex items-center justify-end mt-2">Detayları Gör <ChevronRight className="h-5 w-5 ml-1" /></div></div>
          </div>
        </div>
      ))
    )}
  </div>
);