// import React, { useState } from 'react';

// export const FilterSection = () => {
//   const [searchText, setSearchText] = useState('');
//   const [isFilterOpen, setIsFilterOpen] = useState(true);
//   const [selectedFacilities, setSelectedFacilities] = useState([]);
//   const [selectedDiscounts, setSelectedDiscounts] = useState([]);
//   const [hoveredItem, setHoveredItem] = useState(null);

//   const handleSearchChange = (event) => setSearchText(event.target.value);

//   const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

//   const handleFacilityChange = (facility) => {
//     setSelectedFacilities(prev =>
//       prev.includes(facility)
//         ? prev.filter(item => item !== facility)
//         : [...prev, facility]
//     );
//   };

//   const handleDiscountChange = (discount) => {
//     setSelectedDiscounts(prev =>
//       prev.includes(discount)
//         ? prev.filter(item => item !== discount)
//         : [...prev, discount]
//     );
//   };

//   const clearAllFilters = () => {
//     setSelectedFacilities([]);
//     setSelectedDiscounts([]);
//     setSearchText('');
//   };

//   const selectedCount = selectedFacilities.length + selectedDiscounts.length;

//   const facilities = [
//     { name: 'Wi-Fi', count: 875 },
//     { name: 'Restoran', count: 732 },
//     { name: 'Resepsiyon', count: 638 },
//     { name: 'Otopark', count: 634 },
//     { name: 'Havuz', count: 494 },
//     { name: 'Çocuk Dostu', count: 463 },
//     { name: 'Teras', count: 415 },
//     { name: 'Engelli Dostu', count: 345 },
//     { name: 'Spa', count: 237 },
//     { name: 'Masaj', count: 234 },
//     { name: 'Hamam', count: 232 },
//     { name: 'Deniz Manzarası', count: 210 },
//     { name: 'Fitness', count: 148 },
//     { name: 'Deniz Kıyısı', count: 142 },
//     { name: 'Toplantı Odaları', count: 134 },
//     { name: 'Beach', count: 126 },
//   ];

//   const discounts = [
//     { label: 'Son Dakika', count: 503 },
//     { label: 'Erken Rezervasyon', count: 26 },
//     { label: 'Özel Kampanya', count: 141  },
//   ];

//   const filteredFacilities = facilities.filter(item =>
//     item.name.toLowerCase().includes(searchText.toLowerCase())
//   );

//   return (
//     <div className="bg-gradient-to-br from-[#F9F7F3] to-[#FFF9EF] p-6 rounded-2xl shadow-lg border border-[#EDDEA4] backdrop-blur-sm relative overflow-hidden">
//       {/* Arkaplan süsleri */}
//       <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B5E2FA]/20 to-transparent rounded-full blur-xl"></div>
//       <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#EDDEA4]/30 to-transparent rounded-full blur-lg"></div>

//       <div className="relative z-10">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-[#2883BB]/10 rounded-lg">
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#2883BB]">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-[#093B5A]">Filtrele</h2>
//             {selectedCount > 0 && (
//               <div className="flex items-center gap-2">
//                 <span className="bg-[#2883BB] text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
//                   {selectedCount} seçili
//                 </span>
//                 <button
//                   onClick={clearAllFilters}
//                   className="text-[#AC440B] hover:text-[#F7A072] text-sm font-medium transition-colors duration-200 hover:underline"
//                 >
//                   Temizle
//                 </button>
//               </div>
//             )}
//           </div>
//           <button
//             onClick={toggleFilter}
//             className="p-3 rounded-full hover:bg-[#F2BF8B]/30 transition-all duration-300 transform hover:scale-110 hover:rotate-180"
//             aria-expanded={isFilterOpen}
//             aria-controls="filter-content"
//           >
//             {isFilterOpen ? (
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#093B5A]">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#093B5A]">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
//               </svg>
//             )}
//           </button>
//         </div>

//         <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isFilterOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
//           <div id="filter-content">
//             {/* Tesis Özellikleri */}
//             <div className="mb-8 pb-6 border-b border-[#EDDEA4]/50">
//               <h3 className="text-xl font-semibold text-[#6B7280] mb-4">Tesis Özellikleri</h3>

//               <div className="mb-4 relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="w-5 h-5 text-[#2883BB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Tesis özelliklerinde ara..."
//                   className="w-full pl-10 pr-4 py-3 border border-[#EDDEA4] bg-[#F9F7F3]/80 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2883BB]/40 focus:border-[#2883BB] transition-all duration-300 hover:bg-white"
//                   value={searchText}
//                   onChange={handleSearchChange}
//                 />
//               </div>

