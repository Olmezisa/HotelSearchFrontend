import React from 'react';
import { Phone, Printer, Link as LinkIcon, Globe } from 'lucide-react';
import { FacilityIcon } from '../../assets/icons/HotelIcons';

const FacilitiesSection = ({ facilities }) => {
    if (!facilities || facilities.length === 0) return null;
    return (
        <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">Tesis Olanakları</h3>
            <div className="space-y-4">
                {facilities.slice(0, 10).map(facility => (
                    <div key={facility.id} className="flex items-center text-lg text-slate-700">
                        <FacilityIcon name={facility.name} />
                        <span>{facility.name}</span>
                        {(facility.isPriced || facility.priced) && (
                            <span className="ml-1 text-sm text-amber-600 font-medium">(Ücretli)</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

const ContactSection = ({ hotel }) => {
    if (!hotel.phoneNumber && !hotel.faxNumber && !hotel.homePage) return null;
    return (
        <div className="p-8 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-slate-800">İletişim Bilgileri</h3>
            <div className="space-y-4">
                {hotel.phoneNumber && (
                    <div className="flex items-center text-lg text-slate-700">
                        <Phone className="h-5 w-5 mr-3 text-[#88B8D2] flex-shrink-0" />
                        <a href={`tel:${hotel.phoneNumber}`} className="hover:text-rose-600 transition-colors">{hotel.phoneNumber}</a>
                    </div>
                )}
                {hotel.faxNumber && (
                    <div className="flex items-center text-lg text-slate-700">
                        <Printer className="h-5 w-5 mr-3 text-[#88B8D2] flex-shrink-0" />
                        <span>{hotel.faxNumber}</span>
                    </div>
                )}
                {hotel.homePage && (
                     <div className="flex items-center text-lg text-slate-700">
                        <LinkIcon className="h-5 w-5 mr-3 text-[#88B8D2] flex-shrink-0" />
                        <a href={hotel.homePage} target="_blank" rel="noopener noreferrer" className="hover:text-rose-600 transition-colors">Resmi Web Sitesi</a>
                    </div>
                )}
                 {hotel.location?.latitude && hotel.location?.longitude && (
                    <div className="text-center mt-6">
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${hotel.location.latitude},${hotel.location.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-start text-base font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-[#D48A61] to-[#AC440B] text-white shadow-lg transition-all duration-300 transform hover:scale-105"
                        >
                            <Globe className="h-5 w-5 mr-2" /> Haritada Gör
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}


export const HotelSidebar = ({ facilities, hotel }) => (
    <aside className="lg:sticky lg:top-8 self-start space-y-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <FacilitiesSection facilities={facilities} />
        <ContactSection hotel={hotel} />
    </aside>
);