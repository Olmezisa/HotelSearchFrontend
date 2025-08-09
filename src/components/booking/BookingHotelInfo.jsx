import React from 'react';
import { Star, MapPin, Calendar, Users } from 'lucide-react';

export const BookingHotelInfo = ({ hotelData, mainHotelImage, offerDetails }) => {

    // Yatak düzeni metnini oluşturma
    let bedLayoutText = '';
    const adults = hotelData.guestDetails?.adults || 0;
    const children = hotelData.guestDetails?.children || 0;

    if (adults === 1 && children === 0) {
        bedLayoutText = '1 Tek Kişilik Yatak';
    } else if (adults > 1 && children === 0) {
        const doubleBeds = Math.floor(adults / 2);
        const singleBeds = adults % 2;

        let beds = [];
        if (doubleBeds > 0) {
            beds.push(`${doubleBeds} Çift Kişilik Yatak`);
        }
        if (singleBeds > 0) {
            beds.push(`${singleBeds} Tek Kişilik Yatak`);
        }
        bedLayoutText = beds.join(' + ');
    } else if (adults > 0 && children > 0) {
        const doubleBeds = Math.floor(adults / 2);
        const singleBeds = adults % 2;
        const childBeds = children;

        let beds = [];
        if (doubleBeds > 0) {
            beds.push(`${doubleBeds} Çift Kişilik Yatak`);
        }
        if (singleBeds > 0) {
            beds.push(`${singleBeds} Tek Kişilik Yatak`);
        }
        if (childBeds > 0) {
            beds.push(`${childBeds} Tek kişilik Yatak`);
        }
        bedLayoutText = beds.join(' + ');
    }

    // `hotelData.guests` string'inden misafirleri ayıralım
    const guestsText = hotelData.guests || 'N/A';

    return (
        <div className="bg-white rounded-xl shadow-lg p-7 border border-[#88B8D2]/20">
            <h2 className="text-2xl font-bold text-[#093B5A] mb-5 border-b border-[#88B8D2]/30 pb-3">KONAKLAMA BİLGİLERİ</h2>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                <div className="w-full md:w-36 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-[#88B8D2]/20">
                    <img
                        src={mainHotelImage || 'https://placehold.co/144x112/093B5A/F9F7F3?text=Görsel+Yok'}
                        alt="Otel Görseli"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="font-extrabold text-2xl text-[#093B5A] mb-1">{hotelData.name}</h3>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-5 h-5 ${i < hotelData.rating ? 'text-[#EDDEA4] fill-[#EDDEA4]' : 'text-[#88B8D2]'}`} />
                            ))}
                        </div>
                        {hotelData.rating > 0 && <span className="bg-[#2781B9] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">{hotelData.rating}</span>}
                    </div>
                    <p className="text-base text-[#2781B9] flex items-center"><MapPin className="w-5 h-5 mr-2 text-[#88B8D2]" />{hotelData.location}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-base mb-6 border-t border-[#EDDEA4]/30 pt-5">
                <div>
                    <span className="text-[#2781B9] font-medium">Giriş Tarihi:</span>
                    <div className="font-semibold text-[#093B5A] flex items-center mt-1"><Calendar className="w-5 h-5 mr-2 text-[#D48A61]" />{hotelData.checkIn} <span className="ml-2 text-[#88B8D2]">({hotelData.checkInTime})</span></div>
                </div>
                <div>
                    <span className="text-[#2781B9] font-medium">Çıkış Tarihi:</span>
                    <div className="font-semibold text-[#093B5A] flex items-center mt-1"><Calendar className="w-5 h-5 mr-2 text-[#D48A61]" />{hotelData.checkOut} <span className="ml-2 text-[#88B8D2]">({hotelData.checkOutTime})</span></div>
                </div>
                <div>
                    <span className="text-[#2781B9] font-medium">Misafir Sayısı:</span>
                    <div className="font-semibold text-[#093B5A] flex items-center mt-1"><Users className="w-5 h-5 mr-2 text-[#D48A61]" />{guestsText}</div>
                </div>
                <div>
                    <span className="text-[#2781B9] font-medium">Konaklama Süresi:</span>
                    <div className="font-semibold text-[#093B5A] flex items-center mt-1"><Calendar className="w-5 h-5 mr-2 text-[#D48A61]" />{hotelData.nights}</div>
                </div>
            </div>

            <div className="mb-6 border-t border-[#EDDEA4]/30 pt-5">
                <div className="text-[#2781B9] text-lg font-medium">Oda Tipi:<span className="font-bold text-[#093B5A] text-base mt-1 ml-2">{hotelData.roomType}</span></div>

                {/* Yatak sayısını dinamik olarak gösteren kısım */}
                <div className="mt-2 text-[#093B5A] text-sm">
                    {hotelData.totalGuests > 0 && (
                        <span className="text-[#2781B9] text-lg font-medium">
                            Oda Kapasitesi: <span className="font-bold text-[#093B5A] text-base mt-1 ml-2">{hotelData.totalGuests} Kişilik Oda</span>
                        </span>
                    )}
                </div>

                {/* Dinamik yatak düzeni gösterimi */}
                <div className="mt-2 text-[#093B5A] text-sm">
                    {bedLayoutText && (
                        <div className="text-[#2781B9] text-lg font-medium">
                            Yatak Düzeni:<span className="font-bold text-[#093B5A] text-base mt-1 ml-2">{bedLayoutText}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-[#EDDEA4]/30 pt-5">
                {hotelData.features.map((feature, index) => (
                    <span key={index} className="bg-[#EDDEA4]/20 text-[#AC440B] px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-[#EDDEA4]/50">{feature}</span>
                ))}
            </div>

            {offerDetails?.refundable !== undefined && (
                <div className="mt-6 p-4 bg-[#F9F7F3] rounded-lg border border-[#88B8D2]/20">
                    <span className={`font-semibold text-base flex items-center ${!offerDetails.refundable ? 'text-[#AC440B]' : 'text-[#2781B9]'}`}>
                        {!offerDetails.refundable ? '❌ İptal Edilemez Rezervasyon' : '✅ İptal Edilebilir Rezervasyon'}
                    </span>
                    <p className="text-sm text-[#093B5A] mt-1">
                        {!offerDetails.refundable ? "Bu rezervasyon iptal edilemez ve iade yapılmaz." : "Bu rezervasyon belirli koşullar altında iptal edilebilir. Detaylar için iptal politikasını inceleyiniz."}
                    </p>
                </div>
            )}
        </div>
    );
};