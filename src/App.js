import React, { useState, useEffect } from 'react';
import { Hotel, ArrowLeft } from 'lucide-react';
import { api } from './api/santsgApi';


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
  const [loading, setLoading] = useState(false); // Başlangıçta false yapıldı
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [natRes, curRes] = await Promise.all([api.getNationalities(), api.getCurrencies()]);
        setNationalities(natRes || []);
        setCurrencies(curRes || []);
      } catch (err) {
        setError("Başlangıç verileri yüklenemedi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handlePriceSearch = async (searchParams) => {
    setLoading(true);
    try {
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

      const requestBody = {
        ...baseRequest,
        arrivalLocations: [{ id: searchParams.locationId, type: searchParams.locationType }]
      };

      const results = await api.searchByLocation(requestBody);

      setSearchResults(results.body?.hotels || []);
      setSearchId(results.body?.searchId || null);
      setView('results');
    } catch (err) {
      setError("Arama sırasında bir hata oluştu.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  

const handleHotelSelect = async (productId, provider) => {
  setLoading(true);
  setError(null);
  
  try {
    // api.getProductInfo doğrudan otel objesini döndürüyor.
    const hotelData = await api.getProductInfo(productId, provider);

    // Gelen verinin geçerli bir obje olup olmadığını kontrol et.
    if (hotelData && Object.keys(hotelData).length > 0) {
      setSelectedHotel(hotelData);
      setView('detail');
    } else {
      // API'dan boş veya geçersiz bir yanıt gelirse hata ver.
      console.error("Geçersiz veya boş otel detayı alındı.", hotelData);
      setError("Seçilen otelin detayları yüklenemedi.");
    }

  } catch (err) {
    console.error("Otel detayı alınırken hata oluştu:", err);
    setError("Otel detayları alınırken bir hata oluştu.");
  } finally {
    setLoading(false);
  }
};
  // Bu fonksiyon arama sonuçları listesindeki bir otelin teklif detayını getirir.
  const handleOfferFetch = async (productId, offerId) => {
    if (!searchId || !offerId) {
      setError("Arama ID'si veya Teklif ID'si bulunamadı. Lütfen yeni bir arama yapın.");
      return;
    }
    
    setLoading(true);
    try {
      setError(null);
      const requestParams = {
        searchId: searchId,
        offerId: offerId,
        productType: 2,
        productId: productId,
        currency: lastSearchParams.currency,
        culture: "en-US",
        getRoomInfo: true,
      };
      
      const offersResponse = await api.getOffers(requestParams);
      
      // Arama sonuçları listesindeki ilgili oteli bul ve güncelle.
      setSearchResults(prevResults => 
        prevResults.map(hotel => {
          if (hotel.id === productId) {
            // Yeni oda bilgilerini ve bir bayrağı otele ekle
            return { ...hotel, ...offersResponse.body, isOfferDetailVisible: true };
          }
          // Diğer otellerin detaylarını gizle
          return { ...hotel, isOfferDetailVisible: false };
        })
      );
      
    } catch (err) {
      setError("Teklif detayları alınamadı.");
      console.error(err);
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
              onHotelSelect={handleHotelSelect}   // Detay sayfasına gitmek için
              onOfferFetch={handleOfferFetch}     // Teklif detaylarını getirmek için
              currency={lastSearchParams?.currency || 'EUR'}
            />
          </>
        );
      case 'detail':
        return selectedHotel && (
            <HotelDetail 
                hotel={selectedHotel} 
                onBack={() => setView('results')} 
            />
        );
      case 'search':
      default:
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