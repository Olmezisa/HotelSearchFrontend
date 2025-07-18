// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, MapPin, BedDouble, Star, Tag, ShoppingCart, Wifi, Wind, Tv2, UtensilsCrossed, Droplets, ParkingCircle, Sparkles } from 'lucide-react';
// import { useParams } from 'react-router-dom'; // useParams'ı import ettik
// import { api } from '../../api/santsgApi'; // API bağlantısını import ettik
// import { Spinner } from '../common/Spinner'; // Spinner'ı import ettik

// // --- İkon Kütüphanesi ---
// const ICONS = {
//     'default': <Sparkles className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
//     'wifi': <Wifi className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
//     'internet': <Wifi className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
//     'air conditioning': <Wind className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
//     'klima': <Wind className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
//     'tv': <Tv2 className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
//     'restaurant': <UtensilsCrossed className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
//     'havuz': <Droplets className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
//     'otopark': <ParkingCircle className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
// };

// const FacilityIcon = ({ name }) => {
//     const normalizedName = name ? name.toLowerCase() : '';
//     for (const key in ICONS) {
//         if (normalizedName.includes(key)) return ICONS[key];
//     }
//     return ICONS['default'];
// };

// // --- StarRating Bileşeni ---
// const StarRating = ({ rating, starCount = 5 }) => (
//     <div className="flex items-center">
//         {[...Array(starCount)].map((_, i) => (
//             <Star 
//                 key={`star-${i}`} 
//                 className={`h-6 w-6 transition-all duration-300 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
//                 style={{ filter: `drop-shadow(0 0 4px ${i < rating ? 'rgba(251, 191, 36, 0.5)' : 'transparent'})` }}
//             />
//         ))}
//     </div>
// );

// // --- HotelDetail Bileşeni ---
// export const HotelDetail = ({ onBack }) => {
//     // URL'den productId, providerId, searchId, currency ve offerId'yi alıyoruz
//     const { productId, providerId, searchId, currency, offerId } = useParams();
//     const [hotel, setHotel] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [mainImage, setMainImage] = useState('');
//     const [isImageLoading, setIsImageLoading] = useState(true);
    
//     useEffect(() => {
//         const fetchHotelDetails = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 if (!productId || !providerId || !searchId || !currency || !offerId) {
//                     setError("Gerekli otel bilgileri (ID, Sağlayıcı, Arama ID'si, Para Birimi veya Teklif ID'si) URL'de bulunamadı.");
//                     setLoading(false);
//                     return;
//                 }

//                 // 1. getProductInfo API çağrısı
//                 const staticInfoResponse = await api.getProductInfo(productId, providerId);

//                 // 2. getOffers için gerekli parametreleri hazırla
//                 const offersRequestParams = {
//                     searchId: searchId,
//                     offerId: offerId, // 👈 DÜZELTME BURADA: URL'den gelen offerId'yi ekledik
//                     productId: productId,
//                     productType: 2,
//                     currency: currency, // URL'den gelen currency
//                     culture: "en-US",
//                     getRoomInfo: true,
//                 };

//                 // 3. İki API isteğini aynı anda yap
//                 const [hotelInfo, offersResponse] = await Promise.all([
//                     Promise.resolve(staticInfoResponse),
//                     api.getOffers(offersRequestParams) // getOffers çağrısı
//                 ]);

//                 if (!hotelInfo) {
//                     throw new Error("Otel statik bilgileri alınamadı.");
//                 }

//                 const offersToShow = offersResponse.body?.offers || [];
                
//                 const mergedHotelData = {
//                     ...hotelInfo,
//                     offers: offersToShow, // Teklifleri otel verisine ekliyoruz
//                 };

//                 setHotel(mergedHotelData);
//                 const firstImage = mergedHotelData?.seasons?.[0]?.mediaFiles?.[0]?.urlFull || mergedHotelData?.thumbnailFull;
//                 setMainImage(firstImage || null);

//             } catch (err) {
//                 console.error("Otel detayı alınırken hata oluştu:", err);
//                 setError("Otel detayları yüklenirken bir hata oluştu.");
//             } finally {
//                 setLoading(false);
//                 setIsImageLoading(false);
//             }
//         };

//         fetchHotelDetails();
//     }, [productId, providerId, searchId, currency, offerId]); // Tüm bağımlılıkları ekledik

//     const handleImageSelect = (url) => {
//         if (!url || mainImage === url) return;
//         setIsImageLoading(true);
//         const img = new Image();
//         img.src = url;
//         img.onload = () => { setMainImage(url); setIsImageLoading(false); };
//         img.onerror = () => setIsImageLoading(false);
//     }

