// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, MapPin, BedDouble, Star, Tag, ShoppingCart, Wifi, Wind, Tv2, UtensilsCrossed, Droplets, ParkingCircle, Sparkles, Phone, Printer, XCircle, ChevronLeft, ChevronRight, Link as LinkIcon, CalendarDays, CreditCard, Globe, Lock, Building2, Scissors, Accessibility } from 'lucide-react';

// import { useParams } from 'react-router-dom';
// import { api } from '../../api/santsgApi';
// import { Spinner } from '../common/Spinner';
// import { Link } from 'react-router-dom';
// //rezervasyon yonlendirmesi eklendi
// import { useNavigate } from 'react-router-dom';

// // --- İkon Kütüphanesi ---
// const ICONS = {
//     'default': <Sparkles className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'wifi': <Wifi className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'internet': <Wifi className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'air conditioning': <Wind className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'klima': <Wind className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'tv': <Tv2 className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'restaurant': <UtensilsCrossed className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'havuz': <Droplets className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'otopark': <ParkingCircle className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'safe': <Lock className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'balcony': <Building2 className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'hair drier': <Scissors className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
//     'handicapped': <Accessibility className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
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

//                 className={`h-6 w-6 transition-all duration-300 ${i < rating ? 'text-[#f2bf8b] fill-[#f2bf8b]' : 'text-gray-300'}`}
//                 style={{ filter: `drop-shadow(0 0 4px ${i < rating ? 'rgba(242, 191, 139, 0.5)' : 'transparent'})` }}
//             />
//         ))}
//     </div>
// );

// // --- ImageGalleryModal Bileşeni ---
// const ImageGalleryModal = ({ images, currentIndex, onClose, onNavigate }) => {
//     if (!images || images.length === 0) return null;

//     const currentImage = images[currentIndex];

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-8">
//             <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
//                 aria-label="Kapat"
//             >
//                 <XCircle className="h-10 w-10" />
//             </button>

//             <div className="relative w-full h-full flex items-center justify-center">
//                 <img
//                     src={currentImage?.urlFull || 'https://placehold.co/1200x800/b5e2fa/093b5a?text=Resim+Bulunamadı'}
//                     alt="Büyük Otel Resmi"
//                     className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg"
//                 />

//                 {images.length > 1 && (
//                     <>
//                         <button
//                             onClick={() => onNavigate(-1)}
//                             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors z-40"
//                             aria-label="Önceki Resim"
//                         >
//                             <ChevronLeft className="h-10 w-10" />
//                         </button>
//                         <button
//                             onClick={() => onNavigate(1)}
//                             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors z-40"
//                             aria-label="Sonraki Resim"
//                         >
//                             <ChevronRight className="h-10 w-10" />
//                         </button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// // --- HotelDetail Bileşeni ---

// export const HotelDetail = ({ onBack }) => {

//     const { productId, providerId, searchId, currency, offerId } = useParams();
//     const [hotel, setHotel] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [mainImage, setMainImage] = useState('');
//     const [isImageLoading, setIsImageLoading] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const navigate = useNavigate();
//     const [isBookingLoading, setIsBookingLoading] = useState(false);
//     const [bookingError, setBookingError] = useState(null);

//     const openImageModal = (index = 0) => {
//         setCurrentImageIndex(index);
//         setIsModalOpen(true);
//     };

//     const closeImageModal = () => {
//         setIsModalOpen(false);
//     };

//     const navigateImage = (direction) => {
//         const totalImages = allHotelImages.length;
//         if (totalImages === 0) return;

//         let newIndex = (currentImageIndex + direction) % totalImages;
//         if (newIndex < 0) {
//             newIndex = totalImages - 1;
//         }
//         setCurrentImageIndex(newIndex);
//         setMainImage(allHotelImages[newIndex].urlFull);
//     };
//      const handleStartBooking = async (offerToBook) => {
//         setIsBookingLoading(true);
//         setBookingError(null);

//         try {
//             if (!offerToBook?.offerId) {
//                 throw new Error("Rezervasyon için geçerli bir teklif seçilmedi.");
//             }

//             // API'ye gönderilecek isteğin gövdesini oluşturuyoruz.
//             const requestBody = {
//                 offerIds: [offerToBook.offerId],
//                 currency: offerToBook.price.currency || currency || "EUR",
//                 culture: "en-US"
//             };

