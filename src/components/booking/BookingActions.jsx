import React from 'react';
import { CreditCard, CheckCircle } from 'lucide-react';

export const BookingActions = ({ totalPrice, currency, onBooking, isBooking, error }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-7 border border-[#88B8D2]/20">
            <div className="bg-gradient-to-r from-[#EDDEA4]/30 to-[#F9B18B]/20 border border-[#D48A61]/30 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between">
                    <CheckCircle className="w-8 h-8 text-[#2781B9] flex-shrink-0" />
                    <div className="text-right flex-grow">
                        <div className="text-3xl font-extrabold text-[#AC440B]">
                            {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}
                        </div>
                        <div className="text-base text-[#2781B9] font-medium mt-1">toplam tutar</div>
                    </div>
                </div>
            </div>
            <div className="space-y-3 text-base mb-6 border-b border-[#EDDEA4]/30 pb-5">
                <div className="flex justify-between font-bold text-lg text-[#093B5A]">
                    <span>Toplam:</span>
                    <span>{totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
                </div>
            </div>
            <p className="text-center text-sm text-[#2781B9] mb-6 flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" /> Ödeme bilgileri 256-bit SSL ile korunmaktadır.
            </p>
            <div className="space-y-4 mb-8">
                <label className="flex items-start gap-3 text-sm text-[#093B5A]"><input type="checkbox" className="mt-1 w-5 h-5 text-[#D48A61] rounded focus:ring-[#D48A61]" required /><span>Üyelik şartlarını ve koşullarını kabul ediyorum *</span></label>
                <label className="flex items-start gap-3 text-sm text-[#093B5A]"><input type="checkbox" className="mt-1 w-5 h-5 text-[#D48A61] rounded focus:ring-[#D48A61]" required /><span>Kişisel Verilerin Korunması Kanunu çerçevesinde, gerekli izinlerin alınmasını ve kişisel veri işlenmesini onaylıyorum *</span></label>
                <label className="flex items-start gap-3 text-sm text-[#093B5A]"><input type="checkbox" className="mt-1 w-5 h-5 text-[#D48A61] rounded focus:ring-[#D48A61]" /><span>E-posta ve SMS ile bildirim almayı kabul ediyorum</span></label>
            </div>
            <button className="w-full bg-blue-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg mb-4">
                {'💳 Kartla Rezervasyon Tamamla'}
            </button>
            <button onClick={onBooking} className="w-full bg-gradient-to-r from-[#D48A61] to-[#AC440B] hover:from-[#AC440B] hover:to-[#D48A61] text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg" disabled={isBooking}>
                {isBooking ? 'Bilgiler Kaydediliyor...' : 'Hızlı Rezervasyon'}
            </button>
            {error && (<div className="bg-[#FBCFB7] border border-[#D48A61] text-[#AC440B] text-sm mt-2 p-2 rounded text-center">{error}</div>)}
            <p className="text-center text-xs text-[#2781B9] mt-4">Size <span className="text-[#AC440B] underline font-semibold">SANTSG 293 48 21</span> numaralı telefonumuzdan ulaşılacaktır.</p>
        </div>
    );
};