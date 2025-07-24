import React from 'react';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import { Spinner } from '../common/Spinner';
import CityMap from '../common/MapComponent';


const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
        <div className="flex items-center">
            {[...Array(totalStars)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(rating) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
            ))}
        </div>
    );
};

export const SearchResults = ({ results, onHotelSelect, onOfferFetch, currency, loading }) => {
    console.log('SearchResults: Prop results:', results, 'Prop loading:', loading);

    // 👇 Yükleme durumu devam ediyorsa Spinner ve "Yükleniyor..." metnini göster
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-xl shadow-md">
                <Spinner />
                <p className="mt-4 text-xl font-semibold text-gray-700">Yükleniyor...</p>
            </div>
        );
    }

    // 👇 Yükleme bitti VE sonuçlar boşsa "Sonuç Bulunamadı" mesajını göster
    // Eğer results hala null ise (yani API'den henüz yanıt gelmediyse veya boşsa)
    // ve loading false ise, bu blok çalışır.
    if (!results || results.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-white rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-700">Sonuç Bulunamadı</h2>
                <p className="text-gray-500 mt-2">Lütfen arama kriterlerinizi değiştirip tekrar deneyin.</p>
            </div>
        );
    }

    // 👇 Sonuçlar varsa, otelleri listele
    // 👇 Sonuçlar varsa, otelleri listele
  // 👇 Sonuçlar varsa, otelleri listele
    return (
  <div className="space-y-6 bg-[#F9F7F3] py-10 px-4">
    {/* Başlık ve Harita - Flexbox düzeni */}
    <div className="flex justify-between items-start mb-6">
      <h1 className="text-3xl font-bold text-[#001624]">Arama Sonuçları</h1>


      {/* 🌍 Şehir haritası - sağ tarafta, büyük ve temaya uygun kenarlıklı */}
      {results[0]?.geolocation && (
        <div className="w-96 h-60 rounded-xl overflow-hidden shadow-lg ml-4 border-2 border-[#D46A00]/30 bg-gradient-to-br from-[#F7A072]/10 to-[#D46A00]/10">
          <CityMap
            latitude={results[0].geolocation.latitude}
            longitude={results[0].geolocation.longitude}
          />
        </div>
      )}
    </div>

       
                const minPrice = oneNightPrices?.length > 0
                    ? Math.min(...oneNightPrices)
                    : null;
                return (
                    <div key={hotel.id} className="flex flex-col bg-white rounded-2xl shadow-xl hover:bg-[#B5E2FA]/20 transition-allduration-300 overflow-hidden border border-gray-200">
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                                <img
                                    src={hotel.thumbnailFull || 'https://placehold.co/400x300/e2e8f0/94a3b8?text=Resim+Yok'}
                                    alt={hotel.name}
                                    className="w-full h-48 md:h-full object-cover"
                                    onError={(e) => { e.target.src = 'https://placehold.co/400x300/e2e8f0/94a3b8?text=Resim+Yok' }}
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-2xl font-bold text-[#D46A00]">{hotel.name}</h2>
                                        {hotel.stars > 0 && <StarRating rating={hotel.stars} />}
                                    </div>
                                    <div className="flex items-center text-[#2883BB] mt-2">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        <span>{hotel.city?.name || 'Şehir bilgisi yok'}</span>
                                    </div>

                                </div>
                                <div className="flex items-center text-[#2883BB] mt-2">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    <span>{hotel.city?.name || 'Şehir bilgisi yok'}</span>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                {minPrice ? (
                                    <div className="text-left">
                                        <p className="text-sm text-gray-500">Gecelik en düşük</p>
                                        <p className="text-2xl font-bold text-[#001624]">
                                            {minPrice.toFixed(2)} {currency}
                                        </p>
                                    </div>
                                ) : <div />}
                                <button onClick={() => onHotelSelect(hotel.id, hotel.provider)} className="flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#F7A072] to-[#D46A00] text-white hover:brightness-110 hover:scale-[1.02] transition-all duration-300">
                                    Otel Detayları <ChevronRight className="h-5 w-5 ml-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })}
    </div>
);

};
