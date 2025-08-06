import { useRef, useEffect, useState } from 'react';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { api } from '../../api/santsgApi';
import HotelCard from '../HotelCard/HotelCard';

// Popüler oteller

const PopularHotelsSlider = ({ navigate }) => {
  const scrollRef = useRef(null);
  const [hotels, setHotels] = useState([]);
  const [searchId, setSearchId] = useState(null);
  const [isOverflowing, setIsOverflowing] = useState(false); // taşmayo kontrol için

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

        const getFormattedDate = () => {
          const today = new Date();
          const year = today.getFullYear();
          // getMonth() 0'dan başladığı için 1 ekliyoruz.
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const day = String(today.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };

        const todayDate = getFormattedDate();

        const response = await api.searchByLocation({
          arrivalLocations: [{ id: "23494", type: 2 }],
          checkIn: todayDate,
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
            city: hotel?.city?.name ?? "Bilinmeyen",
            offers: hotel?.offers ?? [],
            stars: hotel?.stars ?? 0,
            thumbnailFull: hotel?.thumbnailFull || hotel?.thumbnail || "https://via.placeholder.com/400x300?text=Hotel"
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

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        // scrollWidth: İçeriğin toplam genişliği (görünmeyen kısım dahil)
        // clientWidth: Görünen alanın genişliği
        // Eğer içerik genişliği görünenden fazlaysa, taşma var demektir.
        setIsOverflowing(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };

    // Oteller yüklendiğinde ve pencere boyutu değiştiğinde kontrol et
    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    // Temizleme fonksiyonu
    return () => window.removeEventListener('resize', checkOverflow);
  }, [hotels]); // hotels state'i değiştiğinde tekrar çalışır

  // Kartları içeren div'in sınıfını dinamik olarak belirle
  const sliderContainerClasses = `flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-2 ${!isOverflowing ? 'justify-center' : ''}`;

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

      <div ref={scrollRef} className={sliderContainerClasses} style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            currency={hotel.currency}
            searchId={searchId}
            onHotelSelect={() => navigate(`/hotel/${hotel.id}/${hotel.provider}/${searchId}/${hotel.currency}/${hotel.offerId}`)}
            variant="popular"
          />
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
