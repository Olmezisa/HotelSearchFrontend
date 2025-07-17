import React, { useState, useEffect } from 'react';
import { Hotel, ArrowLeft, Globe, DollarSign } from 'lucide-react'; // Globe ve DollarSign import edildi.
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState(null);

  // Nationality ve Currency durumlarını App.js'e taşındı.
  const [nationality, setNationality] = useState('DE');
  const [currency, setCurrency] = useState('EUR');

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
    setError(null);
    try {
      setLastSearchParams(searchParams);
      const checkInDate = new Date(searchParams.checkIn);
      const checkOutDate = new Date(searchParams.checkOut);
      const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

      const baseRequest = {
        checkAllotment: true,
        checkStopSale: true,
        getOnlyBestOffers: true,
        productType: 2,
        roomCriteria: SearchParams.roomCriteria,
        nationality: SearchParams.nationality,
        checkIn: SearchParams.checkIn,
        night: nights,
        currency: SearchParams.currency,
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

  // GÜNCELLENDİ: Bu fonksiyon artık getProductInfo ve getOffers'ı birlikte kullanarak doğru veriyi getiriyor.
  const handleHotelSelect = async (productId, provider) => {
    setLoading(true);
    setError(null);
    try {
        if (!lastSearchParams || !searchId) {
            throw new Error("Arama bilgileri eksik. Lütfen yeni bir arama yapın.");
        }
        
        // 1. Arama sonuçlarından tıklanan oteli ve ilk teklifin ID'sini bul.
        const hotelFromSearch = searchResults.find(h => h.id === productId);
        const initialOfferId = hotelFromSearch?.offers?.[0]?.offerId;

        if (!initialOfferId) {
            throw new Error("Geçerli bir teklif ID'si bulunamadı.");
        }

        // 2. getOffers için gerekli parametreleri hazırla.
        const offersRequestParams = {
            searchId: searchId,
            offerId: initialOfferId, // <<<< ÖNEMLİ: offerId eklendi.
            productId: productId,
            productType: 2,
            currency: lastSearchParams.currency,
            culture: "en-US",
            getRoomInfo: true,
        };

        // 3. İki API isteğini aynı anda yap.
        const [staticInfoResponse, offersResponse] = await Promise.all([
            api.getProductInfo(productId, provider),
            api.getOffers(offersRequestParams) // <<<< DOĞRU METOT: getOffers'ı çağırıyoruz.
        ]);

        if (!staticInfoResponse) {
            throw new Error("Otel statik bilgileri alınamadı.");
        }

        // 4. Gelen verileri birleştir.
        const offersToShow = offersResponse.body?.offers || [];
        
        const mergedHotelData = {
            ...staticInfoResponse,
            offers: offersToShow,
        };

        setSelectedHotel(mergedHotelData);
        setView('detail');
    } catch (err) {
        console.error("Otel detayı alınırken hata oluştu:", err);
        setError("Otel detayları alınırken bir hata oluştu.");
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
        return selectedHotel && (
          <HotelDetail 
            hotel={selectedHotel} 
            onBack={() => setView('results')}
            currency={lastSearchParams?.currency || 'EUR'}
          />
        );
      case 'search':
      default:
        return (
          <HomePage
            onSearch={handlePriceSearch}
            nationalities={nationalities}
            currencies={currencies}
            // App.js'teki state'leri HomePage'e props olarak gönderiyoruz
            nationality={nationality}
            setNationality={setNationality}
            currency={currency}
            setCurrency={setCurrency}
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
          {/* Nationality ve Currency kısımlarını buraya taşındı.*/}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-gray-500 mr-2" />
              <select
                value={nationality}
                onChange={e => setNationality(e.target.value)}
                // w-10 (veya ihtiyaca göre daha fazla) ile sadece ok görünür kalacak.
                // appearance-none ile varsayılan tarayıcı stilini kaldırırız.
                // sr-only yerine doğrudan metni gizleyip oka odaklanıyoruz.
                // px-0 ve py-0 ile iç boşluğu sıfırlıyoruz.
                className="w-10 appearance-none bg-transparent focus:outline-none text-gray-700 border-none p-0 py-0 cursor-pointer relative z-10"
              >
                {nationalities.map(n => (
                  // burda kısa olması için id lerini gösterdim.
                  <option key={n.id} value={n.id}>
                    {n.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-gray-500 mr-2" />
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="w-10 appearance-none bg-transparent focus:outline-none text-gray-700 border-none p-0 py-0 cursor-pointer relative z-10"
              >
                {currencies.map(c => (
                  //burda currency için id leri gösterdim.
                  <option key={c.code} value={c.code}>
                    {c.id} {c.code}
                  </option>
                ))}
              </select>
            </div>
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