//     if (loading) {
//         return (
//             <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-xl shadow-md min-h-[60vh]">
//                 <Spinner />
//                 <p className="mt-4 text-xl font-semibold text-gray-700">Otel Detayları Yükleniyor...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>;
//     }

//     if (!hotel) {
//         return <div className="text-center p-10"><p>Otel verisi bulunamadı veya yüklenemedi.</p></div>;
//     }

//     // Tüm verileri güvenli bir şekilde alıyoruz
//     const allHotelImages = hotel?.seasons?.flatMap(s => s.mediaFiles || []) || [];
//     const allFacilities = hotel?.seasons?.flatMap(s => s.facilityCategories?.flatMap(fc => fc.facilities || []) || []) || [];
//     const textCategories = hotel?.seasons?.[0]?.textCategories || [];
//     const offers = hotel?.offers || []; // Teklifler artık hotel objesinden geliyor
//     const rooms = hotel?.rooms || [];

//     return (
//         <div className="bg-gray-50 text-slate-800 min-h-screen font-sans overflow-x-hidden">
//             <div className="relative z-10 container mx-auto p-4 sm:p-6 lg:p-8">
//                 <button onClick={onBack} className="inline-flex items-center font-semibold mb-8 bg-white/60 backdrop-blur-md pr-5 pl-3 py-2 rounded-full border border-gray-200/80 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 group">
//                     <ArrowLeft className="h-6 w-6 mr-2 text-gray-500 transition-transform duration-300 group-hover:-translate-x-1" />
//                     Sonuçlara Geri Dön
//                 </button>

//                 <div className="relative w-full h-[60vh] md:h-[75vh] rounded-3xl overflow-hidden flex items-end p-8 md:p-12 shadow-2xl border">
//                     <div className={`absolute inset-0 transition-all duration-1000 ${isImageLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
//                         <img src={mainImage || 'https://placehold.co/1200x800/e2e8f0/94a3b8?text=Resim+Bulunamadı'} alt="Ana Otel Resmi" className="w-full h-full object-cover" />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
//                     </div>
//                     <div className="relative z-20 text-white animate-fade-in-up">
//                         <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>{hotel.name}</h1>
//                         <p className="mt-4 text-xl md:text-2xl text-gray-200 flex items-center">
//                             <MapPin className="h-6 w-6 mr-3" /> {hotel.city?.name}, {hotel.country?.name}
//                         </p>
//                         <div className="mt-4">
//                             <StarRating rating={hotel.stars || 0} />
//                         </div>
//                     </div>
//                 </div>

//                 {allHotelImages.length > 0 && (
//                     <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
//                         <div className="flex space-x-4 pb-4 overflow-x-auto">
//                             {allHotelImages.map((media, index) => (
//                                 <img
//                                     key={media.urlFull ? `${media.urlFull}-${index}` : index}
//                                     src={media.urlFull}
//                                     alt={`Thumbnail ${index + 1}`}
//                                     className={`flex-shrink-0 w-32 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 border-2 shadow-sm ${mainImage === media.urlFull ? 'border-rose-500 scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'}`}
//                                     onClick={() => handleImageSelect(media.urlFull)}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
//                     <div className="lg:col-span-2 space-y-16">
//                         {textCategories.map((cat, idx) => (
//                             <section key={cat.name || idx} className="animate-fade-in-up" style={{ animationDelay: `${0.4 + idx * 0.2}s` }}>
//                                 <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">{cat.name}</h3>
//                                 <div className="text-lg text-slate-600 leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: cat.presentations?.[0]?.text || '' }}></div>
//                             </section>
//                         ))}

//                         {offers.length > 0 && (
//                             <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
//                                 <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center">
//                                     <Tag className="h-9 w-9 mr-4" /> Fiyat Teklifleri
//                                 </h3>
//                                 <div className="space-y-4">
//                                     {offers.map(offer => (
//                                         <div key={offer.offerId} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                                             <div>
//                                                 <h4 className="font-bold text-xl text-slate-800">{offer.rooms[0].roomName}</h4>
//                                                 <p className="text-md text-slate-600 mt-1">{offer.rooms[0].boardName}</p>
//                                                 <p className="text-2xl font-bold text-teal-600 mt-2">
//                                                     {offer.price.amount.toFixed(2)} {currency}
//                                                 </p>
//                                             </div>
//                                             <button className="flex items-center justify-center text-lg font-semibold px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
//                                                 <ShoppingCart className="h-6 w-6 mr-2" />
//                                                 Rezervasyon
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         )}

