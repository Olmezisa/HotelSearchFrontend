// src/components/FilterSection.jsx
import React, { useState } from 'react';

export const FilterSection = () => {
    // Arama input'unun değeri için state (önceki adımdan)
    const [searchText, setSearchText] = useState('');

    // ! Yeni eklenen kısım: Filtre bölümünün açık/kapalı durumunu tutacak state
    const [isFilterOpen, setIsFilterOpen] = useState(true); // Başlangıçta açık olsun

    // Input değeri değiştiğinde çalışacak fonksiyon (önceki adımdan)
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        console.log('Arama metni:', event.target.value);
    };

    // ! Yeni eklenen kısım: Filtre görünürlüğünü değiştirecek fonksiyon
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen); // isFilterOpen değerini tersine çevir (true ise false, false ise true yap)
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            {/* Filtrele başlığı ve gizle/göster düğmesi */}
            <div className="flex justify-between items-center mb-6"> {/* flexbox ile yan yana hizalama */}
                <h2 className="text-2xl font-bold text-gray-800">Filtrele:</h2>
                {/* ! Yeni eklenen kısım: Gizle/Göster düğmesi */}
                <button
                    onClick={toggleFilter} // Tıklandığında toggleFilter fonksiyonunu çağır
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
                    aria-expanded={isFilterOpen} // Erişilebilirlik için
                    aria-controls="filter-content" // Erişilebilirlik için
                >
                    {/* Düğme ikonu - görsel olarak açma/kapama durumuna göre değiştirebilirsiniz */}
                    {isFilterOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /> {/* Yukari ok */}
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /> {/* Asagi ok */}
                        </svg>
                    )}
                </button>
            </div>

            {/* ! Yeni eklenen kısım: isFilterOpen true ise bu içeriği göster */}
            {isFilterOpen && (
                <div id="filter-content"> {/* Erişilebilirlik için id */}
                    <div className="mb-6 pb-6 border-b border-gray-200">
                        {/* <p className="text-sm text-gray-500"></p> */}
                    </div>

                    {/* Fiyat Aralığı Section */}
                    <div className="mb-6 pb-6 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Fiyat Aralığı</h3>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Ara"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                        </div>
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

                    {/* İndirimler Section */}
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
            )}
        </div>
    );
};