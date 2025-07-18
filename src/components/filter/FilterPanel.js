import React, { useState } from 'react';

export const FilterSection = () => {
  const [searchText, setSearchText] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    console.log('Arama metni:', event.target.value);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-[#f9f7f3] p-6 rounded-xl shadow-md border border-[#eddea4]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#001624]">Filtrele:</h2>
        <button
          onClick={toggleFilter}
          className="p-2 rounded-full hover:bg-[#b5e2fa] transition-colors duration-200"
          aria-expanded={isFilterOpen}
          aria-controls="filter-content"
        >
          {isFilterOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#001624]">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#001624]">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
          )}
        </button>
      </div>

      {isFilterOpen && (
        <div id="filter-content">
          <div className="mb-6 pb-6 border-b border-[#eddea4]"></div>

          {/* Fiyat Aralığı */}
          <div className="mb-6 pb-6 border-b border-[#eddea4]">
            <h3 className="text-xl font-semibold text-[#001624] mb-4">Fiyat Aralığı</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Ara"
                className="w-full p-3 border border-[#eddea4] bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2883bb]"
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
                { range: '₺ 18.092 -₺18.999', count: 93 },
                { range: '₺ 19.000 - ₺ 20.000', count: 10 },
                { range: '₺ 20.001 - ₺ 21.000', count: 5 },
                { range: '₺ 21.001 - ₺ 22.000', count: 12 },
                { range: '₺ 22.001 - ₺ 23.000', count: 15 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-[#2883bb] rounded border-[#eddea4]" readOnly />
                    <span className="ml-2 text-[#001624]">{item.range}</span>
                  </label>
                  <span className="text-[#2883bb] text-sm">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* İndirimler */}
          <div>
            <h3 className="text-xl font-semibold text-[#001624] mb-4">İndirimler</h3>
            <div className="space-y-3">
              {[
                { label: 'Son Dakika', count: 503 },
                { label: 'Erken Rezervasyon', count: 26 },
                { label: 'Özel Kampanya', count: 141 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-[#2883bb] rounded border-[#eddea4]" readOnly />
                    <span className="ml-2 text-[#001624]">{item.label}</span>
                  </label>
                  <span className="text-[#2883bb] text-sm">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