//             // Rezervasyon işlemini başlatan API'yi çağırıyoruz.
//             const transactionResponse = await api.beginTransaction(requestBody);

//             if (transactionResponse?.header?.success) {
                
//                 navigate('/booking', {
//                     state: {
//                        offerDetails: offerToBook,
//             transactionData: transactionResponse.body,
//             mainHotelImage: mainImage,
//             hotel: hotel
//                     }
//                 });
//             } else {
//                 const errorMessage = transactionResponse?.header?.messages[0]?.message || "Rezervasyon başlatılamadı.";
//                 setBookingError(errorMessage);
//             }
//         } catch (e) {
//             console.error("Begin Transaction Hatası:", e);
//             setBookingError(e.message || "Rezervasyon başlatılırken bir hata oluştu.");
//         } finally {
//             setIsBookingLoading(false);
//         }
//     };

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

//                 const staticInfoResponse = await api.getProductInfo(productId, providerId);

//                 const offersRequestParams = {
//                     searchId: searchId,
//                     offerId: offerId,
//                     productId: productId,
//                     productType: 2,
//                     currency: currency,
//                     culture: "en-US",
//                     getRoomInfo: true,
//                 };

//                 const [hotelInfo, offersResponse] = await Promise.all([
//                     Promise.resolve(staticInfoResponse),
//                     api.getOffers(offersRequestParams)
//                 ]);

//                 if (!hotelInfo) {
//                     throw new Error("Otel statik bilgileri alınamadı.");
//                 }

//                 const offersToShow = offersResponse.body?.offers || [];

//                 const mergedHotelData = {
//                     ...hotelInfo,
//                     offers: offersToShow,
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
//     }, [productId, providerId, searchId, currency, offerId]);

//     const handleImageSelect = (url, index) => {
//         if (!url || mainImage === url) return;
//         setIsImageLoading(true);
//         const img = new Image();
//         img.src = url;
//         img.onload = () => {
//             setMainImage(url);
//             setIsImageLoading(false);
//             if (index !== undefined) {
//                 setCurrentImageIndex(index);
//             }
//         };
//         img.onerror = () => setIsImageLoading(false);
//     }

//     if (loading) {
//         return (
//             <div className="flex flex-col items-center justify-center py-16 px-6 bg-[#f9f7f3] rounded-xl shadow-md min-h-[60vh]">
//                 <Spinner />
//                 <p className="mt-4 text-xl font-semibold text-gray-700">Otel Detayları Yükleniyor...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
//                 {error}
//             </div>
//         );
//     }

//     if (!hotel) {
//         return <div className="text-center p-10"><p>Otel verisi bulunamadı veya yüklenemedi.</p></div>;
//     }

//     const allHotelImages = hotel?.seasons?.flatMap(s => s.mediaFiles || []) || [];
//     const allFacilities = hotel?.seasons?.flatMap(s => s.facilityCategories?.flatMap(fc => fc.facilities || []) || []) || [];
//     const textCategories = hotel?.seasons?.[0]?.textCategories || [];
//     const offers = hotel?.offers || [];
//     const rooms = hotel?.rooms || [];
//     const currentSeason = hotel.seasons?.[0];

//     // Gecelik fiyatları hesapla
//     const oneNightPrices = hotel.offers?.map((offer) => {
//         const nights = offer.night || 1;
//         const totalAmount = offer.price?.amount || 0;
//         return nights > 0 ? totalAmount / nights : totalAmount;
//     }) || [];

//     // Minimum gecelik fiyatı bul
//     const minNightlyPrice = oneNightPrices.length > 0 ? Math.min(...oneNightPrices) : null;
//     return (
//         <div className="bg-[#F9F7F3] text-[#093B5A] min-h-screen font-sans overflow-x-hidden"> {/* BURASI DEĞİŞTİ */}
//             <div className="relative z-10 container mx-auto p-4 sm:p-6 lg:p-8">
//                 <button onClick={onBack} className="inline-flex items-center font-semibold mb-8 bg-white/60 backdrop-blur-md pr-5 pl-3 py-2 rounded-full border border-gray-200/80 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 group">
//                     <ArrowLeft className="h-6 w-6 mr-2 text-gray-500 transition-transform duration-300 group-hover:-translate-x-1" />
//                     Sonuçlara Geri Dön
//                 </button>


