// src/components/FilterSection.jsx
import React, { useState } from 'react'; // <-- useState'i buraya ekledik

export const FilterSection = () => {
    // ! Yeni eklenen kısım: Arama input'unun değerini tutmak için state
    const [searchText, setSearchText] = useState('');

    // ! Yeni eklenen kısım: Input değeri değiştiğinde çalışacak fonksiyon
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        // İsteğe bağlı: Burada search text'i console'a yazdırarak test edebilirsiniz
        console.log('Arama metni:', event.target.value);
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Filtrele:</h2>

            {/* ZPara Section (değişiklik yok) */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    {/* <div className="flex items-center">
                        <img src="/path/to/your/zpara-logo.png" alt="Para Logo" className="h-6 w-6 mr-2" />
                        <span className="font-semibold text-lg text-gray-700">Hotel</span>
                    </div> */}
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                        <input
                            type="checkbox"
                            name="toggle"
                            id="zpara-toggle"
                            className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            readOnly
                        />
                        <label htmlFor="zpara-toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                </div>
                {/* <p className="text-sm text-gray-500">Para kazandıran otellerden rezervasyon yaptıkça Para kazanırsınız.</p> */}
            </div>

            {/* Fiyat Aralığı Section */}
            <div className="mb-6 pb-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Fiyat Aralığı</h3>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Ara"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // ! Yeni eklenen/değişen kısım: Input'u state'e bağladık ve readOnly'yi kaldırdık
                        value={searchText}           // Input'un değeri searchText state'inden alınacak
                        onChange={handleSearchChange} // Değişiklik olduğunda handleSearchChange çalışacak
                    // readOnly'yi buradan kaldırdık
                    />
                </div>
                {/* Scrollbar'lı kısım (önceki değişikliklerinizden) */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                    {[
                        { range: '₺ 4.021 - ₺ 6.030', count: 87 },
                        { range: '₺ 6.031 - ₺ 8.040', count: 48 },
                        { range: '₺ 8.041 - ₺ 10.050', count: 52 },
                        { range: '₺ 10.051 - ₺ 12.060', count: 69 },
                        { range: '₺ 12.061 - ₺ 14.070', count: 38 },
                        { range: '₺ 14.071 - ₺ 16.081', count: 42 },
                        { range: '₺ 16.082 - ₺ 18.091', count: 20 },
                        { range: '₺ 18.092 ₺ +', count: 93 },
                        // Test için eklenen öğeler
                        { range: '₺ 19.000 - ₺ 20.000', count: 10 },
                        { range: '₺ 20.001 - ₺ 21.000', count: 5 },
                        { range: '₺ 21.001 - ₺ 22.000', count: 12 },
                        { range: '₺ 22.001 - ₺ 23.000', count: 15 },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300" readOnly />
                                <span className="ml-2 text-gray-700">{item.range}</span>
                            </label>
                            <span className="text-gray-500 text-sm">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* İndirimler Section (değişiklik yok) */}
            <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">İndirimler</h3>
                <div className="space-y-3">
                    {[
                        { label: 'Son Dakika', count: 503 },
                        { label: 'Erken Rezervasyon', count: 26 },
                        { label: 'Özel Kampanya', count: 141 },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300" readOnly />
                                <span className="ml-2 text-gray-700">{item.label}</span>
                            </label>
                            <span className="text-gray-500 text-sm">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};