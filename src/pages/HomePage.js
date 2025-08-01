import React from 'react';
import { useNavigate } from 'react-router-dom';

// Ayrılan componentler
import HeroSection from '../components/Home/HeroSection';
import PopularThemesSection from '../components/Home/PopularThemesSection';
import PopularHotelsSlider from '../components/Home/PopularHotelsSlider';

import WhyChoose from '../components/Home/WhyChoose';
import CallToAction from '../components/Home/CallToAction';

const HomePage = ({ onSearch, nationalities, currencies, nationality, setNationality, currency, setCurrency }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F7F3]">
      <HeroSection
        onSearch={onSearch}
        nationalities={nationalities}
        currencies={currencies}
        nationality={nationality}
        setNationality={setNationality}
        currency={currency}
        setCurrency={setCurrency}
      />

      <PopularThemesSection />

      <PopularHotelsSlider navigate={navigate} />

      <WhyChoose />

      <CallToAction />
    </div>
  );
};

export default HomePage;