//               <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#2883BB]/30 scrollbar-track-transparent">
//                 {filteredFacilities.length > 0 ? (
//                   filteredFacilities.map((item, index) => (
//                     <div
//                       key={index}
//                       className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-[#F2BF8B]/10 hover:shadow-sm ${
//                         selectedFacilities.includes(item.name) ? 'bg-[#2883BB]/10 border border-[#2883BB]/20' : ''
//                       }`}
//                       onMouseEnter={() => setHoveredItem(`facility-${index}`)}
//                       onMouseLeave={() => setHoveredItem(null)}
//                     >
//                       <label className="flex items-center cursor-pointer flex-1">
//                         <input
//                           type="checkbox"
//                           className="form-checkbox h-5 w-5 text-[#2883BB] rounded border-[#EDDEA4] focus:ring-[#2883BB]/50 transition-colors duration-200"
//                           checked={selectedFacilities.includes(item.name)}
//                           onChange={() => handleFacilityChange(item.name)}
//                         />
//                         <span className="ml-3 text-[#6B7280] font-medium">{item.name}</span>
//                       </label>
//                       <span className={`px-2 py-1 text-sm rounded-full transition-all duration-200 ${
//                         hoveredItem === `facility-${index}` || selectedFacilities.includes(item.name)
//                           ? 'bg-[#2883BB] text-white'
//                           : 'bg-[#F9B18B]/20 text-[#F7A072]'
//                       }`}>
//                         ({item.count})
//                       </span>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-6 text-[#093B5A]/60">
                    
//                     Arama kriterinize uygun sonuç bulunamadı
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* İndirimler */}
//             <div>
//               <h3 className="text-xl font-semibold text-[#093B5A] mb-4">İndirimler</h3>
//               <div className="grid gap-3">
//                 {discounts.map((item, index) => (
//                   <div
//                     key={index}
//                     className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5 ${
//                       selectedDiscounts.includes(item.label)
//                         ? 'bg-gradient-to-r from-[#2883BB]/10 to-[#B5E2FA]/10 border border-[#2883BB]/30 shadow-sm'
//                         : 'bg-[#F9F7F3]/80 hover:bg-[#FFF9EF]'
//                     }`}
//                     onMouseEnter={() => setHoveredItem(`discount-${index}`)}
//                     onMouseLeave={() => setHoveredItem(null)}
//                   >
//                     <label className="flex items-center cursor-pointer flex-1">
//                       <input
//                         type="checkbox"
//                         className="form-checkbox h-5 w-5 text-[#2883BB] rounded border-[#EDDEA4] focus:ring-[#2883BB]/50 transition-colors duration-200"
//                         checked={selectedDiscounts.includes(item.label)}
//                         onChange={() => handleDiscountChange(item.label)}
//                       />
//                       <div className="ml-3 flex items-center gap-2">
//                         <span className="text-lg">{item.icon}</span>
//                         <span className="text-[#093B5A] font-medium">{item.label}</span>
//                       </div>
//                     </label>
//                     <span className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
//                       hoveredItem === `discount-${index}` || selectedDiscounts.includes(item.label)
//                         ? 'bg-[#2883BB] text-white transform scale-110'
//                         : 'bg-[#F9B18B]/30 text-[#F7A072]'
//                     }`}>
//                       {item.count}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState } from 'react';
import { FacilityFilterList } from './FacilityFilterList';
import { DiscountFilterList } from './DiscountFilterList';

export const FilterPanel = () => {
  const [searchText, setSearchText] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const clearAllFilters = () => {
    setSelectedFacilities([]);
    setSelectedDiscounts([]);
    setSearchText('');
  };

  const selectedCount = selectedFacilities.length + selectedDiscounts.length;

  return (
    <div className="bg-gradient-to-br from-[#F9F7F3] to-[#FFF9EF] p-6 rounded-2xl shadow-lg border border-[#EDDEA4] backdrop-blur-sm relative overflow-hidden">
      {/* Arkaplan süsleri */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#B5E2FA]/20 to-transparent rounded-full blur-xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#EDDEA4]/30 to-transparent rounded-full blur-lg"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#2883BB]/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#2883BB]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#093B5A]">Filtrele</h2>
            {selectedCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="bg-[#2883BB] text-white px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                  {selectedCount} seçili
                </span>
                <button
                  onClick={clearAllFilters}
                  className="text-[#AC440B] hover:text-[#F7A072] text-sm font-medium transition-colors duration-200 hover:underline"
                >
                  Temizle
                </button>
              </div>
            )}
          </div>
          <button
            onClick={toggleFilter}
            className="p-3 rounded-full hover:bg-[#F2BF8B]/30 transition-all duration-300 transform hover:scale-110 hover:rotate-180"
            aria-expanded={isFilterOpen}
            aria-controls="filter-content"
          >
            {isFilterOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#093B5A]">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[#093B5A]">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
              </svg>
            )}
          </button>
        </div>

        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isFilterOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div id="filter-content">
            {/* Tesis Özellikleri bileşeni */}
            <FacilityFilterList
              searchText={searchText}
              setSearchText={setSearchText}
              selectedFacilities={selectedFacilities}
              setSelectedFacilities={setSelectedFacilities}
            />

            {/* İndirimler bileşeni */}
            <DiscountFilterList
              selectedDiscounts={selectedDiscounts}
              setSelectedDiscounts={setSelectedDiscounts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
