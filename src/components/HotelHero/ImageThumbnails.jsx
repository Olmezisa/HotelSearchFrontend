import React from 'react';

export const ImageThumbnails = ({ images, mainImage, onImageSelect }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex space-x-4 pb-4 overflow-x-auto">
                {images.map((media, index) => (
                    <img
                        key={media.urlFull ? `${media.urlFull}-${index}` : index}
                        src={media.urlFull}
                        alt={`Thumbnail ${index + 1}`}
                        className={`flex-shrink-0 w-32 h-20 object-cover rounded-lg cursor-pointer transition-all duration-300 border-2 shadow-sm ${mainImage === media.urlFull ? 'border-[#f7a072] scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100'}`}
                        onClick={() => onImageSelect(media.urlFull, index)}
                    />
                ))}
            </div>
        </div>
    );
};