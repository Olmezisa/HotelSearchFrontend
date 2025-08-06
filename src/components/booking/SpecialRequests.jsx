import React from 'react';

export const SpecialRequests = ({ specialRequests, onCheckboxChange, onTextChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-7 border border-[#88B8D2]/20">
            <h3 className="text-2xl font-bold text-[#093B5A] mb-5 border-b border-[#88B8D2]/30 pb-3">ÖZEL TALEPLER</h3>
            <div className="mb-5 space-y-3">
                <label className="flex items-center gap-3 text-base font-medium text-[#093B5A]">
                    <input type="checkbox" className="text-[#D48A61] rounded focus:ring-[#D48A61] w-5 h-5" />
                    <span>Erken giriş talep ediyorum</span>
                </label>
                <label className="flex items-center gap-3 text-base font-medium text-[#093B5A]">
                    <input type="checkbox" className="text-[#D48A61] rounded focus:ring-[#D48A61] w-5 h-5" />
                    <span>Geç çıkış talep ediyorum</span>
                </label>
            </div>
            <div>
                <label className="block text-base font-medium text-[#2781B9] mb-3">Diğer özel talepleriniz:</label>
                <textarea
                    rows="4"
                    value={specialRequests}
                    onChange={onTextChange}
                    className="w-full p-4 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] transition duration-200 resize-y bg-[#F9F7F3]/50"
                    placeholder="Özel taleplerinizi yazınız..."
                ></textarea>
            </div>
        </div>
    );
};