import React, { useState } from 'react';

export const DiscountFilterList = ({ selectedDiscounts, setSelectedDiscounts }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const discounts = [
    { label: 'Son Dakika', count: 503 },
    { label: 'Erken Rezervasyon', count: 26 },
    { label: 'Özel Kampanya', count: 141 },
  ];

  const handleDiscountChange = (discount) => {
    setSelectedDiscounts(prev =>
      prev.includes(discount)
        ? prev.filter(item => item !== discount)
        : [...prev, discount]
    );
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-[#093B5A] mb-4">İndirimler</h3>
      <div className="grid gap-3">
        {discounts.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 hover:shadow-md transform hover:-translate-y-0.5 ${
              selectedDiscounts.includes(item.label)
                ? 'bg-gradient-to-r from-[#2883BB]/10 to-[#B5E2FA]/10 border border-[#2883BB]/30 shadow-sm'
                : 'bg-[#F9F7F3]/80 hover:bg-[#FFF9EF]'
            }`}
            onMouseEnter={() => setHoveredItem(`discount-${index}`)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <label className="flex items-center cursor-pointer flex-1">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-[#2883BB] rounded border-[#EDDEA4] focus:ring-[#2883BB]/50 transition-colors duration-200"
                checked={selectedDiscounts.includes(item.label)}
                onChange={() => handleDiscountChange(item.label)}
              />
              <div className="ml-3 flex items-center gap-2">
                <span className="text-[#093B5A] font-medium">{item.label}</span>
              </div>
            </label>
            <span className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
              hoveredItem === `discount-${index}` || selectedDiscounts.includes(item.label)
                ? 'bg-[#2883BB] text-white transform scale-110'
                : 'bg-[#F9B18B]/30 text-[#F7A072]'
            }`}>
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
