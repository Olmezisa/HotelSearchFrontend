import React from 'react';

const HotelInfo = ({ hotel }) => {
  // hotel objesi API'den gelirken tam olarak nasıl olacak? Örneğin:
  // hotel.name, hotel.stars, hotel.city.name, hotel.country.name, hotel.seasons[0].mediaFiles

  const mainImage = hotel.seasons?.[0]?.mediaFiles?.[0]?.urlFull;

  return (
    <div className="border rounded-md p-4 shadow-md flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        {mainImage ? (
          <img src={mainImage} alt={hotel.name} className="w-full h-auto rounded" />
        ) : (
          <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded">
            Resim Yok
          </div>
        )}
      </div>
      <div className="md:w-2/3">
        <h1 className="text-2xl font-bold mb-2">{hotel.name}</h1>
        <p className="mb-1">⭐ {hotel.stars} yıldızlı otel</p>
        <p className="mb-1">📍 {hotel.city?.name}, {hotel.country?.name}</p>
        <a
          href={hotel.homePage}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Otel Web Sitesi
        </a>
      </div>
    </div>
  );
};

export default HotelInfo;