//                 <div className="relative w-full h-[60vh] md:h-[75vh] rounded-3xl overflow-hidden flex items-end p-8 md:p-12 shadow-2xl border cursor-pointer"
//                     onClick={() => openImageModal(allHotelImages.findIndex(img => img.urlFull === mainImage))}
//                 >


//                     {/* Bulanık Arka Plan Rengi */}
//                     <div className={`absolute inset-0 transition-opacity duration-1000 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}>
//                         <img
//                             src={mainImage || 'https://placehold.co/1200x800/b5e2fa/093b5a?text=Resim+Bulunamadı'}
//                             alt="Bulanık Arka Plan"
//                             className="w-full h-full object-cover filter blur-lg scale-105"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
//                     </div>

//                     <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}>
//                         <img
//                             src={mainImage || 'https://placehold.co/1200x800/b5e2fa/093b5a?text=Resim+Bulunamadı'}
//                             alt="Ana Otel Resmi"
//                             className="w-full h-full object-contain"
//                         />
//                     </div>

//                     <div className="relative z-20 text-white animate-fade-in-up">
//                   <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>{hotel.name}</h1>
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
//                                     className={`flex-shrink-0 w-32 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 border-2 shadow-sm ${mainImage === media.urlFull ? 'border-[#f7a072] scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'}`}
//                                     onClick={() => handleImageSelect(media.urlFull, index)}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
//                     <div className="lg:col-span-2 space-y-16">
//                         {/* Mevcut Sezon Bilgisi */}
//                         {currentSeason && (
//                             <section className="p-6 bg-blue-50/70 backdrop-blur-md rounded-2xl border border-blue-200/80 shadow-md animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
//                                 <h3 className="text-2xl font-bold mb-4 text-{#093B5A} flex items-center">
//                                     <CalendarDays className="h-7 w-7 mr-3" /> Mevcut Sezon
//                                 </h3>
//                                 <p className="text-lg text-slate-700">
//                                      {new Date(currentSeason.beginDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(currentSeason.endDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} tarihleri arasında geçerlidir.
//                                 </p>
//                             </section>
//                         )}
//                         {textCategories.map((cat, idx) => (
//                             <section key={cat.name || idx} className="animate-fade-in-up" style={{ animationDelay: `${0.4 + idx * 0.2}s` }}>
//                                 <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#2883BB] to-[#B5E2FA]">{cat.name}</h3>
//                                 <div className="text-lg text-slate-600 leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: cat.presentations?.[0]?.text || '' }}></div>
//                             </section>
//                         ))}

//                         {offers.length > 0 && (
//                             <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
//                                 <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
//                                       <h3 className="text-4xl font-bold mb-6 text-[#2883BB] flex items-center">
//                                            <Tag className="h-9 w-9 mr-4" /> Fiyat Teklifleri
//                                        </h3>
//                              </section>
//                                 <div className="space-y-4">
//                                     {offers.map(offer => (
//                                         <div key={offer.offerId} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                                             <div>
//                                                 <h4 className="font-bold text-xl text-slate-800">{offer.rooms[0].roomName}</h4>
//                                                 <p className="text-md text-slate-600 mt-1">{offer.rooms[0].boardName}</p>
//                                                 {minNightlyPrice !== null && (
//                                                     <div className="mt-2 text-xl font-semibold text-[#001624]">
//                                                         {minNightlyPrice.toFixed(2)} {currency}
//                                                     </div>
//                                                 )}
//                                             </div>
//                                             <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                                                 <Link

//                                                     to={`/offer-details/${offer.offerId}/${currency}`}
//                                                     className="flex items-center justify-center text-lg font-semibold px-6 py-3 rounded-xl bg-gradient-to-r from-[#2781B9] to-[#88B8D2] text-white shadow-lg transition-all duration-300 transform hover:scale-105 w-full"
//                                                 >
//                                                     Detayları Gör
//                                                 </Link>
//                                                  <button
//                                             onClick={() => handleStartBooking(offer)}
//                                             disabled={isBookingLoading} // Yükleme sırasında butonu pasif yap
//                                             className="flex items-center justify-center text-lg font-semibold px-6 py-3 rounded-xl bg-gradient-to-r from-[#f7a072] to-[#ac440b] text-white shadow-lg transition-all duration-300 transform hover:scale-105 w-full disabled:opacity-70 disabled:cursor-not-allowed"
//                                         >
//                                             {isBookingLoading ? (
//                                                 <Spinner size="sm" /> // Yükleniyor spinner'ı
//                                             ) : (
//                                                 <>
//                                                     <ShoppingCart className="h-6 w-6 mr-2" />
//                                                     Rezervasyon
//                                                 </>
//                                             )}
//                                         </button>

