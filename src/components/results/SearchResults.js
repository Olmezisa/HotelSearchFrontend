import { MapPin, Star, ChevronRight, Tag, BedDouble } from 'lucide-react';

// StarRating bileşeniniz doğru, onu değiştirmeye gerek yok.
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

// --- Bu bileşen artık yok, mantığı aşağıdaki SearchResults içinde ---
// const HotelCard = ({...}) => { ... };

export const SearchResults = ({ results, onHotelSelect, onOfferFetch, currency }) => {
    if (!results) {
        return null; // Arama yapılmadıysa hiçbir şey gösterme
    }
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
                // 1. DÜZELTME: Her otel için en düşük fiyatı burada hesaplıyoruz.
                const minPrice = hotel.offers?.length > 0
                    ? Math.min(...hotel.offers.map(o => o.price.amount))
                    : null;

                return (
                    // Burası sizin eski HotelCard bileşeninizin içeriği
                    <div key={hotel.id} className="flex flex-col bg-white rounded-2xl shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
                        {/* Otelin ana bilgi alanı */}
                        <div className="flex flex-col md:flex-row">
                            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                                <img
                                    src={hotel.thumbnail || 'https://placehold.co/400x300/e2e8f0/94a3b8?text=Otel'}
                                    alt={hotel.name}
                                    className="w-full h-48 md:h-full object-cover"
                                    onError={(e) => { e.target.src = 'https://placehold.co/400x300/e2e8f0/94a3b8?text=Resim+Yok' }}
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <h2 className="text-2xl font-bold text-gray-800">{hotel.name}</h2>
                                        {/* 2. DÜZELTME: Yıldız verisini 'hotel.rating' yerine 'hotel.stars' alanından alıyoruz. */}
                                        {hotel.stars > 0 && <StarRating rating={hotel.stars} />}
                                    </div>
                                    <div className="flex items-center text-gray-500 mt-2">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        <span>{hotel.city?.name || 'Şehir bilgisi yok'}</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                    {/* 3. DÜZELTME: Hesaplanan en düşük fiyatı burada gösteriyoruz. */}
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

                        {/* Teklifler alanı */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center"><Tag className="h-5 w-5 mr-2" /> Mevcut Teklifler</h3>
                            {hotel.offers && hotel.offers.length > 0 ? (
                                <div className="space-y-3">
                                    {hotel.offers.map(offer => (
                                        <div key={offer.offerId} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-lg shadow-sm border">
                                            <div className="mb-2 sm:mb-0">
                                                <p className="font-semibold text-gray-800">{offer.rooms[0].roomName}</p>
                                                {/* API yanıtında boardName olmayabilir, boardName'i offer.rooms[0] içinden almayı deneyin */}
                                                <p className="text-sm text-gray-600">{offer.rooms[0].boardName}</p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <p className="text-xl font-bold text-blue-600">{offer.price.amount.toFixed(2)} {currency}</p>
                                                <button
                                                    onClick={() => onOfferFetch(hotel.id, offer.offerId)}
                                                    className="text-sm font-semibold bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap">
                                                    Detayları Gör
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">Bu otel için şu an teklif bulunmamaktadır.</p>
                            )}
                        </div>

                        {/* Tıklanınca açılan oda detayı alanı (Bu bölüm doğru çalışıyor) */}
                        {hotel.isOfferDetailVisible && hotel.rooms && (
                            <div className="p-6 bg-blue-50 border-t-2 border-blue-200">
                                <h4 className="text-md font-bold text-blue-800 mb-3 flex items-center"><BedDouble className="h-5 w-5 mr-2" /> Seçilen Teklifin Oda Detayları</h4>
                                {/* ... içerik ... */}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};