import React from 'react';
import { MapPin } from 'lucide-react';
import { Spinner } from '../components/common/Spinner';

// Bu klasöre özel bileşenler
import HotelCard from '../components/HotelCard/HotelCard';
import LoadingState from '../components/SearchResults/LoadingState';
import NoResultsFound from '../components/SearchResults/NoResultFound';
// import MapComponent from '../common/MapComponent';

/**
 * Otel arama sonuçlarını listeleyen ana bileşen.
 * Durum yönetimi (yükleme, sonuç yok) ve sonuçların gösterimi için alt bileşenler kullanır.
 *
 * @param {Array<Object>} results - Görüntülenecek otel sonuçları.
 * @param {function} onHotelSelect - Bir otel seçildiğinde çağrılan fonksiyon.
 * @param {string} currency - Otel fiyatlarının para birimi.
 * @param {boolean} loading - Yükleme durumunu belirten boolean.
 */
const SearchResults = ({ results, onHotelSelect, onOfferFetch, currency, loading }) => {
  console.log('SearchResults: Prop results:', results, 'Prop loading:', loading);

  if (loading) {
    return <LoadingState />;
  }

  if (!results || results.length === 0) {
    return <NoResultsFound />;
  }

  return (
    <div className="space-y-6 bg-[#F9F7F3] py-10 px-4">
      {/* Başlık ve Harita */}
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-[#001624]">Arama Sonuçları</h1>

        {/* {results[0]?.geolocation && (
          <div className="w-96 h-60 rounded-xl overflow-hidden shadow-lg border-2 border-[#D46A00]/30 bg-gradient-to-br from-[#F7A072]/10 to-[#D46A00]/10">
            <MapComponent
              latitude={results[0].geolocation.latitude}
              longitude={results[0].geolocation.longitude}
            />
          </div>
        )} */}
      </div>

      {/* Otel Listesi */}
      {results.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          currency={currency}
          onHotelSelect={onHotelSelect}
        />
      ))}
    </div>
  );
};

export default SearchResults;