//                                             </div>
//                                         </div>
//                                     ))}
//                                     {bookingError && (
//                                 <p className="text-red-600 text-center mt-4 font-semibold">{bookingError}</p>
//                             )}
//                                 </div>
//                             </section>

//                         )}
//                         {/* Ödeme Planı Bilgileri */}
//                         {hotel.paymentPlanInfo && hotel.paymentPlanInfo.length > 0 && (
//                             <section className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
//                                 <h3 className="text-4xl font-bold mb-6 text-[#2883BB] flex items-center">
//                                     <CreditCard className="h-9 w-9 mr-4" /> Ödeme Planı Bilgileri
//                                 </h3>
//                                 <div className="space-y-4">
//                                     {hotel.paymentPlanInfo.map((plan, idx) => (
//                                         <div key={idx} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md">
//                                             <p className="text-lg text-slate-700-{#F7A072}">
//                                                 Ödeme Zamanı: {plan.paymentTimeStatus === 1 ? 'Rezervasyon Anında' : `${plan.day} Gün Önce`}
//                                             </p>
//                                             <p className="text-lg text-slate-700-{#F7A072} mt-2">
//                                                 Ödenecek Tutar: {plan.price.percent > 0 ? `${plan.price.percent}%` : `${plan.price.amount.toFixed(2)} ${currency}`}
//                                             </p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>

//                         )}

//                         {rooms.length > 0 && (
//                             <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>

//                                 <h3 className="text-4xl font-bold mb-6 text-[#2883BB] flex items-center">
//                                     <BedDouble className="h-9 w-9 mr-4" /> Oda Seçenekleri

//                                 </h3>
//                                 <div className="space-y-8">
//                                     {rooms.map(room => (
//                                         <div key={room.id || room.code} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md">
//                                             <h4 className="font-bold text-2xl text-slate-800 mb-4">{room.name}</h4>
//                                             {room.mediaFiles && room.mediaFiles.length > 0 && (
//                                                 <div className="flex space-x-3 pb-4 mb-4 border-b overflow-x-auto">
//                                                     {room.mediaFiles.map((img, idx) => (
//                                                         <img key={idx} src={img.urlFull} alt={`${room.name} ${idx + 1}`} className="flex-shrink-0 w-40 h-28 object-cover rounded-lg shadow-sm" />
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
//                                                                 {(facility.isPriced || facility.priced) && (
//                                                                     <span className="ml-1 text-xs text-amber-600 font-medium">(Ücretli)</span>
//                                                                 )}
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
//                                             {(facility.isPriced || facility.priced) && (
//                                                 <span className="ml-1 text-sm text-amber-600 font-medium">(Ücretli)</span>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                         {(hotel.phoneNumber || hotel.faxNumber) && (

//                             <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-lg">
//                                 <h3 className="text-2xl font-bold mb-6 text-slate-800">İletişim Bilgileri</h3>
//                                 <div className="space-y-4">
//                                   {hotel.phoneNumber && (
//     <div className="flex items-center text-lg text-slate-700">
//         <Phone className="h-5 w-5 mr-3 text-[#88B8D2] flex-shrink-0" />
//         <a href={`tel:${hotel.phoneNumber}`} className="hover:text-rose-600 transition-colors">
//             {hotel.phoneNumber}
//         </a>
//     </div>
// )}
//                                     {hotel.faxNumber && (
//     <div className="flex items-center text-lg text-slate-700">
//         <Printer className="h-5 w-5 mr-3 text-[#88B8D2] flex-shrink-0" />
//         <span>{hotel.faxNumber}</span>
//     </div>
// )}
// {hotel.homePage && (
//     <div className="flex items-center text-lg text-slate-700">
//         <LinkIcon className="h-5 w-5 mr-3 text-[#88B8D2] flex-shrink-0" />
//         <a href={hotel.homePage} target="_blank" rel="noopener noreferrer" className="hover:text-rose-600 transition-colors">
//             Resmi Web Sitesi
//         </a>
//     </div>
// )}
                                    
