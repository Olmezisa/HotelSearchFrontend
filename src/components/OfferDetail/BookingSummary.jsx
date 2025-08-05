import React from 'react';

export const BookingSummary = ({ offerDetails, onReserveClick, isBookingLoading, bookingError }) => {
    const totalAmount = offerDetails?.priceBreakdowns?.reduce((sum, item) => sum + (item.price?.amount || 0), 0);
    const displayCurrency = offerDetails?.priceBreakdowns?.[0]?.price?.currency || 'EUR';

    const nightCalculation = () => {
        if (!offerDetails?.checkIn || !offerDetails?.checkOut || !totalAmount) return null;

        const checkIn = new Date(offerDetails.checkIn);
        const checkOut = new Date(offerDetails.checkOut);
        const nights = Math.max(Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)), 1);
        const perNight = totalAmount / nights;
        return `(${nights} gece x ${perNight.toFixed(2)} ${displayCurrency})`;
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border-2 border-[#D48A61]">
            <h2 className="text-xl font-bold text-[#093B5A] mb-4">Ödenecek Tutar</h2>
            <div className="bg-gradient-to-r from-[#EDDEA4]/20 to-[#FBCFB7]/20 p-4 rounded-lg mb-4">
                <p className="text-4xl font-extrabold text-[#AC440B]">
                    {totalAmount ? `${totalAmount.toFixed(2)} ${displayCurrency}` : 'Fiyat Bilgisi Yok'}
                </p>
                <p className="text-sm text-[#2781B9] mt-1">
                    {nightCalculation()}
                </p>
            </div>
            <button
                onClick={onReserveClick}
                className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-[#D48A61] to-[#AC440B] text-white font-bold rounded-lg shadow-md hover:from-[#AC440B] hover:to-[#D48A61] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                disabled={isBookingLoading}
            >
                {isBookingLoading ? 'Rezervasyon Başlatılıyor...' : 'Hemen Rezervasyon Yap'}
            </button>
            {bookingError && (
                <div className="bg-[#FBCFB7] border border-[#D48A61] text-[#AC440B] text-sm mt-2 p-2 rounded text-center">
                    {bookingError}
                </div>
            )}
        </div>
    );
};