//                         {rooms.length > 0 && (
//                              <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
//                                 <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 flex items-center">
//                                     <BedDouble className="h-9 w-9 mr-4"/> Oda Seçenekleri
//                                 </h3>
//                                 <div className="space-y-8">
//                                     {rooms.map(room => (
//                                         <div key={room.id || room.code} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md">
//                                             <h4 className="font-bold text-2xl text-slate-800 mb-4">{room.name}</h4>
//                                             {room.mediaFiles && room.mediaFiles.length > 0 && (
//                                                 <div className="flex space-x-3 pb-4 mb-4 border-b overflow-x-auto">
//                                                     {room.mediaFiles.map((img, idx) => (
//                                                         <img key={idx} src={img.urlFull} alt={`${room.name} ${idx+1}`} className="flex-shrink-0 w-40 h-28 object-cover rounded-lg shadow-sm" />
//                                                     ))}
//                                                 </div>
//                                             )}
//                                             {room.facilities && room.facilities.length > 0 && (
//                                                 <div>
//                                                     <h5 className="font-bold text-lg text-slate-700 mb-2">Oda Olanakları</h5>
//                                                     <div className="flex flex-wrap gap-x-4 gap-y-2">
//                                                         {room.facilities.map(facility => (
//                                                             <div key={facility.id} className="flex items-center text-sm text-slate-600">
//                                                                 <FacilityIcon name={facility.name} />
//                                                                 <span>{facility.name}</span>
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         )}
//                     </div>

//                     <aside className="lg:sticky lg:top-8 self-start space-y-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
//                         {allFacilities.length > 0 && (
//                             <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-lg">
//                                 <h3 className="text-2xl font-bold mb-6 text-slate-800">Tesis Olanakları</h3>
//                                 <div className="space-y-4">
//                                     {allFacilities.slice(0, 10).map(facility => (
//                                         <div key={facility.id} className="flex items-center text-lg text-slate-700">
//                                             <FacilityIcon name={facility.name} />
//                                             <span>{facility.name}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                     </aside>
//                 </div>
//             </div>
//         </div>
//     );
// };

// src/components/detail/HotelDetail.jsx

import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, BedDouble, Star, Tag, ShoppingCart, Wifi, Wind, Tv2, UtensilsCrossed, Droplets, ParkingCircle, Sparkles, Phone, Printer } from 'lucide-react';
import { useParams } from 'react-router-dom'; // useParams'ı import ettik
import { api } from '../../api/santsgApi'; // API bağlantısını import ettik
import { Spinner } from '../common/Spinner'; // Spinner'ı import ettik
import { Link} from 'react-router-dom';

// --- İkon Kütüphanesi ---
const ICONS = {
    'default': <Sparkles className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
    'wifi': <Wifi className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
    'internet': <Wifi className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
    'air conditioning': <Wind className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
    'klima': <Wind className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
    'tv': <Tv2 className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
    'restaurant': <UtensilsCrossed className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
    'havuz': <Droplets className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
    'otopark': <ParkingCircle className="h-5 w-5 mr-2 text-rose-500 flex-shrink-0" />,
};

const FacilityIcon = ({ name }) => {
    const normalizedName = name ? name.toLowerCase() : '';
    for (const key in ICONS) {
        if (normalizedName.includes(key)) return ICONS[key];
    }
    return ICONS['default'];
};