//                                     {hotel.location?.latitude && hotel.location?.longitude && (
//                                         <div className="text-center mt-6">
//                   <a
//   href={`https://www.google.com/maps/search/?api=1&query=${hotel.location.latitude},${hotel.location.longitude}`}
//   target="_blank"
//   rel="noopener noreferrer"
//   className="inline-flex items-center justify-start text-base font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-[#D48A61] to-[#AC440B] text-white shadow-lg transition-all duration-300 transform hover:scale-105"
// >
//   <Globe className="h-5 w-5 mr-2" /> Haritada Gör
// </a>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}


//                     </aside>
//                 </div>
//             </div>
//             {isModalOpen && (
//                 <ImageGalleryModal
//                     images={allHotelImages}
//                     currentIndex={currentImageIndex}
//                     onClose={closeImageModal}
//                     onNavigate={navigateImage}
//                 />
//             )}
//         </div>
//     );
// };

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ArrowLeft, CreditCard, CalendarDays } from 'lucide-react';
// import { api } from '../../api/santsgApi';
// import { Spinner } from '../common/Spinner';
// import { HotelHeader } from '../HotelHero/HotelHeader';
// import { ImageThumbnails } from '../HotelHero/ImageThumbnails';
// import { ImageGalleryModal } from '../HotelHero/ImageGalleryModal';
// import { OfferList } from './OfferList';
// import { RoomList } from './RoomList';
// import { HotelSidebar } from './HotelSidebar';


// // --- Local Sub-Components ---
// const TextCategoriesSection = ({ categories }) => (
//     <>
//         {categories.map((cat, idx) => (
//             <section key={cat.name || idx} className="animate-fade-in-up" style={{ animationDelay: `${0.4 + idx * 0.2}s` }}>
//                 <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#2883BB] to-[#B5E2FA]">{cat.name}</h3>
//                 <div className="text-lg text-slate-600 leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: cat.presentations?.[0]?.text || '' }}></div>
//             </section>
//         ))}
//     </>
// );

// const PaymentPlanSection = ({ paymentPlanInfo, currency }) => {
//     if (!paymentPlanInfo || paymentPlanInfo.length === 0) return null;
//     return (
//        <section className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
//             <h3 className="text-4xl font-bold mb-6 text-[#2883BB] flex items-center">
//                 <CreditCard className="h-9 w-9 mr-4" /> Ödeme Planı Bilgileri
//             </h3>
//             <div className="space-y-4">
//                 {paymentPlanInfo.map((plan, idx) => (
//                     <div key={idx} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md">
//                         <p className="text-lg text-slate-700">Ödeme Zamanı: {plan.paymentTimeStatus === 1 ? 'Rezervasyon Anında' : `${plan.day} Gün Önce`}</p>
//                         <p className="text-lg text-slate-700 mt-2">Ödenecek Tutar: {plan.price.percent > 0 ? `${plan.price.percent}%` : `${plan.price.amount.toFixed(2)} ${currency}`}</p>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     )
// }

// const SeasonInfoSection = ({ season }) => {
//     if (!season) return null;
//     return (
//         <section className="p-6 bg-blue-50/70 backdrop-blur-md rounded-2xl border border-blue-200/80 shadow-md animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
//             <h3 className="text-2xl font-bold mb-4 text-slate-800 flex items-center">
//                 <CalendarDays className="h-7 w-7 mr-3" /> Mevcut Sezon
//             </h3>
//             <p className="text-lg text-slate-700">
//                  {new Date(season.beginDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(season.endDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} tarihleri arasında geçerlidir.
//             </p>
//         </section>
//     );
// }

// // --- Main Component ---
// export const HotelDetail = ({ onBack }) => {
//     const { productId, providerId, searchId, currency, offerId } = useParams();
//     const navigate = useNavigate();

//     // --- State Management ---
//     const [hotel, setHotel] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [mainImage, setMainImage] = useState('');
//     const [isImageLoading, setIsImageLoading] = useState(true);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [isBookingLoading, setIsBookingLoading] = useState(false);
//     const [bookingError, setBookingError] = useState(null);
    
