import React from 'react';
import { BedDouble } from 'lucide-react';
import { FacilityIcon } from '../../assets/icons/FacilityIcon';
import { formatDate } from './formatDate';

export const AccommodationDetailsCard = ({ hotel, roomOffer, offerDetails }) => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-md border border-[#88B8D2]/20">
            <h2 className="text-2xl font-bold text-[#093B5A] mb-4 flex items-center">
                <BedDouble className="h-6 w-6 mr-3 text-[#D48A61]" /> Konaklama Detayları
            </h2>
            <div className="bg-[#F9B18B]/10 p-4 rounded-lg space-y-2">
                <p className="text-xl font-semibold text-[#093B5A]">{roomOffer.roomName}</p>
                <p className="text-md text-[#2781B9]">{roomOffer.boardName}</p>
                {/* Diğer detaylar... */}
                {/* ... (Misafir Sayısı, Bölge, Oda Özellikleri, Fiyatlar, Durum) */}
                 {roomOffer.travellers?.length && (
                    <p className="text-sm text-[#093B5A]">
                        Misafir Sayısı: <span className="font-semibold">{roomOffer.travellers.length}</span>
                    </p>
                )}
                {hotel.location?.name && (
                    <p className="text-sm text-[#093B5A]">
                        Bölge: <span className="font-semibold">{hotel.location.name}</span>
                    </p>
                )}
                {hotel.rooms?.[0]?.facilities?.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-bold text-[#093B5A] mb-2">Oda Özellikleri:</h4>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#2781B9]">
                            {hotel.rooms[0].facilities.map((facility, index) => (
                                <div key={index} className="flex items-center">
                                    <FacilityIcon name={facility.name} />
                                    <span>{facility.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                 <div className="mt-4">
                    <h4 className="text-md font-bold text-[#093B5A] mb-2">Gecelik Fiyatlar:</h4>
                    <ul className="text-sm text-[#2781B9] space-y-1">
                        {offerDetails.priceBreakdowns?.map((item, i) => (
                            <li key={i} className="flex justify-between">
                                <span>{formatDate(item.date)}</span>
                                <span className="text-[#093B5A] font-medium">
                                    {item.price?.amount} {item.price?.currency}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="mt-4 text-sm">
                    <p className={`font-bold ${offerDetails.available ? 'text-green-600' : 'text-red-500'}`}>
                        Rezervasyon Durumu: {offerDetails.available ? 'Müsait' : 'Müsait Değil'}
                    </p>
                    <p className={`font-bold ${offerDetails.refundable ? 'text-green-600' : 'text-red-500'}`}>
                        İade: {offerDetails.refundable ? 'Mümkün' : 'Değil'}
                    </p>
                </div>
            </div>
        </div>
    );
};