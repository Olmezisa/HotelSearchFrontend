// src/components/detail/OfferDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, BedDouble, MapPin, Star } from 'lucide-react';
import { api } from '../../api/santsgApi';
import { Spinner } from '../common/Spinner';

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
                className={`h-5 w-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
            />
        ))}
    </div>
);


export const OfferDetail = ({ onBack }) => {
    const { offerId, currency } = useParams();
    const [offerDetails, setOfferDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- YENİ EKLENEN STATE'LER ---
    const [mainImage, setMainImage] = useState('');
    const [isImageLoading, setIsImageLoading] = useState(true);

    useEffect(() => {
        const fetchOfferDetails = async () => {
            if (!offerId || !currency) {
                setError("Teklif ID'si veya para birimi URL'de bulunamadı.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setIsImageLoading(true); // Resim yüklenmesini başlat
            try {
                const response = await api.getOfferDetails([offerId], currency);
                if (response?.body?.offerDetails?.length > 0) {
                    const details = response.body.offerDetails[0];
                    setOfferDetails(details);
                    
                    // --- YENİ EKLENEN BÖLÜM: Ana resmi ayarla ---
                    const hotelData = details.hotels?.[0];
                    if (hotelData) {
                        const firstImage = hotelData.seasons?.[0]?.mediaFiles?.[0]?.urlFull || hotelData.thumbnailFull;
                        setMainImage(firstImage || null);
                    }
                } else {
                    throw new Error("Teklif detayları alınamadı veya belirtilen teklif bulunamadı.");
                }
            } catch (err) {
                console.error("Teklif detayı API hatası:", err);
                setError(err.message || "Teklif detayları yüklenirken bir sorun oluştu.");
            } finally {
                setLoading(false);
                setIsImageLoading(false); // Resim yüklenmesini bitir
            }
        };

        fetchOfferDetails();
    }, [offerId, currency]);

    // --- YENİ EKLENEN FONKSİYON ---
    const handleImageSelect = (url) => {
        if (!url || mainImage === url) return;
        setIsImageLoading(true);
        const img = new Image();
        img.src = url;
        img.onload = () => { setMainImage(url); setIsImageLoading(false); };
        img.onerror = () => setIsImageLoading(false);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <Spinner />
                <p className="mt-4 text-xl font-semibold text-gray-700">Teklif Detayları Yükleniyor...</p>
            </div>
        );
    }

    if (error) {
        return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>;
    }

    if (!offerDetails) {
        return <div className="text-center p-10"><p>Teklif detayı bulunamadı.</p></div>;
    }

    const hotel = offerDetails.hotels?.[0];
    const roomOffer = hotel?.offers?.[0]?.rooms?.[0];
    const allHotelImages = hotel?.seasons?.[0]?.mediaFiles || [];

    return (
        <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg font-sans">
            <button onClick={onBack} className="inline-flex items-center font-semibold mb-8 text-slate-600 hover:text-slate-900 transition-all duration-300 group">
                <ArrowLeft className="h-6 w-6 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Geri Dön
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {hotel && (
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            {/* --- YENİ EKLENEN BÖLÜM: Resim Galerisi --- */}
                            <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden mb-4 bg-gray-200">
                                <div className={`absolute inset-0 transition-all duration-500 ${isImageLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
                                    <img 
                                        src={mainImage || 'https://placehold.co/800x600/e2e8f0/94a3b8?text=Resim+Bulunamadı'} 
                                        alt="Ana Otel Resmi" 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            </div>
                            {allHotelImages.length > 1 && (
                                <div className="flex space-x-2 overflow-x-auto pb-2">
                                    {allHotelImages.map((media, index) => (
                                        <img
                                            key={index}
                                            src={media.urlFull}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`flex-shrink-0 w-24 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all ${mainImage === media.urlFull ? 'border-rose-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                            onClick={() => handleImageSelect(media.urlFull)}
                                        />
                                    ))}
                                </div>
                            )}
                            {/* --- Resim Galerisi Bitişi --- */}

                            <div className="flex justify-between items-start mt-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-800">{hotel.name}</h1>
                                    <p className="text-lg text-slate-500 mt-1 flex items-center">
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

                    <div className="p-6 bg-white rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                            <Calendar className="h-6 w-6 mr-3 text-rose-500"/> Seyahat Tarihleri
                        </h2>
                        <div className="flex justify-between items-center text-center">
                            <div>
                                <p className="font-semibold text-slate-500 text-sm">GİRİŞ TARİHİ</p>
                                <p className="text-lg text-slate-800 font-bold">{formatDate(offerDetails.checkIn)}</p>
                            </div>
                            <div className="text-2xl text-slate-300">→</div>
                            <div>
                                <p className="font-semibold text-slate-500 text-sm">ÇIKIŞ TARİHİ</p>
                                <p className="text-lg text-slate-800 font-bold">{formatDate(offerDetails.checkOut)}</p>
                            </div>
                        </div>
                    </div>

                    {roomOffer && (
                         <div className="p-6 bg-white rounded-xl shadow-md">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                                <BedDouble className="h-6 w-6 mr-3 text-rose-500"/> Konaklama Detayları
                            </h2>
                            <div>
                                <p className="text-xl font-semibold text-slate-700">{roomOffer.roomName}</p>
                                <p className="text-md text-slate-500">{roomOffer.boardName}</p>
                            </div>
                        </div>
                    )}
                </div>

                <aside className="space-y-6 lg:sticky lg:top-8 self-start">
                    <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-rose-500">
                        <h2 className="text-xl font-bold text-slate-800 mb-4">Ödenecek Tutar</h2>
                        <p className="text-4xl font-extrabold text-rose-600">
                            {offerDetails.passengerAmountToPay?.amount 
                                ? `${offerDetails.passengerAmountToPay.amount.toFixed(2)} ${offerDetails.passengerAmountToPay.currency}`
                                : 'Fiyat Bilgisi Yok'
                            }
                        </p>
                        <p className={`mt-4 font-semibold ${!offerDetails.refundable ? 'text-red-600' : 'text-green-600'}`}>
                            {!offerDetails.refundable ? 'İptal Edilemez' : 'İptal Edilebilir'}
                        </p>
                        <button className="w-full mt-6 py-3 px-4 bg-rose-500 text-white font-bold rounded-lg shadow-md hover:bg-rose-600 transition-all duration-300 disabled:opacity-50" disabled={!offerDetails.passengerAmountToPay?.amount}>
                            Hemen Rezervasyon Yap
                        </button>
                    </div>

                    {offerDetails.cancellationPolicies?.length > 0 && (
                        <div className="p-6 bg-white rounded-xl shadow-md">
                            <h3 className="text-xl font-bold text-slate-800 mb-3">İptal Politikası</h3>
                            <ul className="list-disc list-inside text-slate-600 space-y-1">
                                {offerDetails.cancellationPolicies.map((policy, index) => (
                                    <li key={index}>
                                        <strong>{formatDate(policy.dueDate)}</strong> tarihine kadar
                                        {policy.price?.amount 
                                            ? ` ${policy.price.amount} ${policy.price.currency} ceza uygulanır.`
                                            : ` ceza uygulanır.`
                                        }
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};