//     // --- Data Fetching ---
//     useEffect(() => {
//         const fetchHotelDetails = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 if (!productId || !providerId || !searchId || !currency || !offerId) {
//                     setError("Gerekli otel bilgileri URL'de bulunamadı.");
//                     setLoading(false);
//                     return;
//                 }

//                 const staticInfoResponse = await api.getProductInfo(productId, providerId);
//                 const offersRequestParams = {
//                     searchId, offerId, productId, currency,
//                     productType: 2, culture: "en-US", getRoomInfo: true,
//                 };
//                 const offersResponse = await api.getOffers(offersRequestParams);

//                 if (!staticInfoResponse) {
//                     throw new Error("Otel statik bilgileri alınamadı.");
//                 }

//                 const mergedHotelData = {
//                     ...staticInfoResponse,
//                     offers: offersResponse.body?.offers || [],
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
//     }, [productId, providerId, searchId, currency, offerId]);

//     // --- Handlers ---
//     const allHotelImages = hotel?.seasons?.flatMap(s => s.mediaFiles || []) || [];

//     const openImageModal = (index = 0) => {
//         setCurrentImageIndex(index);
//         setIsModalOpen(true);
//     };

//     const closeImageModal = () => setIsModalOpen(false);

//     const navigateImage = (direction) => {
//         const totalImages = allHotelImages.length;
//         if (totalImages === 0) return;
//         let newIndex = (currentImageIndex + direction + totalImages) % totalImages;
//         setCurrentImageIndex(newIndex);
//         setMainImage(allHotelImages[newIndex].urlFull);
//     };

//     const handleImageSelect = (url, index) => {
//         if (!url || mainImage === url) return;
//         setIsImageLoading(true);
//         const img = new Image();
//         img.src = url;
//         img.onload = () => {
//             setMainImage(url);
//             setIsImageLoading(false);
//             if (index !== undefined) setCurrentImageIndex(index);
//         };
//         img.onerror = () => setIsImageLoading(false);
//     }

//     const handleStartBooking = async (offerToBook) => {
//         setIsBookingLoading(true);
//         setBookingError(null);
//         try {
//             if (!offerToBook?.offerId) {
//                 throw new Error("Rezervasyon için geçerli bir teklif seçilmedi.");
//             }
//             const requestBody = {
//                 offerIds: [offerToBook.offerId],
//                 currency: offerToBook.price.currency || currency || "EUR",
//                 culture: "en-US"
//             };
//             const transactionResponse = await api.beginTransaction(requestBody);
//             if (transactionResponse?.header?.success) {
//                 navigate('/booking', {
//                     state: {
//                         offerDetails: offerToBook,
//                         transactionData: transactionResponse.body,
//                         mainHotelImage: mainImage,
//                         hotel: hotel
//                     }
//                 });
//             } else {
//                 const errorMessage = transactionResponse?.header?.messages[0]?.message || "Rezervasyon başlatılamadı.";
//                 setBookingError(errorMessage);
//             }
//         } catch (e) {
//             console.error("Begin Transaction Hatası:", e);
//             setBookingError(e.message || "Rezervasyon başlatılırken bir hata oluştu.");
//         } finally {
//             setIsBookingLoading(false);
//         }
//     };
    
//     // --- Render Logic ---
//     if (loading) {
//         return (
//             <div className="flex flex-col items-center justify-center py-16 px-6 bg-[#f9f7f3] rounded-xl shadow-md min-h-[60vh]">
//                 <Spinner />
//                 <p className="mt-4 text-xl font-semibold text-gray-700">Otel Detayları Yükleniyor...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
//                 {error}
//             </div>
//         );
//     }

//     if (!hotel) {
//         return <div className="text-center p-10"><p>Otel verisi bulunamadı veya yüklenemedi.</p></div>;
//     }

//     const allFacilities = hotel?.seasons?.flatMap(s => s.facilityCategories?.flatMap(fc => fc.facilities || []) || []) || [];
//     const textCategories = hotel?.seasons?.[0]?.textCategories || [];
//     const offers = hotel?.offers || [];
//     const rooms = hotel?.rooms || [];
//     const currentSeason = hotel.seasons?.[0];

