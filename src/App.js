import React, { useState, useEffect } from 'react';
import { Hotel, ArrowLeft, Globe, DollarSign } from 'lucide-react';
import { api } from './api/santsgApi';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import { HomePage } from './components/search/HomePage';
import { SearchResults } from './components/results/SearchResults';
import { HotelDetail } from './components/detail/HotelDetail';
import { Spinner } from './components/common/Spinner';

export default function App() {
  const [nationalities, setNationalities] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  // const [selectedHotel, setSelectedHotel] = useState(null); // Bu satırı kaldırdık!
  const [lastSearchParams, setLastSearchParams] = useState(null);
  // const [view, setView] = useState('search'); // Bu satırı kaldırdık!
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchId, setSearchId] = useState(null);

  const [nationality, setNationality] = useState('DE');
  const [currency, setCurrency] = useState('EUR');

  const navigate = useNavigate();

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
    setLoading(true); // Yükleme durumunu hemen başlat
    setError(null);
    setSearchResults(null); // Önceki sonuçları temizle
    setSearchId(null); // Önceki arama ID'sini temizle

    // Arama butonuna basılır basılmaz sonuçlar sayfasına yönlendir
    navigate('/results');

    try {
      const SearchParams = { ...searchParams, nationality, currency };
      setLastSearchParams(SearchParams);

      const checkInDate = new Date(SearchParams.checkIn);
      const checkOutDate = new Date(SearchParams.checkOut);
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
    } catch (err) {
      setError("Arama sırasında bir hata oluştu.");
      console.error(err);
    } finally {
      setLoading(false); // Yükleme durumunu API çağrısı bitince kapat
    }
  };

  const handleHotelSelect = async (productId, provider) => {
    setLoading(true);
    setError(null);
    try {
      // 👇 Arama sonuçlarından tıklanan otelin ilk teklif ID'sini bul
      const hotelFromSearch = searchResults.find(h => h.id === productId);
      const initialOfferId = hotelFromSearch?.offers?.[0]?.offerId;

      if (!initialOfferId) {
        setError("Otele ait geçerli bir teklif bulunamadı.");
        setLoading(false);
        return;
      }

      const currentSearchId = searchId || '';
      const currentCurrency = lastSearchParams?.currency || '';
      
      // 👇 offerId'yi de URL parametresi olarak gönderiyoruz
      navigate(`/hotel/${productId}/${provider}/${currentSearchId}/${currentCurrency}/${initialOfferId}`);
    } catch (err) {
      console.error("Otel detayına geçiş sırasında hata oluştu:", err);
      setError("Otel detaylarına geçişte bir sorun oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOfferFetch = async (productId, offerId, passedSearchId, passedCurrency) => {
    const currentSearchId = passedSearchId;
    const currentCurrency = passedCurrency;

    if (!currentSearchId || !offerId) {
      setError("Arama ID'si veya Teklif ID'si bulunamadı. Lütfen yeni bir arama yapın.");
      return;
    }

    setLoading(true);
    try {
      setError(null);
      const requestParams = {
        searchId: currentSearchId,
        offerId: offerId,
        productType: 2,
        productId: productId,
        currency: currentCurrency,
        culture: "en-US",
        getRoomInfo: true,
      };

      const offersResponse = await api.getOffers(requestParams);

      setSearchResults(prevResults =>
        prevResults.map(hotel => {
          if (hotel.id === productId) {
            return { ...hotel, ...offersResponse.body, isOfferDetailVisible: true };
          }
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

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Hotel className="h-8 w-8 text-blue-600" />
            <Link to="/" className="text-2xl font-bold text-gray-800">Voyago</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-gray-500 mr-2" />
              <select
                value={nationality}
                onChange={e => setNationality(e.target.value)}
                className="w-10 appearance-none bg-transparent focus:outline-none text-gray-700 border-none p-0 py-0 cursor-pointer relative z-10"
              >
                {nationalities.map(n => (
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
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">{error}</div>}

        <Routes>
          <Route path="/" element={
            <HomePage
              onSearch={handlePriceSearch}
              nationalities={nationalities}
              currencies={currencies}
              nationality={nationality}
              setNationality={setNationality}
              currency={currency}
              setCurrency={setCurrency}
            />
          } />

          <Route path="/results" element={
            <>
              <button onClick={() => navigate('/')} className="mb-4 flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-1" /> Yeni Arama Yap
              </button>
              <SearchResults
                results={searchResults}
                onHotelSelect={handleHotelSelect}
                onOfferFetch={handleOfferFetch}
                currency={lastSearchParams?.currency || 'EUR'}
                loading={loading}
              />
            </>
          } />

          {/* 👇 URL'e offerId parametresini ekledik */}
          <Route path="/hotel/:productId/:providerId/:searchId/:currency/:offerId" element={
            <HotelDetail
              onBack={() => navigate(-1)}
            />
          } />

          <Route path="*" element={<div className="text-center py-10 text-xl text-gray-600">Sayfa Bulunamadı!</div>} />
        </Routes>
      </main>
      <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
        <p>© 2025 Staj Projesi - SAN TSG</p>
      </footer>
    </div>
  );
}

