import { XCircle, ChevronLeft, ChevronRight } from 'lucide-react'

export const ImageGalleryModal = ({ images, currentIndex, onClose, onNavigate }) => {
    if (!images || images.length === 0) return null;

    const currentImage = images[currentIndex];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-8">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50"
                aria-label="Kapat"
            >
                <XCircle className="h-10 w-10" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
                <img
                    src={currentImage?.urlFull || 'https://placehold.co/1200x800/b5e2fa/093b5a?text=Resim+Bulunamadı'}
                    alt="Büyük Otel Resmi"
                    className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg"
                />

                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => onNavigate(-1)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors z-40"
                            aria-label="Önceki Resim"
                        >
                            <ChevronLeft className="h-10 w-10" />
                        </button>
                        <button
                            onClick={() => onNavigate(1)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-colors z-40"
                            aria-label="Sonraki Resim"
                        >
                            <ChevronRight className="h-10 w-10" />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};