//     return (
//         <div className="bg-[#F9F7F3] text-[#093B5A] min-h-screen font-sans overflow-x-hidden">
//             <div className="relative z-10 container mx-auto p-4 sm:p-6 lg:p-8">
//                 <button onClick={onBack} className="inline-flex items-center font-semibold mb-8 bg-white/60 backdrop-blur-md pr-5 pl-3 py-2 rounded-full border border-gray-200/80 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 group">
//                     <ArrowLeft className="h-6 w-6 mr-2 text-gray-500 transition-transform duration-300 group-hover:-translate-x-1" />
//                     Sonuçlara Geri Dön
//                 </button>

//                 <HotelHeader 
//                     hotel={hotel} 
//                     mainImage={mainImage} 
//                     isImageLoading={isImageLoading} 
//                     onOpenGallery={() => openImageModal(currentImageIndex)}
//                 />
                
//                 <ImageThumbnails
//                     images={allHotelImages}
//                     mainImage={mainImage}
//                     onImageSelect={handleImageSelect}
//                 />

//                 <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
//                     <div className="lg:col-span-2 space-y-16">
//                         <SeasonInfoSection season={currentSeason} />
//                         <TextCategoriesSection categories={textCategories} />
//                         <OfferList 
//                             offers={offers}
//                             currency={currency}
//                             onStartBooking={handleStartBooking}
//                             isBookingLoading={isBookingLoading}
//                             bookingError={bookingError}
//                         />
//                          <PaymentPlanSection 
//                             paymentPlanInfo={hotel.paymentPlanInfo} 
//                             currency={currency}
//                          />
//                         <RoomList rooms={rooms} />
//                     </div>

//                     <HotelSidebar facilities={allFacilities} hotel={hotel} />
//                 </div>
//             </div>

//             {isModalOpen && (
//                 <ImageGalleryModal
//                     images={allHotelImages}
//                     currentIndex={currentImageIndex}
//                     onClose={closeImageModal}
//                     onNavigate={navigateImage}
//                 />
//             )}
//         </div>
//     );
// };
//!!!!!!!!!!!!!!

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../api/santsgApi';
import { Spinner } from '../components/common/Spinner';
import { HotelHeader } from '../components/HotelHero/HotelHeader';
import { ImageThumbnails } from '../components/HotelHero/ImageThumbnails';
import { ImageGalleryModal } from '../components/HotelHero/ImageGalleryModal';
import { OfferList } from '../components/HotelDetail/OfferList';
import { RoomList } from '../components/HotelDetail/RoomList';
import { HotelSidebar } from '../components/HotelDetail/HotelSidebar';
import { TextCategoriesSection } from '../components/HotelDetail/TextCategoriesSection';
import { PaymentPlanSection } from '../components/HotelDetail/PaymentPlanSection';
import { SeasonInfoSection } from '../components/HotelDetail/SeasonInfoSection';


