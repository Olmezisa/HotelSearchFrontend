import React, { useState } from 'react';

export const FacilityFilterList = ({ searchText, setSearchText, selectedFacilities, setSelectedFacilities }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const facilities = [
    { name: 'Wi-Fi', count: 875 },
    { name: 'Restoran', count: 732 },
    { name: 'Resepsiyon', count: 638 },
    { name: 'Otopark', count: 634 },
    { name: 'Havuz', count: 494 },
    { name: 'Çocuk Dostu', count: 463 },
    { name: 'Teras', count: 415 },
    { name: 'Engelli Dostu', count: 345 },
    { name: 'Spa', count: 237 },
    { name: 'Masaj', count: 234 },
    { name: 'Hamam', count: 232 },
    { name: 'Deniz Manzarası', count: 210 },
    { name: 'Fitness', count: 148 },
    { name: 'Deniz Kıyısı', count: 142 },
    { name: 'Toplantı Odaları', count: 134 },
    { name: 'Beach', count: 126 },
  ];

  const handleFacilityChange = (facility) => {
    setSelectedFacilities(prev =>
      prev.includes(facility)
        ? prev.filter(item => item !== facility)
        : [...prev, facility]
    );
  };

  const handleSearchChange = (event) => setSearchText(event.target.value);

  const filteredFacilities = facilities.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="mb-8 pb-6 border-b border-[#EDDEA4]/50">
      <h3 className="text-xl font-semibold text-[#6B7280] mb-4">Tesis Özellikleri</h3>

      <div className="mb-4 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-[#2883BB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        </div>
        <input
          type="text"
          placeholder="Tesis özelliklerinde ara..."
          className="w-full pl-10 pr-4 py-3 border border-[#EDDEA4] bg-[#F9F7F3]/80 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2883BB]/40 focus:border-[#2883BB] transition-all duration-300 hover:bg-white"
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#2883BB]/30 scrollbar-track-transparent">
        {filteredFacilities.length > 0 ? (
          filteredFacilities.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-[#F2BF8B]/10 hover:shadow-sm ${
                selectedFacilities.includes(item.name) ? 'bg-[#2883BB]/10 border border-[#2883BB]/20' : ''
              }`}
              onMouseEnter={() => setHoveredItem(`facility-${index}`)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <label className="flex items-center cursor-pointer flex-1">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#2883BB] rounded border-[#EDDEA4] focus:ring-[#2883BB]/50 transition-colors duration-200"
                  checked={selectedFacilities.includes(item.name)}
                  onChange={() => handleFacilityChange(item.name)}
                />
                <span className="ml-3 text-[#6B7280] font-medium">{item.name}</span>
              </label>
              <span className={`px-2 py-1 text-sm rounded-full transition-all duration-200 ${
                hoveredItem === `facility-${index}` || selectedFacilities.includes(item.name)
                  ? 'bg-[#2883BB] text-white'
                  : 'bg-[#F9B18B]/20 text-[#F7A072]'
              }`}>
                ({item.count})
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-[#093B5A]/60">
            Arama kriterinize uygun sonuç bulunamadı
          </div>
        )}
      </div>
    </div>
  );
};
