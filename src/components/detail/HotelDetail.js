import React, { useState, useEffect } from 'react';
// UYARI: 'Home' ve 'ImageIcon' importları kullanılmadığı için kaldırıldı.
import { ArrowLeft, MapPin, BedDouble, Star, Wifi, Wind, Tv2, UtensilsCrossed, Droplets, ParkingCircle, Sparkles, ShoppingCart } from 'lucide-react';


const ICONS = {
    'default': <Sparkles className="h-6 w-6 mr-4 text-rose-500 flex-shrink-0" />,
    'wifi': <Wifi className="h-6 w-6 mr-4 text-rose-500 flex-shrink-0" />,
    'internet': <Wifi className="h-6 w-6 mr-4 text-rose-500 flex-shrink-0" />,
    'air conditioning': <Wind className="h-6 w-6 mr-4 text-rose-500 flex-shrink-0" />,
    'klima': <Wind className="h-6 w-6 mr-4 text-rose-500 flex-shrink-0" />,
    'tv': <Tv2 className="h-6 w-6 mr-4 text-rose-500 flex-shrink-0" />,
    'restaurant': <UtensilsCrossed className="h-6 w-6 mr-4 text-rose-500 flex-shrink-0" />,
    'havuz': <Droplets className="h-6 w-6 mr-4 text-rose-500 flex-shrink-0" />,
    'otopark': <ParkingCircle className="h-6 w-6 mr-4 text-rose-500 flex-shrink-0" />,
};

const FacilityIcon = ({ name }) => {
    const normalizedName = name ? name.toLowerCase() : '';
    for (const key in ICONS) {
        if (normalizedName.includes(key)) return ICONS[key];
    }
    return ICONS['default'];
};
// --- İKON KÜTÜPHANESİ SONU ---

// Yıldızları göstermek için bileşen
const StarRating = ({ rating, starCount = 5 }) => (
    <div className="flex items-center">
        {[...Array(starCount)].map((_, i) => (
            <Star // Bu ikon artık kullanılıyor
                key={`star-${i}`} 
                className={`h-6 w-6 transition-all duration-300 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                style={{ filter: `drop-shadow(0 0 4px ${i < rating ? 'rgba(251, 191, 36, 0.5)' : 'transparent'})` }}
            />
        ))}
    </div>
);

// --- Tamamen Düzeltilmiş HotelDetail Bileşeni ---
export const HotelDetail = ({ hotel, onBack }) => {
    const [mainImage, setMainImage] = useState('');
    // Düzeltme: Bu state artık kullanılıyor
    const [isImageLoading, setIsImageLoading] = useState(true);
    
    useEffect(() => {
        const firstImage = hotel?.seasons?.[0]?.mediaFiles?.[0]?.urlFull || hotel?.thumbnailFull;
        setMainImage(firstImage || null);
        setIsImageLoading(false);
    }, [hotel]);

    // Düzeltme: Bu fonksiyon artık kullanılıyor
    const handleImageSelect = (url) => {
        if (!url || mainImage === url) return;
        setIsImageLoading(true);
        const img = new Image();
        img.src = url;
        img.onload = () => { setMainImage(url); setIsImageLoading(false); };
        img.onerror = () => setIsImageLoading(false);
    }

    if (!hotel) {
        return <div className="text-center p-10"><p>Otel verisi bekleniyor...</p></div>;
    }

    const allHotelImages = hotel?.seasons?.flatMap(s => s.mediaFiles || []) || [];
    const allFacilities = hotel?.seasons?.flatMap(s => s.facilityCategories?.flatMap(fc => fc.facilities || []) || []) || [];
    const textCategories = hotel?.seasons?.[0]?.textCategories || [];
    const rooms = hotel?.rooms || [];

    return (
        <div className="bg-gray-50 text-slate-800 min-h-screen font-sans overflow-x-hidden">
            <div className="relative z-10 container mx-auto p-4 sm:p-6 lg:p-8">
                <button onClick={onBack} className="inline-flex items-center font-semibold mb-8 bg-white/60 backdrop-blur-md pr-5 pl-3 py-2 rounded-full border border-gray-200/80 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 group">
                    <ArrowLeft className="h-6 w-6 mr-2 text-gray-500 transition-transform duration-300 group-hover:-translate-x-1" />
                    Sonuçlara Geri Dön
                </button>

                {/* GERİ EKLENDİ: Ana Başlık, Resim ve Yıldızları Gösteren Bölüm */}
                <div className="relative w-full h-[60vh] md:h-[75vh] rounded-3xl overflow-hidden flex items-end p-8 md:p-12 shadow-2xl border">
                    <div className={`absolute inset-0 transition-all duration-1000 ${isImageLoading ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
                        <img src={mainImage || 'https://placehold.co/1200x800/e2e8f0/94a3b8?text=Resim+Bulunamadı'} alt="Ana Otel Resmi" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
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

                {/* GERİ EKLENDİ: Küçük Resim Galerisi */}
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
                                <div className="text-lg text-slate-600 leading-relaxed prose" dangerouslySetInnerHTML={{ __html: cat.presentations?.[0]?.text || '' }}></div>
                            </section>
                        ))}
                        
                        {rooms.length > 0 && (
                            <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                                <h3 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500 flex items-center">
                                    <BedDouble className="h-9 w-9 mr-4"/> Oda Seçenekleri
                                </h3>
                                <div className="space-y-8">
                                    {rooms.map(room => (
                                        <div key={room.code || room.id} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md transition-all duration-300">
                                            <h4 className="font-bold text-2xl text-slate-800 mb-4">{room.name}</h4>
                                            
                                            {room.mediaFiles && room.mediaFiles.length > 0 && (
                                                <div className="flex space-x-3 pb-4 mb-4 border-b overflow-x-auto">
                                                    {room.mediaFiles.map((img, idx) => (
                                                        <img key={idx} src={img.urlFull} alt={`${room.name} ${idx+1}`} className="flex-shrink-0 w-40 h-28 object-cover rounded-lg shadow-sm" />
                                                    ))}
                                                </div>
                                            )}

                                            {room.presentations && room.presentations.length > 0 && (
                                                 <div className="text-md text-slate-600 leading-relaxed mb-4 prose" dangerouslySetInnerHTML={{ __html: room.presentations[0].text || '' }}></div>
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
                    </aside>
                </div>
            </div>
        </div>
    );
};