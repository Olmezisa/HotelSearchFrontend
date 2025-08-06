import React from 'react';

// Bu component, her bir misafir için tekrar eden form yapısını içerebilir.
const GuestFormFields = ({ guest, index, onInputChange }) => (
    <div className="flex items-start gap-4">
        <span className="bg-[#D48A61] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">{index + 1}</span>
        <div className="flex-1">
            <h4 className="font-bold text-lg text-[#093B5A] mb-4">{index + 1}. Misafir {index === 0 && '(Ana Misafir)'}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                <div>
                    <label className="block text-sm font-medium text-[#2781B9] mb-2">Ad *</label>
                    <input type="text" value={guest.firstName} onChange={(e) => onInputChange(index, 'firstName', e.target.value)} className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] transition duration-200" placeholder="Adınız" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#2781B9] mb-2">Soyad *</label>
                    <input type="text" value={guest.lastName} onChange={(e) => onInputChange(index, 'lastName', e.target.value)} className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] transition duration-200" placeholder="Soyadınız" required />
                </div>
            </div>
            {/* Diğer tüm input alanları buraya gelecek... (Doğum tarihi, uyruk, e-posta, telefon, cinsiyet vb.) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                <div>
                    <label className="block text-sm font-medium text-[#2781B9] mb-2">Doğum Tarihi *</label>
                    <input type="date" value={guest.birthDate} onChange={(e) => onInputChange(index, 'birthDate', e.target.value)} className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] transition duration-200" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#2781B9] mb-2">Uyruk (TR, DE, US vb.) *</label>
                    <input type="text" value={guest.nationality} onChange={(e) => onInputChange(index, 'nationality', e.target.value.toUpperCase())} className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] transition duration-200" placeholder="TR" maxLength="2" required />
                </div>
            </div>
            {index === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-[#2781B9] mb-2">E-posta *</label>
                        <input type="email" value={guest.email} onChange={(e) => onInputChange(index, 'email', e.target.value)} className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] transition duration-200" placeholder="ornek@email.com" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#2781B9] mb-2">Telefon *</label>
                        <input type="tel" value={guest.phone} onChange={(e) => onInputChange(index, 'phone', e.target.value)} className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] transition duration-200" placeholder="+90 555 123 45 67" required />
                    </div>
                </div>
            )}
            <div className="flex items-center gap-4 mb-4">
                <label className="flex items-center text-sm font-medium text-[#093B5A]">
                    <input type="radio" name={`gender-${index}`} value="Kadın" checked={guest.gender === 'Kadın'} onChange={(e) => onInputChange(index, 'gender', e.target.value)} className="text-[#D48A61] focus:ring-[#D48A61] mr-2" />
                    Kadın
                </label>
                <label className="flex items-center text-sm font-medium text-[#093B5A]">
                    <input type="radio" name={`gender-${index}`} value="Erkek" checked={guest.gender === 'Erkek'} onChange={(e) => onInputChange(index, 'gender', e.target.value)} className="text-[#D48A61] focus:ring-[#D48A61] mr-2" />
                    Erkek
                </label>
            </div>
            <div className="mb-4">
                <label className="flex items-center gap-2 text-sm font-medium text-[#093B5A]">
                    <input type="checkbox" className="text-[#D48A61] rounded focus:ring-[#D48A61]" required />
                    <span>18 yaşından büyüğüm *</span>
                </label>
            </div>
        </div>
    </div>
);


export const GuestInfoForm = ({ guestInfo, onInputChange }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-7 border border-[#88B8D2]/20">
            <h3 className="text-2xl font-bold text-[#093B5A] mb-5 border-b border-[#88B8D2]/30 pb-3">MİSAFİR BİLGİLERİ</h3>
            <div className="space-y-6">
                {guestInfo.map((guest, index) => (
                    <GuestFormFields key={index} guest={guest} index={index} onInputChange={onInputChange} />
                ))}
            </div>
        </div>
    );
};