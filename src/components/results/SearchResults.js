import { MapPin, Star, ChevronRight } from 'lucide-react';

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

// onOfferFetch prop'u kaldırıldı
export const SearchResults = ({ results, onHotelSelect, currency }) => {
    if (!results) return null;

    if (results.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-white rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-700">Sonuç Bulunamadı</h2>
                <p className="text-gray-500 mt-2">Lütfen arama kriterlerinizi değiştirip tekrar deneyin.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Arama Sonuçları</h1>
            {results.map((hotel) => {
                const minPrice = hotel.offers?.length > 0
                    ? Math.min(...hotel.offers.map(o => o.price.amount))
                    : null;

                return (
                    <div key={hotel.id} className="flex flex-col bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
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
                                        <h2 className="text-2xl font-bold text-gray-800">{hotel.name}</h2>
                                        {hotel.stars > 0 && <StarRating rating={hotel.stars} />}
                                    </div>
                                    <div className="flex items-center text-gray-500 mt-2">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        <span>{hotel.city?.name || 'Şehir bilgisi yok'}</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    {minPrice ? (
                                        <div className="text-left">
                                            <p className="text-sm text-gray-500">Gecelik en düşük</p>
                                            <p className="text-2xl font-bold text-blue-600">
                                                {minPrice.toFixed(2)} {currency}
                                            </p>
                                        </div>
                                    ) : <div />}
                                    <button onClick={() => onHotelSelect(hotel.id, hotel.provider)} className="flex items-center font-semibold text-blue-600 hover:text-blue-800">
                                        Otel Detayları <ChevronRight className="h-5 w-5 ml-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* KALDIRILDI: Mevcut Teklifler ve Oda Detayları bölümü buradan tamamen kaldırıldı. */}
                    </div>
                );
            })}
        </div>
    );
};