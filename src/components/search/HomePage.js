import React from 'react';
import { SearchForm } from './SearchForm';

/**
 * Kullanıcıyı karşılayan ana sayfa bileşeni.
 * Büyük bir arka plan resmi, arama formu ve popüler temaları içerir.
 */
export const HomePage = ({ onSearch, nationalities, currencies }) => {
  // Popüler temalar için örnek veriler
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
  ];

  return (
    <div>
      {/* === HERO BÖLÜMÜ === */}
      <div
        className="relative bg-cover bg-center rounded-2xl overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center justify-center p-4"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1920&auto=format&fit=crop')" }}
      >
        {/* Arka planı karartmak için overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative z-10 w-full max-w-5xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Seyahat Etmeye Hazır Mısın?
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md">
            Hayalini kurduğun tatil burada başlıyor! En düşük fiyatlarla otel rezervasyonunu yap.
          </p>
          
          {/* Arama Formu artık burada çağrılıyor */}
          <div className="max-w-7xl mx-auto">
             <SearchForm onSearch={onSearch} nationalities={nationalities} currencies={currencies} />
          </div>
        </div>
      </div>

      {/* === POPÜLER TEMALAR BÖLÜMÜ === */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Popüler Tatil Temaları</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden shadow-lg group transform hover:-translate-y-2 transition-transform duration-300">
              <img src={theme.image} alt={theme.name} className="w-full h-80 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white">{theme.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
