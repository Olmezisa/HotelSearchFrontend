import React from 'react';
import { MapPin } from 'lucide-react';
import { Spinner } from '../components/common/Spinner';

// Bu klasöre özel bileşenler
import HotelCard from '../components/HotelCard/HotelCard';
import LoadingState from '../components/SearchResults/LoadingState';
import NoResultsFound from '../components/SearchResults/NoResultFound';
// import MapComponent from '../common/MapComponent';
import { FilterPanel } from '../components/filter/FilterPanel';

/**
 * Otel arama sonuçlarını listeleyen ana bileşen.
 * Durum yönetimi (yükleme, sonuç yok) ve sonuçların gösterimi için alt bileşenler kullanır.
 *
 * @param {Array<Object>} results - Görüntülenecek otel sonuçları.
 * @param {function} onHotelSelect - Bir otel seçildiğinde çağrılan fonksiyon.
 * @param {string} currency - Otel fiyatlarının para birimi.
 * @param {boolean} loading - Yükleme durumunu belirten boolean.
 */
const SearchResults = ({ results, onHotelSelect, currency, loading }) => {
  console.log('SearchResults: Prop results:', results, 'Prop loading:', loading);

  if (loading) {
    return <LoadingState />;
  }

  if (!results || results.length === 0) {
    return <NoResultsFound />;
  }

  return (
    <div className="bg-[#F9F7F3] py-10 px-4 min-h-screen">
      {/* <div className="max-w-7xl mx-auto"> */}
        {/* Başlık ve Harita */}
        <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-[#001624]">Arama Sonuçları</h1>
        </div>

        {/* Grid yapısı: Filtre Paneli ve Otel Listesi yan yana duracak */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 items-start">
          {/* Filtre Paneli - Sol Bölüm */}
          <div className="md:col-span-1 lg:col-span-1 sticky top-4">
            <FilterPanel />
          </div>

          {/* Otel Listesi - Sağ Bölüm */}
          <div className="md:col-span-3 lg:col-span-3 space-y-6">
            {results.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                currency={currency}
                onHotelSelect={onHotelSelect}
              />
            ))}
          </div>
        </div>
      </div>
    // </div>
  );
};

export default SearchResults;
