import React from 'react';
import { CreditCard } from 'lucide-react';

export const PriceSummary = ({ totalPrice, currency, onBooking, isBooking, error }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-7 border-2 border-[#D48A61]">
            <h3 className="text-2xl font-bold text-[#093B5A] mb-4">Fiyat Özeti</h3>
            <div className="bg-gradient-to-r from-[#EDDEA4]/20 to-[#FBCFB7]/20 p-4 rounded-lg mb-6 text-center">
                <p className="text-sm text-[#AC440B]">Toplam Tutar</p>
                <p className="text-4xl font-extrabold text-[#AC440B]">{totalPrice.toFixed(2)} {currency}</p>
            </div>
            <button
                onClick={onBooking}
                disabled={isBooking}
                className="w-full flex items-center justify-center bg-gradient-to-r from-[#D48A61] to-[#AC440B] text-white font-bold py-4 px-4 rounded-lg shadow-md hover:from-[#AC440B] hover:to-[#D48A61] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
                {isBooking ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
                        <span>Rezervasyon Yapılıyor...</span>
                    </>
                ) : (
                    <>
                        <CreditCard className="w-6 h-6 mr-3" />
                        <span>Rezervasyonu Tamamla</span>
                    </>
                )}
            </button>
            {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
        </div>
    );
};