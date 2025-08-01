import { useRef, useEffect, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { api } from '../../api/santsgApi';

// Popüler oteller

const PopularHotelsSlider = ({ navigate }) => {
  const scrollRef = useRef(null);
  const [hotels, setHotels] = useState([]);
  const [searchId, setSearchId] = useState(null);

  // Yatay kaydırma işlevi
  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };

  // Otel verisini çeken API çağrısı
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.searchByLocation({
          arrivalLocations: [{ id: "23494", type: 2 }],
          checkIn: "2025-08-01",
          night: 2,
          roomCriteria: [{ adult: 2, childAges: [] }],
          nationality: "DE",
          currency: "EUR",
          productType: 2,
          culture: "en-US",
          checkAllotment: true,
          checkStopSale: true,
          getOnlyBestOffers: true
        });

        const allHotels = response?.body?.hotels || [];

        const mapped = allHotels.map((hotel) => {
          const offer = hotel?.offers?.[0];
          return {
            id: hotel?.id,
            provider: hotel?.provider,
            offerId: offer?.offerId,
            currency: offer?.price?.currency,
            name: hotel?.name ?? "Otel",
            location: hotel?.city?.name ?? "Bilinmeyen",
            price: offer?.price?.amount && offer?.night
              ? `${(offer.price.amount / offer.night).toFixed(2)} ${offer.price.currency} / gece`
              : "Fiyat yok",
            image: hotel?.thumbnailFull || hotel?.thumbnail || "https://via.placeholder.com/400x300?text=Hotel"
          };
        });

        setHotels(mapped);
        setSearchId(response.body.searchId);
      } catch (err) {
        console.error("Otel verisi alınamadı:", err);
      }
    };

    fetchHotels();
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-4 py-20 bg-white/50 rounded-3xl mx-4 mb-10 backdrop-blur-sm">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-[#F7A072] via-[#EDDEA4] to-[#B5E2FA] text-transparent bg-clip-text mb-6 leading-tight -translate-y-2">
          Popüler Antalya Otelleri
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6 leading-relaxed">
          Misafirlerimizin en çok tercih ettiği, kaliteli hizmet sunan oteller
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-[#F7A072] to-[#EDDEA4] mx-auto rounded-full" />
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => scroll(-300)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/30 hidden lg:flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
      >
        <MdArrowBackIos className="text-[#2781B9] text-xl" />
      </button>
      <button
        onClick={() => scroll(300)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-white/30 hidden lg:flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
      >
        <MdArrowForwardIos className="text-[#2781B9] text-xl" />
      </button>

      {/* Hotels Slider */}
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {hotels.map((hotel, index) => (
          <div key={index} className="min-w-[340px] bg-white border border-gray-200 rounded-2xl shadow-lg snap-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group">
            <div className="relative overflow-hidden rounded-t-2xl">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl text-[#F7A072] mb-2 group-hover:text-[#F7A072]/80 transition-colors">
                {hotel.name}
              </h3>
              <p className="text-gray-600 mb-3 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {hotel.location}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-[#EDDEA4] font-bold text-lg">{hotel.price}</p>
                <button
                  onClick={() =>
                    navigate(`/hotel/${hotel.id}/${hotel.provider}/${searchId}/${hotel.currency}/${hotel.offerId}`)
                  }
                  className="bg-gradient-to-r from-[#F7A072] to-[#F9B18B] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-[#F7A072]/90 hover:to-[#F9B18B]/90 transition-all duration-300 transform hover:scale-105">
                  Detaylar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile scroll indicators */}
      <div className="flex justify-center mt-6 lg:hidden">
        <div className="flex space-x-2">
          {hotels.map((_, index) => (
            <div key={index} className="w-2 h-2 bg-gray-300 rounded-full"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularHotelsSlider;
