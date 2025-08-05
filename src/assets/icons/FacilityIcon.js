import React from 'react';
import { Wifi, Wind, Tv2, UtensilsCrossed, Droplets, ParkingCircle, Sparkles, Lock, Building2, Scissors, Accessibility } from 'lucide-react';

// İkonları ve ilgili anahtar kelimeleri bir nesne içinde tanımlamak,
// kodu daha temiz ve yönetilebilir hale getirir.
const ICONS = {
    'default': <Sparkles className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'wifi': <Wifi className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'internet': <Wifi className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'air conditioning': <Wind className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'klima': <Wind className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'tv': <Tv2 className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'restaurant': <UtensilsCrossed className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'havuz': <Droplets className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'otopark': <ParkingCircle className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'safe': <Lock className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'balcony': <Building2 className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'hair drier': <Scissors className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
    'handicapped': <Accessibility className="h-5 w-5 mr-2 text-[#88B8D2] flex-shrink-0" />,
};

export const FacilityIcon = ({ name }) => {
    const normalizedName = name ? name.toLowerCase() : '';
    for (const key in ICONS) {
        if (normalizedName.includes(key)) return ICONS[key];
    }
    return ICONS['default'];
};

// Bu, bir React bileşeninin kendi başına çalışması için gereklidir.
const App = () => {
  return (
    <div className="p-4 flex flex-col space-y-4 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Facility Icon Examples (New Version)</h1>
      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
        <FacilityIcon name="Havuz" />
        <span className="text-gray-700">Havuz</span>
      </div>
      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
        <FacilityIcon name="Restaurant" />
        <span className="text-gray-700">Restaurant</span>
      </div>
      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
        <FacilityIcon name="Free Wifi" />
        <span className="text-gray-700">Free Wifi</span>
      </div>
      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
        <FacilityIcon name="Air Conditioning" />
        <span className="text-gray-700">Air Conditioning</span>
      </div>
      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
        <FacilityIcon name="Balcony" />
        <span className="text-gray-700">Balcony</span>
      </div>
      <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
        <FacilityIcon name="Minibar" />
        <span className="text-gray-700">Minibar (Unknown)</span>
      </div>
    </div>
  );
};

export default App;
