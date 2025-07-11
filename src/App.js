import React, { useState, useEffect } from 'react';
import { Hotel, ArrowLeft } from 'lucide-react';
import { api } from './api/santsgApi';

// Yeni HomePage bileşenini ve diğerlerini import ediyoruz
import { HomePage } from './components/search/HomePage'; 
import { SearchResults } from './components/results/SearchResults';
import { HotelDetail } from './components/detail/HotelDetail';
import { Spinner } from './components/common/Spinner';

export default function App() {
  const [nationalities, setNationalities] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [lastSearchParams, setLastSearchParams] = useState(null);
  const [view, setView] = useState('search');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [natRes, curRes] = await Promise.all([api.getNationalities(), api.getCurrencies()]);
        setNationalities(natRes || []);
        setCurrencies(curRes || []);
      } catch (err) {
        setError("Başlangıç verileri yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handlePriceSearch = async (searchParams) => {
    try {
      setLoading(true);
      setError(null);
      setLastSearchParams(searchParams);
      const checkInDate = new Date(searchParams.checkIn);
      const checkOutDate = new Date(searchParams.checkOut);
      const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const baseRequest = {
        checkAllotment: true,
        checkStopSale: true,
        getOnlyBestOffers: true,
        productType: 2,
        roomCriteria: searchParams.roomCriteria,
        nationality: searchParams.nationality,
        checkIn: searchParams.checkIn,
        night: nights,
        currency: searchParams.currency,
        culture: "en-US",
      };
      let results;
      if (searchParams.locationType === 1) {
        const locationRequestBody = { ...baseRequest, arrivalLocations: [{ id: searchParams.locationId, type: searchParams.locationType }] };
        results = await api.searchByLocation(locationRequestBody);
      } else {
        const hotelRequestBody = { ...baseRequest, products: [searchParams.locationId] };
        results = await api.searchByHotel(hotelRequestBody);
      }
      setSearchResults(results.body?.hotels || []);
      setView('results');
    } catch (err) {
      setError("Arama sırasında bir hata oluştu.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHotelSelect = async (productId) => {
    try {
      setLoading(true);
      setError(null);
      const hotelDetails = await api.getProductInfo(productId);
      setSelectedHotel(hotelDetails);
      setView('detail');
    } catch (err) {
      setError("Otel detayları alınamadı.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) return <Spinner />;
    if (error) return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>;

    switch (view) {
      case 'results':
        return (
          <>
            <button onClick={() => setView('search')} className="mb-4 flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-1" /> Yeni Arama Yap
            </button>
            <SearchResults
              results={searchResults}
              onHotelSelect={handleHotelSelect}
              currency={lastSearchParams?.currency || 'EUR'}
            />
          </>
        );
      case 'detail':
        return selectedHotel && <HotelDetail hotel={selectedHotel} onBack={() => setView('results')} />;
      case 'search':
      default:
        // Artık doğrudan SearchForm yerine HomePage'i render ediyoruz.
        return (
            <HomePage
                onSearch={handlePriceSearch}
                nationalities={nationalities}
                currencies={currencies}
            />
        );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Hotel className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">Voyago</span>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4 md:p-6">
        {renderContent()}
      </main>
      <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
        <p>© 2025 Staj Projesi - SAN TSG</p>
      </footer>
    </div>
  );
}
