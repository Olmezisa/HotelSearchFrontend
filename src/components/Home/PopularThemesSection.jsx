import React from 'react';
import { Sparkles } from 'lucide-react';

// Popüler tatil temaları

const PopularThemesSection = () => {
  const themes = [
    { name: "Butik Oteller", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop" },
    { name: "Balayı Otelleri", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=800&auto=format&fit=crop" },
    { name: "Sahil Otelleri", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format&fit=crop" },
    { name: "Bungalov Otelleri", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG9vVhvZaHs7ct0IFwF62K8EMsHBh98kf-6Q&s" },
    { name: "Kayak Otelleri", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScunobpQHwE5wDwB36iZSweo30b5zbC01uPQ&s" },
    { name: "Disneyland", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/571810091.jpg?k=d5c668f695a04853b9b681f6310711cc8b817c5c074e1ec94cdad9e6c3a8420c&o=&hp=1" },
  ];

  return (
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
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

            <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={theme.image}
                  alt={theme.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

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
  );
};

export default PopularThemesSection;