// --- Main Component ---
export const HotelDetail = ({ onBack }) => {
    const { productId, providerId, searchId, currency, offerId } = useParams();
    const navigate = useNavigate();

    // --- State Management ---
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isBookingLoading, setIsBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState(null);
    
    // --- Data Fetching ---
    useEffect(() => {
        const fetchHotelDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!productId || !providerId || !searchId || !currency || !offerId) {
                    setError("Gerekli otel bilgileri URL'de bulunamadı.");
                    setLoading(false);
                    return;
                }

                const staticInfoResponse = await api.getProductInfo(productId, providerId);
                const offersRequestParams = {
                    searchId, offerId, productId, currency,
                    productType: 2, culture: "en-US", getRoomInfo: true,
                };
                const offersResponse = await api.getOffers(offersRequestParams);

                if (!staticInfoResponse) {
                    throw new Error("Otel statik bilgileri alınamadı.");
                }

                const mergedHotelData = {
                    ...staticInfoResponse,
                    offers: offersResponse.body?.offers || [],
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

    // --- Handlers ---
    const allHotelImages = hotel?.seasons?.flatMap(s => s.mediaFiles || []) || [];

    const openImageModal = (index = 0) => {
        setCurrentImageIndex(index);
        setIsModalOpen(true);
    };

    const closeImageModal = () => setIsModalOpen(false);

    const navigateImage = (direction) => {
        const totalImages = allHotelImages.length;
        if (totalImages === 0) return;
        let newIndex = (currentImageIndex + direction + totalImages) % totalImages;
        setCurrentImageIndex(newIndex);
        setMainImage(allHotelImages[newIndex].urlFull);
    };

    const handleImageSelect = (url, index) => {
        if (!url || mainImage === url) return;
        setIsImageLoading(true);
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setMainImage(url);
            setIsImageLoading(false);
            if (index !== undefined) setCurrentImageIndex(index);
        };
        img.onerror = () => setIsImageLoading(false);
    }

    const handleStartBooking = async (offerToBook) => {
        setIsBookingLoading(true);
        setBookingError(null);
        try {
            if (!offerToBook?.offerId) {
                throw new Error("Rezervasyon için geçerli bir teklif seçilmedi.");
            }
            const requestBody = {
                offerIds: [offerToBook.offerId],
                currency: offerToBook.price.currency || currency || "EUR",
                culture: "en-US"
            };
            const transactionResponse = await api.beginTransaction(requestBody);
            if (transactionResponse?.header?.success) {
                navigate('/booking', {
                    state: {
                        offerDetails: offerToBook,
                        transactionData: transactionResponse.body,
                        mainHotelImage: mainImage,
                        hotel: hotel
                    }
                });
            } else {
                const errorMessage = transactionResponse?.header?.messages[0]?.message || "Rezervasyon başlatılamadı.";
                setBookingError(errorMessage);
            }
        } catch (e) {
            console.error("Begin Transaction Hatası:", e);
            setBookingError(e.message || "Rezervasyon başlatılırken bir hata oluştu.");
        } finally {
            setIsBookingLoading(false);
        }
    };
    
    // --- Render Logic ---
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16 px-6 bg-[#f9f7f3] rounded-xl shadow-md min-h-[60vh]">
                <Spinner />
                <p className="mt-4 text-xl font-semibold text-gray-700">Otel Detayları Yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                {error}
            </div>
        );
    }

    if (!hotel) {
        return <div className="text-center p-10"><p>Otel verisi bulunamadı veya yüklenemedi.</p></div>;
    }

    const allFacilities = hotel?.seasons?.flatMap(s => s.facilityCategories?.flatMap(fc => fc.facilities || []) || []) || [];
    const textCategories = hotel?.seasons?.[0]?.textCategories || [];
    const offers = hotel?.offers || [];
    const rooms = hotel?.rooms || [];
    const currentSeason = hotel.seasons?.[0];

    return (
        <div className="bg-[#F9F7F3] text-[#093B5A] min-h-screen font-sans overflow-x-hidden">
            <div className="relative z-10 container mx-auto p-4 sm:p-6 lg:p-8">
                <button onClick={onBack} className="inline-flex items-center font-semibold mb-8 bg-white/60 backdrop-blur-md pr-5 pl-3 py-2 rounded-full border border-gray-200/80 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 group">
                    <ArrowLeft className="h-6 w-6 mr-2 text-gray-500 transition-transform duration-300 group-hover:-translate-x-1" />
                    Sonuçlara Geri Dön
                </button>

                <HotelHeader 
                    hotel={hotel} 
                    mainImage={mainImage} 
                    isImageLoading={isImageLoading} 
                    onOpenGallery={() => openImageModal(currentImageIndex)}
                />
                
                <ImageThumbnails
                    images={allHotelImages}
                    mainImage={mainImage}
                    onImageSelect={handleImageSelect}
                />

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-16">
                        <SeasonInfoSection season={currentSeason} />
                        <TextCategoriesSection categories={textCategories} />
                        <OfferList 
                            offers={offers}
                            currency={currency}
                            onStartBooking={handleStartBooking}
                            isBookingLoading={isBookingLoading}
                            bookingError={bookingError}
                        />
                        <PaymentPlanSection 
                            paymentPlanInfo={hotel.paymentPlanInfo} 
                            currency={currency}
                        />
                        <RoomList rooms={rooms} />
                    </div>

                    <HotelSidebar facilities={allFacilities} hotel={hotel} />
                </div>
            </div>

            {isModalOpen && (
                <ImageGalleryModal
                    images={allHotelImages}
                    currentIndex={currentImageIndex}
                    onClose={closeImageModal}
                    onNavigate={navigateImage}
                />
            )}
        </div>
    );
};
