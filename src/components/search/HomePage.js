import React, { useRef, useEffect, useState } from 'react';
import { SearchForm } from './SearchForm';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { Sparkles } from 'lucide-react';
import WhyChoose from '../WhyChoose';
import CallToAction from '../CallToAction';
import { api } from '../../api/santsgApi';
import { useNavigate } from 'react-router-dom';
export const HomePage = ({ onSearch, nationalities, currencies, nationality, setNationality, currency, setCurrency }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };

  const themes = [
    { name: "Butik Oteller", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop" },
    { name: "Balayı Otelleri", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop" },
    { name: "Sahil Otelleri", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop" },
    { name: "Bungalov Otelleri", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG9vVhvZaHs7ct0IFwF62K8EMsHBh98kf-6Q&s" },
    { name: "Kayak Otelleri", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScunobpQHwE5wDwB36iZSweo30b5zbC01uPQ&s" },
    { name: "Disneyland", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/571810091.jpg?k=d5c668f695a04853b9b681f6310711cc8b817c5c074e1ec94cdad9e6c3a8420c&o=&hp=1" },
  ];
  const [hotels, setHotels] = useState([]);
  const [searchId, setSearchId] = useState(null);
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
            id: hotel?.id, // productId
            provider: hotel?.provider, // providerId
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
    <div className="bg-[#F9F7F3]">
      {/* === HERO SECTION === */}
      <div className="relative bg-center min-h-[700px] flex items-center justify-center p-4" style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2020/08/31/09/33/beach-5531919_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        {/* Daha koyu overlay SearchForm'un daha iyi görünmesi için */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 w-full max-w-6xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#FFF8E1] drop-shadow-2xl">
            Seyahat Etmeye Hazır Mısın?
          </h1>
          <p className="text-lg md:text-xl text-[#FFF8E1] mb-10 drop-shadow-lg max-w-3xl mx-auto">
            Hayalini kurduğun tatil burada başlıyor! En düşük fiyatlarla otel rezervasyonunu yap ve unutulmaz anılar biriktir.
          </p>

          {/* SearchForm Container - Hero'da daha prominent */}
          <div className="max-w-5xl mx-auto">
            <SearchForm
              onSearch={onSearch}
              nationalities={nationalities}
              currencies={currencies}
              nationality={nationality}
              setNationality={setNationality}
              currency={currency}
              setCurrency={setCurrency}
            />
          </div>
        </div>
      </div>

      {/* === POPÜLER TEMALAR === */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#2883BB] via-[#F7A072] to-[#EDDEA4] text-transparent bg-clip-text mb-4">
            Popüler Tatil Temaları
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Size özel seçilmiş tema otelleriyle unutulmaz tatil deneyimleri keşfedin
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2883BB] to-[#F7A072] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <div key={index} className="group relative rounded-3xl overflow-hidden shadow-xl border border-white/30 backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:rotate-1 cursor-pointer">
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

              <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={theme.image}
                    alt={theme.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Sparkle icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Sparkles className="text-yellow-300 animate-pulse" size={24} />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:-translate-y-1 transition-transform duration-500">
                    {theme.name}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === POPÜLER OTELLER SLIDER === */}
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

      {/* === NEDEN BİZİ TERCİH ETMELİSİNİZ === */}
      <WhyChoose />

      {/* === CALL TO ACTION === */}
      <CallToAction />
    </div>
  );
};