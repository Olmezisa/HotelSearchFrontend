import React from 'react';
import { MapPin } from 'lucide-react';
import StarRating from '../common/StarRating';

export const HotelHeader = ({ hotel, mainImage, isImageLoading, onOpenGallery }) => (
    <div 
        className="relative w-full h-[60vh] md:h-[75vh] rounded-3xl overflow-hidden flex items-end p-8 md:p-12 shadow-2xl border cursor-pointer"
        onClick={onOpenGallery}
    >
        <div className={`absolute inset-0 transition-opacity duration-1000 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}>
            <img
                src={mainImage || 'https://placehold.co/1200x800/b5e2fa/093b5a?text=Resim+Bulunamadı'}
                alt="Bulanık Arka Plan"
                className="w-full h-full object-cover filter blur-lg scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
        </div>

        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}>
            <img
                src={mainImage || 'https://placehold.co/1200x800/b5e2fa/093b5a?text=Resim+Bulunamadı'}
                alt="Ana Otel Resmi"
                className="w-full h-full object-contain"
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
);