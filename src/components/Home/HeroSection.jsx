import React from 'react';
import { SearchForm } from '../SearchBar/SearchForm';

/**
 * Ana sayfanın en üst bölümünü (Hero) ve arama formunu içeren bileşen.
 * Gerekli arama props'larını SearchForm'a iletir.
 */
const HeroSection = ({
  onSearch,
  nationalities,
  currencies,
  nationality,
  setNationality,
  currency,
  setCurrency
}) => {
  return (
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
  );
};

export default HeroSection;
