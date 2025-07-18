import React from 'react';
import { SearchForm } from './SearchForm';
import { useRef } from 'react'; //  scroll için referans tutacağız
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'; // ok ikonu ıcın
import { Sparkles } from 'lucide-react';

export const HomePage = ({ onSearch, nationalities, currencies, nationality, setNationality, currency, setCurrency }) => {
  // buraya homepage parametresine nationality, setNationality, currency, setCurrency ekledim.

  const scrollRef = useRef(null); //kaydırılacak alanın referansı
 const scroll = (offset) => {
  scrollRef.current.scrollLeft += offset; // offset kadar kaydır
};

  const themes = [
    {
      name: "Butik Oteller",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Balayı Otelleri",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Sahil Otelleri",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Bungalov Otelleri",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG9vVhvZaHs7ct0IFwF62K8EMsHBh98kf-6Q&s"
    },
    {
      name: "Kayak Otelleri",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScunobpQHwE5wDwB36iZSweo30b5zbC01uPQ&s"
    },
    {
      name: "Disneyland",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/571810091.jpg?k=d5c668f695a04853b9b681f6310711cc8b817c5c074e1ec94cdad9e6c3a8420c&o=&hp=1"
    },
  ];

  const hotels = [
  {
    name: 'Antalya Hilton',
    location: 'Antalya, Türkiye',
    price: '₺1.500 / gece',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/19/c6/2e/8c/doubletree-by-hilton.jpg'
  },
  {
    name: 'Deluxe Resort',
    location: 'Muğla, Türkiye',
    price: '₺2.000 / gece',
    image: 'https://imgkit.otelz.com/turkey/mugla/marmaris/pinetaparkdeluxehotel30da14ae.jpg?tr=w-auto,h-auto,fo-auto,q-80'
  },
  {
    name: 'Lake View Hotel',
    location: 'İzmir, Türkiye',
    price: '₺1.250 / gece',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/37/40/eb/ja-lake-view-hotel.jpg?w=1200&h=-1&s=1'
  },
  {
    name: 'Cappadocia Cave Suites',
    location: 'Nevşehir, Türkiye',
    price: '₺1.800 / gece',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA37mJ4WAOnDu-g7ecoWjQLQMURYh7DDsctA&s'
  },
  {
    name: 'Palazzo Cordusio Gran Melia',
    location: 'Milano, İtalya',
    price: '₺46.800 / gece',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhAWNATuum2JVXjFsCpdzUDaGiTMtm8BYd2Q&s'
  },
  {
    name: 'The Dilly',
    location: 'Londra, Birleşik Krallık',
    price: '₺15.000 / gece',
    image: 'https://www.globalmousetravels.com/wp-content/uploads/2021/08/The-Dilly-Hotel-London-28.jpg'
  }
];

  return (
    <div>
      {/*oda seç kısmında sorun çözüldü 'overflow-hidden' divin içindeki classname kısmından çıkarılınca dropdown kısmı dışarı taşıyor.*/}
      {/* === HERO BÖLÜMÜ === */}
      <div
        className="relative bg-[#F9F7F3] bg-center rounded-2xl min-h-[500px] md:min-h-[600px] flex items-center justify-center p-4"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1653039148541-807e068d489d?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        {/* Arka planı karartmak için overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center text-white">
          <h1 className="text-5xl text-[#EDDEA4] md:text-6xl font-bold mb-4 drop-shadow-lg">
            Seyahat Etmeye Hazır Mısın?
          </h1>
  <p className="text-lg md:text-xl text-[#F7A072] mb-8 drop-shadow-md flex items-center justify-center gap-2">
  <Sparkles className="text-yellow-300 animate-pulse" size={24} />
  <span>Hayalini kurduğun tatil burada başlıyor! En düşük fiyatlarla otel rezervasyonunu yap.</span>
  <Sparkles className="text-yellow-300 animate-pulse" size={24} />
</p>

        
          {/* Arama Formu artık burada çağrılıyor */}
          <div className="max-w-7xl mx-auto">
            <SearchForm
              onSearch={onSearch}
              nationalities={nationalities}
              currencies={currencies}
              // App.js'ten gelen props'ları SearchForm'a iletiyoruz
              nationality={nationality}
              setNationality={setNationality}
              currency={currency}
              setCurrency={setCurrency}
            />
          </div>
        </div>
      </div>

      {/* === POPÜLER TEMALAR BÖLÜMÜ === */}
      <div className="mt-16 py-12">
        <h2 className="text-5xl font-bold text-center text-[#2883BB] mb-8">Popüler Tatil Temaları</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {themes.map((theme, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300">
              <img src={theme.image} alt={theme.name}  loading="lazy"className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">{theme.name}</h3>
              </div>
            </div>
          ))}

          {/* === POPÜLER OTELLER SLIDER === */}
<section className="relative max-w-7xl mx-auto px-4 py-8 mt-16">
  <div className="mb-8">
    <h2 className="text-4xl font-bold text-[#2883BB]">Popüler Oteller</h2>

    <p className="text-lg text-gray-500 mt-1">Sizin için seçilen popüler oteller</p>
  </div>
 <button onClick={() => scroll(-300)} className="absolute left-3 top-1/2 -translate-y-1/2 z-15 bg-[#F9F7F3]/80 hover:bg-[#EDDEA4] text-[#2883BB] p-2 rounded-full shadow hidden lg:flex">
          {/* Replaced MdArrowBackIos with inline SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={() => scroll(300)} className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-[#F9F7F3]/80 hover:bg-[#EDDEA4] text-[#2883BB] hover:bg-white text-[#3e3c61] p-2 rounded-full shadow hidden lg:flex">
          {/* Replaced MdArrowForwardIos with inline SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
  <div ref={scrollRef} className="flex gap-7 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide max-w-fit">
    {hotels.map((hotel, index) => (
      <div key={index} className="min-w-[240px] max-w-[260] bg-white border border-[#d4c1ec] rounded-2xl shadow hover:shadow-xl hover:scale-[1.03] transition-all duration-300 snap-center"
       style={{
    scrollbarWidth: 'none',           // Firefox için
    msOverflowStyle: 'none'           // Internet Explorer için
  }}
  onWheel={(e) => {
    e.currentTarget.scrollLeft += e.deltaY; // Mouse tekeri ile yatay scroll
  }}>
      <style>
    {`div::-webkit-scrollbar { display: none; }`}
  </style>

        <img src={hotel.image} alt={hotel.name} loading="lazy" className="w-full h-72 object-cover rounded-t-2xl" />
        <div className="p-5">
          <h3 className="font-bold text-xl text-[#F7A072]">{hotel.name}</h3>
          <p className="text-gray-500 text-base">{hotel.location}</p>
          <p className="font-semibold text-[#F7A072] mt-2 text-lg">{hotel.price}</p>
        </div>
      </div>
    ))}
  </div>
</section>

        </div>
      </div>
    </div>
  );
};