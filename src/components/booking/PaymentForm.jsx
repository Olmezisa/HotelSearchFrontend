import React from 'react';
import { VisaIcon, VisaElectronIcon, MastercardIcon, MaestroIcon, AmericanExpressIcon } from '../../assets/icons';

export const PaymentForm = ({ paymentInfo, onInputChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-7 border border-[#88B8D2]/20">
            <h3 className="text-2xl font-bold text-[#093B5A] mb-5 border-b border-[#88B8D2]/30 pb-3">ÖDEME BİLGİLERİ</h3>
            <div className="mb-6">
                 <h4 className="text-base font-medium text-[#2781B9] mb-3 text-center">Banka/Kredi Kartı</h4>
                 <div className="flex flex-wrap justify-center items-center gap-4">
                     <div className="h-8 w-16 bg-white border border-[#88B8D2]/30 rounded flex items-center justify-center"><VisaIcon /></div>
                     <div className="h-8 w-16 bg-white border border-[#88B8D2]/30 rounded flex items-center justify-center"><VisaElectronIcon /></div>
                     <div className="h-8 w-16 bg-white border border-[#88B8D2]/30 rounded flex items-center justify-center"><MastercardIcon /></div>
                     <div className="h-8 w-16 bg-white border border-[#88B8D2]/30 rounded flex items-center justify-center"><MaestroIcon /></div>
                     <div className="h-8 w-16 bg-white border border-[#88B8D2]/30 rounded flex items-center justify-center"><AmericanExpressIcon /></div>
                     <div className="bg-[#2781B9] text-white px-3 py-1 rounded text-sm font-bold h-8 flex items-center">troy</div>
                 </div>
            </div>
            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-[#2781B9] mb-2">Kart Numarası *</label>
                    <input type="text" value={paymentInfo.cardNumber} onChange={(e) => onInputChange(null, 'cardNumber', e.target.value)} className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9]" placeholder="**** **** **** ****" maxLength="19" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#2781B9] mb-2">Kart Sahibi *</label>
                    <input type="text" value={paymentInfo.cardHolder} onChange={(e) => onInputChange(null, 'cardHolder', e.target.value)} className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9]" placeholder="Kart üzerindeki isim" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-[#2781B9] mb-2">Son Kullanma Tarihi *</label>
                        <select className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9]" required onChange={(e) => onInputChange(null, 'expiryMonth', e.target.value)}>
                            <option value="">Ay</option>
                            {[...Array(12)].map((_, i) => (<option key={i} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#2781B9] mb-2">&nbsp;</label>
                        <select className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9]" required onChange={(e) => onInputChange(null, 'expiryYear', e.target.value)}>
                            <option value="">Yıl</option>
                            {[...Array(10)].map((_, i) => (<option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>))}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#2781B9] mb-2">CVV *</label>
                    <input type="text" value={paymentInfo.cvv} onChange={(e) => onInputChange(null, 'cvv', e.target.value)} className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9]" placeholder="***" maxLength="4" required />
                </div>
            </div>
             <div className="mt-6">
                 <h4 className="text-base font-medium text-[#2781B9] mb-3">Taksit Seçeneği</h4>
                 <select className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9]">
                     <option>Tek Çekim</option>
                     {[2, 3, 6, 9, 12].map(t => <option key={t}>{t} Taksit</option>)}
                 </select>
             </div>
        </div>
    );
};