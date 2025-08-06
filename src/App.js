import { useState, useEffect } from 'react';
import { Globe, DollarSign } from 'lucide-react';
import { api } from './api/santsgApi';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResults from './pages/SearchResults';
import { HotelDetail } from '../src/pages/HotelDetail';
import { OfferDetail } from '../src/pages/OfferDetail';
import LoginPage from './components/login/LoginPage';
import voyagoLogo from './voyago2.png';
import BookingPage from './pages/BookingPage';
import PropertyRegistrationForm from './components/PropertyRegistrationForm';


export default function App() {
  const [nationalities, setNationalities] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [lastSearchParams, setLastSearchParams] = useState(null);
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
    let requestBody;
    let response;
    console.log("searchParams:", searchParams)

    // Arama butonuna basılır basılmaz sonuçlar sayfasına yönlendir
    navigate('/results');

    try {
      const SearchParamsWMeta = { ...searchParams, nationality, currency };
      setLastSearchParams(SearchParamsWMeta);
      console.log(SearchParamsWMeta);

      const checkInDate = new Date(SearchParamsWMeta.checkIn);
      const checkOutDate = new Date(SearchParamsWMeta.checkOut);
      const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

      const baseRequest = {
        checkAllotment: true,
        checkStopSale: true,
        getOnlyBestOffers: true,
        productType: 2,
        roomCriteria: SearchParamsWMeta.roomCriteria,
        nationality: SearchParamsWMeta.nationality,
        checkIn: SearchParamsWMeta.checkIn,
        night: nights,
        currency: SearchParamsWMeta.currency,
        culture: "en-US",
      };

      if (SearchParamsWMeta.locationType === 1) {
        requestBody = {
          ...baseRequest,
          arrivalLocations: [{ id: searchParams.locationId, type: 2 }]
        };
        response = await api.searchByLocation(requestBody);
      } else if (SearchParamsWMeta.locationType === 2) {
        requestBody = {
          ...baseRequest,
          Products: [searchParams.locationId]
        }
        response = await api.searchByHotel(requestBody);
      } else {
        console.log("Location type is undefined.")
      }

      setSearchResults(response.body?.hotels || []);
      setSearchId(response.body?.searchId || null);

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

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-900">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src={voyagoLogo} alt="Voyago Logo" className="h-12 w-12" />
            <Link to="/" className="text-3xl font-bold text-[#001624]">Voyago</Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Globe className="h-7 w-7 text-[#2883BB] mr-3" />
              <select
                value={nationality}
                onChange={e => setNationality(e.target.value)}
                className="min-w-[80px] appearance-none bg-transparent focus:outline-none text-[#2883BB] border-none p-0 py-0 cursor-pointer relative z-14"
              >
                {nationalities.map(n => (
                  <option key={n.id} value={n.id}>
                    {n.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-7 w-7 text-[#2883BB] mr-2" />
              <select
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                className="min-w-[80px] appearance-none bg-transparent focus:outline-none text-[#2883BB] border-none p-0 py-0 cursor-pointer relative z-14"
              >
                {currencies.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.id} {c.code}
                  </option>
                ))}
              </select>
            </div>
            <Link
              to="/login"
              className="text-[#2883BB] hover:text-[#B5E2FA] font-semibold transition-colors text-lg flex items-center"
            >
              Giriş Yap
            </Link>
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

          <Route
  path="/results"
  element={
    <SearchResults
      results={searchResults}
      onHotelSelect={handleHotelSelect}
      currency={lastSearchParams?.currency || 'EUR'}
      loading={loading}
    />
  }
/>

          {/* 👇 URL'e offerId parametresini ekledik */}
          <Route path="/hotel/:productId/:providerId/:searchId/:currency/:offerId" element={
            <HotelDetail
              onBack={() => navigate(-1)}
            />
          } />
          <Route path="/offer-details/:offerId/:currency" element={
            <OfferDetail
              onBack={() => navigate(-1)}
            />
          } />
          <Route path="/login" element={<LoginPage />} />

          {/* Yeni BookingPage rotasını ekledik */}
          <Route path="/booking" element={<BookingPage
            currency={currency}
            nationality={nationality} />} />

          {/* 👇 YENİ EKLENEN ROUTE */}
          <Route path="/add-property" element={<PropertyRegistrationForm />} />

          <Route path="*" element={<div className="text-center py-10 text-xl text-gray-600">Sayfa Bulunamadı!</div>} />

        </Routes>
      </main>
      <footer className="bg-white shadow-lg p-10 mt-8 text-[#001624] text-base sticky ">
        <div className="grid grid-cols-3 items-center">
          <div></div>
          <p className="text-center">© 2025 Staj Projesi - SAN TSG</p>
          <div className="flex justify-end">
            <Link
              to="/add-property"
              className="bg-[#2883BB] text-white px-6 py-2 rounded-lg hover:bg-[#1a5a8a] transition-colors font-semibold"
            >
              Tesisinizi Ekleyin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}