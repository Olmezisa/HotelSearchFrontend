import React from 'react';
import { BedDouble } from 'lucide-react';
import { FacilityIcon } from '../../assets/icons/HotelIcons';

export const RoomList = ({ rooms }) => {
    if (!rooms || rooms.length === 0) return null;

    return (
        <section className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-4xl font-bold mb-6 text-[#2883BB] flex items-center">
                <BedDouble className="h-9 w-9 mr-4" /> Oda Seçenekleri
            </h3>
            <div className="space-y-8">
                {rooms.map(room => (
                    <div key={room.id || room.code} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md">
                        <h4 className="font-bold text-2xl text-slate-800 mb-4">{room.name}</h4>
                        {room.mediaFiles && room.mediaFiles.length > 0 && (
                            <div className="flex space-x-3 pb-4 mb-4 border-b overflow-x-auto">
                                {room.mediaFiles.map((img, idx) => (
                                    <img key={idx} src={img.urlFull} alt={`${room.name} ${idx + 1}`} className="flex-shrink-0 w-40 h-28 object-cover rounded-lg shadow-sm" />
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
                                            {(facility.isPriced || facility.priced) && (
                                                <span className="ml-1 text-xs text-amber-600 font-medium">(Ücretli)</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};