// --- StarRating Bileşeni ---
const StarRating = ({ rating, starCount = 5 }) => (
    <div className="flex items-center">
        {[...Array(starCount)].map((_, i) => (
            <Star 
                key={`star-${i}`} 
                className={`h-6 w-6 transition-all duration-300 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                style={{ filter: `drop-shadow(0 0 4px ${i < rating ? 'rgba(251, 191, 36, 0.5)' : 'transparent'})` }}
            />
        ))}
    </div>
);

// --- HotelDetail Bileşeni ---

export const HotelDetail = ({ onBack }) => {

    const { productId, providerId, searchId, currency, offerId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [isImageLoading, setIsImageLoading] = useState(true);
    
    useEffect(() => {
        const fetchHotelDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!productId || !providerId || !searchId || !currency || !offerId) {
                    setError("Gerekli otel bilgileri (ID, Sağlayıcı, Arama ID'si, Para Birimi veya Teklif ID'si) URL'de bulunamadı.");
                    setLoading(false);
                    return;
                }

                const staticInfoResponse = await api.getProductInfo(productId, providerId);

                const offersRequestParams = {
                    searchId: searchId,
                    offerId: offerId,
                    productId: productId,
                    productType: 2,
                    currency: currency,
                    culture: "en-US",
                    getRoomInfo: true,
                };

                const [hotelInfo, offersResponse] = await Promise.all([
                    Promise.resolve(staticInfoResponse),
                    api.getOffers(offersRequestParams)
                ]);

                if (!hotelInfo) {
                    throw new Error("Otel statik bilgileri alınamadı.");
                }

                const offersToShow = offersResponse.body?.offers || [];
                
                const mergedHotelData = {
                    ...hotelInfo,
                    offers: offersToShow,
                };

                setHotel(mergedHotelData);
                const firstImage = mergedHotelData?.seasons?.[0]?.mediaFiles?.[0]?.urlFull || mergedHotelData?.thumbnailFull;
                setMainImage(firstImage || null);

            } catch (err) {
                console.error("Otel detayı alınırken hata oluştu:", err);
                setError("Otel detayları yüklenirken bir hata oluştu.");
            } finally {
                setLoading(false);
                setIsImageLoading(false);
            }
        };

        fetchHotelDetails();
    }, [productId, providerId, searchId, currency, offerId]);

    const handleImageSelect = (url) => {
        if (!url || mainImage === url) return;
        setIsImageLoading(true);
        const img = new Image();
        img.src = url;
        img.onload = () => { setMainImage(url); setIsImageLoading(false); };
        img.onerror = () => setIsImageLoading(false);
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-xl shadow-md min-h-[60vh]">
                <Spinner />
                <p className="mt-4 text-xl font-semibold text-gray-700">Otel Detayları Yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                {error}
            </div>
        );
    }

    if (!hotel) {
        return <div className="text-center p-10"><p>Otel verisi bulunamadı veya yüklenemedi.</p></div>;
    }

    const allHotelImages = hotel?.seasons?.flatMap(s => s.mediaFiles || []) || [];
    const allFacilities = hotel?.seasons?.flatMap(s => s.facilityCategories?.flatMap(fc => fc.facilities || []) || []) || [];
    const textCategories = hotel?.seasons?.[0]?.textCategories || [];
    const offers = hotel?.offers || [];
    const rooms = hotel?.rooms || [];

    return (
        <div className="bg-gray-50 text-slate-800 min-h-screen font-sans overflow-x-hidden">
            <div className="relative z-10 container mx-auto p-4 sm:p-6 lg:p-8">
                <button onClick={onBack} className="inline-flex items-center font-semibold mb-8 bg-white/60 backdrop-blur-md pr-5 pl-3 py-2 rounded-full border border-gray-200/80 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 group">
                    <ArrowLeft className="h-6 w-6 mr-2 text-gray-500 transition-transform duration-300 group-hover:-translate-x-1" />
                    Sonuçlara Geri Dön
                </button>

                <div className="relative w-full h-[60vh] md:h-[75vh] rounded-3xl overflow-hidden flex items-end p-8 md:p-12 shadow-2xl border">
                    {/* Bulanık Arka Plan Rengi */}
                    <div className={`absolute inset-0 transition-opacity duration-1000 ${isImageLoading ? 'opacity-0' : 'opacity-100'} bg-sky-50 filter blur-lg`}>
                        {/* Gradient overlay for subtle effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"></div>
                    </div>

                    {/* Ana Görsel (bulanık olmayan, kendi boyutunda veya sığacak şekilde) */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}>
                        <img
                            src={mainImage || 'https://placehold.co/1200x800/e2e8f0/94a3b8?text=Resim+Bulunamadı'}
                            alt="Ana Otel Resmi"
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    <div className="relative z-20 text-white animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>{hotel.name}</h1>
                        <p className="mt-4 text-xl md:text-2xl text-gray-200 flex items-center">
                            <MapPin className="h-6 w-6 mr-3" /> {hotel.city?.name}, {hotel.country?.name}
                        </p>
                        <div className="mt-4">
                            <StarRating rating={hotel.stars || 0} />
                        </div>
                    </div>
                </div>

                {allHotelImages.length > 0 && (
                    <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex space-x-4 pb-4 overflow-x-auto">
                            {allHotelImages.map((media, index) => (
                                <img
                                    key={media.urlFull ? `${media.urlFull}-${index}` : index}
                                    src={media.urlFull}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`flex-shrink-0 w-32 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 border-2 shadow-sm ${mainImage === media.urlFull ? 'border-rose-500 scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'}`}
                                    onClick={() => handleImageSelect(media.urlFull)}
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-16">
                        {textCategories.map((cat, idx) => (
                            <section key={cat.name || idx} className="animate-fade-in-up" style={{ animationDelay: `${0.4 + idx * 0.2}s` }}>
                                <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">{cat.name}</h3>
                                <div className="text-lg text-slate-600 leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: cat.presentations?.[0]?.text || '' }}></div>
                            </section>
                        ))}

                        {offers.length > 0 && (
                            <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                                <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center">
                                    <Tag className="h-9 w-9 mr-4" /> Fiyat Teklifleri
                                </h3>
                                <div className="space-y-4">
                                    {offers.map(offer => (
                                        <div key={offer.offerId} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div>
                                                <h4 className="font-bold text-xl text-slate-800">{offer.rooms[0].roomName}</h4>
                                                <p className="text-md text-slate-600 mt-1">{offer.rooms[0].boardName}</p>
                                                <p className="text-2xl font-bold text-teal-600 mt-2">
                                                    {offer.price.amount.toFixed(2)} {currency}
                                                </p>
                                            </div>
                                             <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                                <Link
                                to={`/offer-details/${offer.offerId}/${currency}`}
                                className="flex items-center justify-center text-lg font-semibold px-6 py-3 rounded-xl bg-white border border-teal-500 text-teal-500 shadow-sm transition-all duration-300 transform hover:bg-teal-50 hover:shadow-lg w-full"
                            >
                                Detayları Gör
                            </Link>
                            <button className="flex items-center justify-center text-lg font-semibold px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-lg transition-all duration-300 transform hover:scale-105 w-full">
                                <ShoppingCart className="h-6 w-6 mr-2" />
                                Rezervasyon
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
                        )}

                        {rooms.length > 0 && (
                             <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                                <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 flex items-center">
                                    <BedDouble className="h-9 w-9 mr-4"/> Oda Seçenekleri
                                </h3>
                                <div className="space-y-8">
                                    {rooms.map(room => (
                                        <div key={room.id || room.code} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md">
                                            <h4 className="font-bold text-2xl text-slate-800 mb-4">{room.name}</h4>
                                            {room.mediaFiles && room.mediaFiles.length > 0 && (
                                                <div className="flex space-x-3 pb-4 mb-4 border-b overflow-x-auto">
                                                    {room.mediaFiles.map((img, idx) => (
                                                        <img key={idx} src={img.urlFull} alt={`${room.name} ${idx+1}`} className="flex-shrink-0 w-40 h-28 object-cover rounded-lg shadow-sm" />
                                                    ))}
                                                </div>
                                            )}
                                            {room.facilities && room.facilities.length > 0 && (
                                                <div>
                                                    <h5 className="font-bold text-lg text-slate-700 mb-2">Oda Olanakları</h5>
                                                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                                                        {room.facilities.map(facility => (
                                                            <div key={facility.id} className="flex items-center text-sm text-slate-600">
                                                                <FacilityIcon name={facility.name} />
                                                                <span>{facility.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    <aside className="lg:sticky lg:top-8 self-start space-y-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
                        {allFacilities.length > 0 && (
                            <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-lg">
                                <h3 className="text-2xl font-bold mb-6 text-slate-800">Tesis Olanakları</h3>
                                <div className="space-y-4">
                                    {allFacilities.slice(0, 10).map(facility => (
                                        <div key={facility.id} className="flex items-center text-lg text-slate-700">
                                            <FacilityIcon name={facility.name} />
                                            <span>{facility.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {(hotel.phoneNumber || hotel.faxNumber) && (
        <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">İletişim Bilgileri</h3>
            <div className="space-y-4">
                {hotel.phoneNumber && (
                    <div className="flex items-center text-lg text-slate-700">
                        <Phone className="h-5 w-5 mr-3 text-rose-500 flex-shrink-0" />
                        <a href={`tel:${hotel.phoneNumber}`} className="hover:text-rose-600 transition-colors">
                            {hotel.phoneNumber}
                        </a>
                    </div>
                )}
                {hotel.faxNumber && (
                    <div className="flex items-center text-lg text-slate-700">
                        <Printer className="h-5 w-5 mr-3 text-rose-500 flex-shrink-0" />
                        <span>{hotel.faxNumber}</span>
                    </div>
                )}
            </div>
        </div>
    )}

                    </aside>
                </div>
            </div>
        </div>
    );
};
