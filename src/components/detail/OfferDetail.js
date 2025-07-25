import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, BedDouble, MapPin, Star } from 'lucide-react';
import { api } from '../../api/santsgApi';
import { Spinner } from '../common/Spinner';
import { useNavigate } from 'react-router-dom';

// Tarihleri formatlamak için yardımcı fonksiyon
const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });
};

// Yıldızları göstermek için StarRating bileşeni
const StarRating = ({ rating, starCount = 5 }) => (
    <div className="flex items-center">
        {[...Array(starCount)].map((_, i) => (
            <Star
                key={`star-${i}`}
                className={`h-5 w-5 ${i < rating ? 'text-[#EDDEA4] fill-[#EDDEA4]' : 'text-[#88B8D2]'}`}
            />
        ))}
    </div>
);

export const OfferDetail = ({ onBack }) => {
    const { offerId, currency } = useParams();
    const [offerDetails, setOfferDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Resim galerisi için state'ler
    const [mainImage, setMainImage] = useState('');
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    // Rezervasyon butonu için yükleme ve hata state'leri
    const [isBookingLoading, setIsBookingLoading] = useState(false);
    const [bookingError, setBookingError] = useState(null);

    useEffect(() => {
        const fetchOfferDetails = async () => {
            if (!offerId || !currency) {
                setError("Teklif ID'si veya para birimi URL'de bulunamadı.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setIsImageLoading(true);
            setImageError(false);
            
            try {
                const response = await api.getOfferDetails([offerId], currency);
                if (response?.body?.offerDetails?.length > 0) {
                    const details = response.body.offerDetails[0];
                    setOfferDetails(details);

                    // Ana resmi ayarla
                    const hotelData = details.hotels?.[0];
                    if (hotelData) {
                        let imageUrl = null;
                        
                        if (hotelData.seasons?.[0]?.mediaFiles?.length > 0) {
                            imageUrl = hotelData.seasons[0].mediaFiles[0].urlFull;
                        }
                        else if (hotelData.thumbnailFull) {
                            imageUrl = hotelData.thumbnailFull;
                        }
                        else if (hotelData.thumbnail) {
                            imageUrl = hotelData.thumbnail;
                        }

                        console.log('Setting main image:', imageUrl);
                        
                        if (imageUrl) {
                            setMainImage(imageUrl);
                        } else {
                            setMainImage('https://placehold.co/800x600/093B5A/F9F7F3?text=Resim+Bulunamadı');
                            setImageError(true);
                        }
                    } else {
                        setMainImage('https://placehold.co/800x600/093B5A/F9F7F3?text=Otel+Bilgisi+Yok');
                        setImageError(true);
                    }
                } else {
                    throw new Error("Teklif detayları alınamadı veya belirtilen teklif bulunamadı.");
                }
            } catch (err) {
                console.error("Teklif detayı API hatası:", err);
                setError(err.message || "Teklif detayları yüklenirken bir sorun oluştu.");
                setMainImage('https://placehold.co/800x600/093B5A/F9F7F3?text=Hata+Oluştu');
                setImageError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchOfferDetails();
    }, [offerId, currency]);

    // Resim galerisi için resim seçme fonksiyonu
    const handleImageSelect = (url) => {
        if (!url || mainImage === url) return;
        
        console.log('Selecting new image:', url);
        setIsImageLoading(true);
        setImageError(false);
        
        const img = new Image();
        img.onload = () => {
            console.log('New image loaded successfully:', url);
            setMainImage(url);
            setIsImageLoading(false);
        };
        img.onerror = () => {
            console.error('Failed to load selected image:', url);
            setIsImageLoading(false);
            setImageError(true);
        };
        img.src = url;
    };

    // Rezervasyon butonuna tıklama olayını yöneten fonksiyon
    const handleReserveClick = async () => {
        setIsBookingLoading(true);
        setBookingError(null);

        try {
            const offerToBookId = offerDetails?.offerId;

            if (!offerToBookId) {
                throw new Error("Rezervasyon için teklif ID'si bulunamadı.");
            }

            const requestBody = {
                offerIds: [offerToBookId],
                currency: offerDetails.passengerAmountToPay?.currency || "EUR",
                culture: "en-US"
            };

            const transactionResponse = await api.beginTransaction(requestBody);

            if (transactionResponse.header.success) {
                console.log('Sending main image to booking page:', mainImage);
                
                navigate('/booking', {
                    state: {
                        offerDetails: offerDetails,
                        transactionData: transactionResponse.body,
                        mainHotelImage: mainImage
                    }
                });
            } else {
                setBookingError(transactionResponse.header.messages[0]?.message || "Rezervasyon başlatılamadı.");
            }
        } catch (e) {
            console.error("Begin Transaction Hatası:", e);
            setBookingError(e.message || "Rezervasyon başlatılırken bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16 bg-[#F9F7F3] min-h-screen">
                <Spinner />
                <p className="mt-4 text-xl font-semibold text-[#093B5A]">Teklif Detayları Yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-[#FBCFB7] border border-[#D48A61] text-[#AC440B] px-4 py-3 rounded-lg" role="alert">
                {error}
            </div>
        );
    }

    if (!offerDetails) {
        return (
            <div className="text-center p-10 bg-[#F9F7F3]">
                <p className="text-[#093B5A]">Teklif detayı bulunamadı.</p>
            </div>
        );
    }

    const hotel = offerDetails.hotels?.[0];
    const roomOffer = hotel?.offers?.[0]?.rooms?.[0];
    const allHotelImages = hotel?.seasons?.[0]?.mediaFiles || [];
    const totalAmount = offerDetails?.priceBreakdowns?.reduce((sum, item) => sum + (item.price?.amount || 0), 0);
    const displayCurrency = offerDetails?.priceBreakdowns?.[0]?.price?.currency || 'EUR';

    return (
        <div className="bg-[#F9F7F3] p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg font-sans min-h-screen">
            <button 
                onClick={onBack} 
                className="inline-flex items-center font-semibold mb-8 text-[#093B5A] hover:text-[#2781B9] transition-all duration-300 group"
            >
                <ArrowLeft className="h-6 w-6 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Geri Dön
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {hotel && (
                        <div className="p-6 bg-white rounded-xl shadow-md border border-[#88B8D2]/20">
                            {/* Resim Galerisi */}
                            <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden mb-4 bg-[#88B8D2]/10">
                                {/* Yükleme göstergesi */}
                                {isImageLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-[#88B8D2]/30 z-10">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2781B9] mx-auto mb-2"></div>
                                            <p className="text-[#093B5A] text-sm font-semibold">Görsel Yükleniyor...</p>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Ana görsel */}
                                <img
                                    key={mainImage}
                                    src={mainImage || 'https://placehold.co/800x600/093B5A/F9F7F3?text=Resim+Bulunamadı'}
                                    alt="Ana Otel Resmi"
                                    className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                                    onLoad={() => {
                                        console.log('Main image loaded successfully:', mainImage);
                                        setIsImageLoading(false);
                                        setImageError(false);
                                    }}
                                    onError={(e) => {
                                        console.error('Main image failed to load:', mainImage);
                                        if (!imageError) {
                                            e.target.src = 'https://placehold.co/800x600/093B5A/F9F7F3?text=Resim+Yüklenemedi';
                                            setImageError(true);
                                        }
                                        setIsImageLoading(false);
                                    }}
                                />
                            </div>
                            
                            {/* Küçük resim galerisi */}
                            {allHotelImages.length > 1 && (
                                <div className="flex space-x-2 overflow-x-auto pb-2">
                                    {allHotelImages.map((media, index) => (
                                        <img
                                            key={`thumb-${index}`}
                                            src={media.urlFull}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`flex-shrink-0 w-24 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 ${
                                                mainImage === media.urlFull 
                                                    ? 'border-[#D48A61] scale-105 opacity-100 shadow-md' 
                                                    : 'border-transparent opacity-70 hover:opacity-100 hover:scale-105 hover:border-[#2781B9]'
                                            }`}
                                            onClick={() => handleImageSelect(media.urlFull)}
                                            onError={(e) => {
                                                console.warn('Thumbnail failed to load:', media.urlFull);
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    ))}
                                </div>
                            )}

                            <div className="flex justify-between items-start mt-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-[#093B5A]">{hotel.name}</h1>
                                    <p className="text-lg text-[#2781B9] mt-1 flex items-center">
                                        <MapPin className="h-5 w-5 mr-2" />
                                        {hotel.city?.name}, {hotel.country?.name}
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <StarRating rating={hotel.stars} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-6 bg-white rounded-xl shadow-md border border-[#88B8D2]/20">
                        <h2 className="text-2xl font-bold text-[#093B5A] mb-4 flex items-center">
                            <Calendar className="h-6 w-6 mr-3 text-[#D48A61]" /> Seyahat Tarihleri
                        </h2>
                        <div className="flex justify-between items-center text-center">
                            <div className="bg-[#EDDEA4]/20 p-4 rounded-lg">
                                <p className="font-semibold text-[#2781B9] text-sm">GİRİŞ TARİHİ</p>
                                <p className="text-lg text-[#093B5A] font-bold">{formatDate(offerDetails.checkIn)}</p>
                            </div>
                            <div className="text-2xl text-[#88B8D2]">→</div>
                            <div className="bg-[#EDDEA4]/20 p-4 rounded-lg">
                                <p className="font-semibold text-[#2781B9] text-sm">ÇIKIŞ TARİHİ</p>
                                <p className="text-lg text-[#093B5A] font-bold">{formatDate(offerDetails.checkOut)}</p>
                            </div>
                        </div>
                    </div>

                    {roomOffer && (
                        <div className="p-6 bg-white rounded-xl shadow-md border border-[#88B8D2]/20">
                            <h2 className="text-2xl font-bold text-[#093B5A] mb-4 flex items-center">
                                <BedDouble className="h-6 w-6 mr-3 text-[#D48A61]" /> Konaklama Detayları
                            </h2>
                            <div className="bg-[#F9B18B]/10 p-4 rounded-lg">
                                <p className="text-xl font-semibold text-[#093B5A]">{roomOffer.roomName}</p>
                                <p className="text-md text-[#2781B9]">{roomOffer.boardName}</p>
                            </div>
                        </div>
                    )}
                </div>

                <aside className="space-y-6 lg:sticky lg:top-8 self-start">
                    <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-[#D48A61]">
                        <h2 className="text-xl font-bold text-[#093B5A] mb-4">Ödenecek Tutar</h2>
                        <div className="bg-gradient-to-r from-[#EDDEA4]/20 to-[#FBCFB7]/20 p-4 rounded-lg mb-4">
                            <p className="text-4xl font-extrabold text-[#AC440B]">
                                {totalAmount
                                    ? `${totalAmount.toFixed(2)} ${displayCurrency}`
                                    : 'Fiyat Bilgisi Yok'}
                            </p>
                            {offerDetails?.checkIn && offerDetails?.checkOut && totalAmount && (
                                <p className="text-sm text-[#2781B9] mt-1">
                                    {(() => {
                                        const checkIn = new Date(offerDetails.checkIn);
                                        const checkOut = new Date(offerDetails.checkOut);
                                        const nights = Math.max(
                                            Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)),
                                            1
                                        );
                                        const perNight = totalAmount / nights;
                                        return `(${nights} gece x ${perNight.toFixed(2)} ${displayCurrency})`;
                                    })()}
                                </p>
                            )}
                        </div>
                        
                        <button
                            onClick={handleReserveClick}
                            className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-[#D48A61] to-[#AC440B] text-white font-bold rounded-lg shadow-md hover:from-[#AC440B] hover:to-[#D48A61] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                            disabled={isBookingLoading}
                        >
                            {isBookingLoading ? 'Rezervasyon Başlatılıyor...' : 'Hemen Rezervasyon Yap'}
                        </button>
                        {bookingError && (
                            <div className="bg-[#FBCFB7] border border-[#D48A61] text-[#AC440B] text-sm mt-2 p-2 rounded text-center">
                                {bookingError}
                            </div>
                        )}
                    </div>

                    {offerDetails.cancellationPolicies?.length > 0 && (
                        <div className="p-6 bg-white rounded-xl shadow-md border border-[#88B8D2]/20">
                            <h3 className="text-xl font-bold text-[#093B5A] mb-3">İptal Politikası</h3>
                            <div className="bg-[#F9F7F3] p-4 rounded-lg">
                                <ul className="space-y-2">
                                    {offerDetails.cancellationPolicies.map((policy, index) => (
                                        <li key={index} className="flex items-start text-sm">
                                            <div className="w-2 h-2 bg-[#D48A61] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="text-[#093B5A]">
                                                <strong className="text-[#2781B9]">{formatDate(policy.dueDate)}</strong> tarihine kadar
                                                {policy.price?.amount
                                                    ? ` ${policy.price.amount} ${policy.price.currency} ceza uygulanır.`
                                                    : ` ceza uygulanır.`
                                                }
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};