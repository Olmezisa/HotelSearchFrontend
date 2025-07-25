import React from 'react';
import { Search } from 'lucide-react'; // Arama ikonu için Lucide React'ten Search ikonunu import et

const CallToAction = () => {
  // Bu fonksiyon, "Otel Ara" butonuna tıklandığında çalışır.
  // Sayfanın en üstüne (0 piksel konumuna) yumuşak bir şekilde kaydırır.
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,          // Sayfanın en üstüne kaydır
      behavior: 'smooth' // Kaydırma işlemini yumuşak (animasyonlu) yap
    });
  };

  return (
    <section className="bg-gradient-to-r from-[#FBCFB7] via-[#EDDEA4] to-[#D48A61] py-16 mt-20 text-center rounded-xl shadow-inner mx-4 md:mx-16">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-[#093B5A] mb-6 leading-snug drop-shadow-md">
          Hayalindeki Tatil Sadece Bir Tık Uzağında!
        </h2>
        <p className="text-lg md:text-xl text-[#3e3c61] mb-8">
          Hemen arama yap, en iyi fiyatlarla rezervasyonunu güvenle tamamla.
        </p>
        <button
          // Butona tıklandığında scrollToTop fonksiyonunu çağır
          onClick={scrollToTop}
          className="bg-[#093B5A] text-white text-lg font-medium px-8 py-3 rounded-xl
                     hover:bg-[#2781B9] hover:shadow-lg hover:scale-105
                     transition duration-300 flex items-center justify-center mx-auto" // İkon ve metni ortalamak için flex ve justify-center eklendi
        >
          <Search className="mr-2" size={20} /> {/* Arama ikonu eklendi */}
          Otel Ara
        </button>
      </div>
    </section>
  );
};

export default CallToAction;
