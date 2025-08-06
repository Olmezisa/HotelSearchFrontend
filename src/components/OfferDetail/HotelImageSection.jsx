import React from 'react';
import { MapPin } from 'lucide-react';
import StarRating from '../common/StarRating';
import { ImageThumbnails } from '../HotelHero/ImageThumbnails';

export const HotelImageSection = ({ hotel, mainImage, isImageLoading, imageError, allHotelImages, onImageSelect, onShowModal, onImageLoad, onImageError }) => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-md border border-[#88B8D2]/20">
            {/* Resim Galerisi */}
            <div className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden mb-4 bg-[#88B8D2]/10">
                {isImageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#88B8D2]/30 z-10">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2781B9] mx-auto mb-2"></div>
                            <p className="text-[#093B5A] text-sm font-semibold">Görsel Yükleniyor...</p>
                        </div>
                    </div>
                )}
                <img
                    key={mainImage}
                    src={mainImage || 'https://placehold.co/800x600/093B5A/F9F7F3?text=Resim+Bulunamadı'}
                    alt="Ana Otel Resmi"
                    className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={onImageLoad}
                    onError={onImageError}
                    onClick={onShowModal}
                />
            </div>

            {allHotelImages.length > 1 && (
                <ImageThumbnails
                    images={allHotelImages}
                    mainImage={mainImage}
                    onImageSelect={onImageSelect}
                />
            )}

            <div className="flex justify-between items-start mt-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#093B5A]">{hotel.name}</h1>
                    <p className="text-lg text-[#2781B9] mt-1 flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        {hotel.location?.name && `${hotel.location.name}, `}
                        {hotel.city?.name}, {hotel.country?.name}
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <StarRating rating={hotel.stars} />
                </div>
            </div>
        </div>
    );
};