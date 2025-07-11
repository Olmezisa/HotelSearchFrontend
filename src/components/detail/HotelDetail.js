import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { FacilityIcon } from '../common/FacilityIcon';

export const HotelDetail = ({ hotel, onBack }) => (
  <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg animate-fade-in">
    <button onClick={onBack} className="flex items-center text-blue-600 font-semibold mb-4"><ArrowLeft className="h-5 w-5 mr-2" /> Arama Sonuçlarına Dön</button>
    <h2 className="text-3xl font-bold text-gray-800 mb-2">{hotel.name}</h2>
    <p className="text-gray-600 mb-4">{hotel.city?.name}, {hotel.country?.name}</p>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
      {hotel.seasons[0]?.mediaFiles?.slice(0, 8).map((media, index) => (<img key={index} src={media.urlFull} alt={`${hotel.name} ${index + 1}`} className="w-full h-32 object-cover rounded-lg shadow-sm" />))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2"><h3 className="text-xl font-semibold mb-2 border-b pb-2">Otel Açıklaması</h3>{hotel.seasons[0]?.textCategories?.map(cat => (<div key={cat.name} className="mb-4"><h4 className="font-bold text-gray-700">{cat.name}</h4><div className="text-gray-600 prose" dangerouslySetInnerHTML={{ __html: cat.presentations[0]?.text }} /></div>))}</div>
      <div><h3 className="text-xl font-semibold mb-2 border-b pb-2">Olanaklar</h3><div className="space-y-2">{hotel.seasons[0]?.facilityCategories?.flatMap(cat => cat.facilities).slice(0, 15).map(facility => (<div key={facility.id} className="flex items-center text-gray-700"><FacilityIcon name={facility.name} /><span>{facility.name}</span></div>))}</div></div>
    </div>
  </div>
);