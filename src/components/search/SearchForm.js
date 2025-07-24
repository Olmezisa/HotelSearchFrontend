import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, MapPin, Hotel, X, Plus, Minus, Calendar, Users, AlertCircle } from 'lucide-react'; // Globe ve DollarSign ikonlarını kaldırdık
import { api } from '../../api/santsgApi';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { tr } from "date-fns/locale";
// AutocompleteInput bileşeni, arama kutusu ve öneri listesini yönetir.
const AutocompleteInput = ({ onLocationSelect, query, setQuery }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef(null);

  const fetchSuggestions = useCallback(async (searchQuery) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoadingSuggestions(true);
    try {
      const data = await api.getArrivalAutocomplete(searchQuery);
      setSuggestions(data.items || []);
    } catch (error) {
      console.error("Autocomplete önerileri alınamadı:", error);
      setSuggestions([]);
    } finally {
      setLoadingSuggestions(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => { fetchSuggestions(query); }, 500);
    return () => { clearTimeout(handler); };
  }, [query, fetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (suggestion) => {
    const name = suggestion.hotel ? suggestion.hotel.name : suggestion.city.name;
    const id = suggestion.hotel ? suggestion.hotel.id : suggestion.city.id;
    const type = suggestion.type;

    setQuery(name);
    onLocationSelect({ id, type, name });
    setShowSuggestions(false);
    setSuggestions([]);
  };

  return (
    <div className="relative w-full" ref={searchBarRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); onLocationSelect(null); setShowSuggestions(true); }}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Şehir veya otel adı"
        className="w-full h-full bg-transparent focus:outline-none placeholder-gray-300"
      />
      {showSuggestions && query.length >= 3 && (
        <ul className="absolute top-full left-0 z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto text-gray-800">
          {loadingSuggestions && <li className="px-4 py-2">Yükleniyor...</li>}
          {!loadingSuggestions && suggestions.length > 0 && suggestions.map((s, index) => (
            <li key={`${s.type}-${s.hotel?.id || s.city?.id}-${index}`} onClick={() => handleSelect(s)} className="px-4 py-3 cursor-pointer hover:bg-gray-100 transition flex items-center">
              <div className="mr-3">{s.type === 2 ? <Hotel className="h-5 w-5 text-gray-500" /> : <MapPin className="h-5 w-5 text-gray-500" />}</div>
              <div><p className="font-semibold">{s.hotel ? s.hotel.name : s.city.name}</p><p className="text-sm text-gray-500">{s.country.name}</p></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// SearchForm bileşeni props olarak nationality, setNationality, currency, setCurrency alacak
export const SearchForm = ({ onSearch, nationality, currency }) => {
  const [location, setLocation] = useState(null);
  const [query, setQuery] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  // nationality ve currency state'lerini kaldırdık, props'tan alıyoruz
  const [rooms, setRooms] = useState([{ adult: 2, childAges: [] }]);

  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const roomsRef = useRef(null);

  // Yeni hata state'i
  const [formError, setFormError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roomsRef.current && !roomsRef.current.contains(event.target)) {
        setShowRoomsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hata mesajını sıfırla
    setFormError(null);

    // Kontrolleri yap
    if (!location) {
      setFormError("Lütfen bir şehir veya otel seçin.");
      return;
    }
    if (!checkIn) {
      setFormError("Lütfen giriş tarihini seçin.");
      return;
    }
    if (!checkOut) {
      setFormError("Lütfen çıkış tarihini seçin.");
      return;
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      setFormError("Çıkış tarihi, giriş tarihinden sonra olmalıdır.");
      return;
    }
    // nationality ve currency props olarak geldiği için doğrudan kullanıyoruz
    onSearch({
      locationId: location.id,
      locationType: location.type,
      checkIn,
      checkOut,
      nationality, // App.js'ten gelen nationality
      currency,    // App.js'ten gelen currency
      roomCriteria: rooms,
    });
  };

  // formError değiştiğinde hata mesajını belirli bir süre sonra temizle
  useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => {
        setFormError(null);
      }, 3000); // 3 saniye sonra kaybolur
      return () => clearTimeout(timer);
    }
  }, [formError]);

  const totalGuests = rooms.reduce((acc, room) => acc + room.adult + room.childAges.length, 0);

  const handleAddRoom = () => setRooms([...rooms, { adult: 1, childAges: [] }]);
  const handleRemoveRoom = (index) => { if (rooms.length > 1) setRooms(rooms.filter((_, i) => i !== index)); };
  const handleRoomChange = (index, field, value) => { const newRooms = [...rooms]; newRooms[index][field] = Math.max(1, value); setRooms(newRooms); };
  const handleChildAgeChange = (roomIndex, childIndex, age) => { const newRooms = [...rooms]; newRooms[roomIndex].childAges[childIndex] = age; setRooms(newRooms); };
  const handleAddChild = (roomIndex) => { const newRooms = [...rooms]; newRooms[roomIndex].childAges.push(0); setRooms(newRooms); };
  const handleRemoveChild = (roomIndex, childIndex) => { const newRooms = [...rooms]; newRooms[roomIndex].childAges.splice(childIndex, 1); setRooms(newRooms); };

  return (
    <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/30 text-white shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* --- BİRİNCİ SIRA --- */}
        {/*burda searchbar içindeki kutucukların gap 4 olarak değiştirdim ve grid-cols kısmı 6 olarak yaptım hepsini tek bir sıra haline getirildi.*/}
        <div className="w-full flex justify-center">
  <div className="scale-[0.9] origin-top max-w-6xl w-full px-2">
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          <div className="lg:col-span-2 w-full bg-white/20 rounded-lg flex items-center px-4 py-3">
            <MapPin className="h-5 w-5 text-white/70 mr-3" />
            <AutocompleteInput onLocationSelect={setLocation} query={query} setQuery={setQuery} />
          </div>
          <div className="relative w-full bg-white/20 rounded-lg px-4 py-3" ref={calendarRef}>
            <button type="button" onClick={() => setShowCalendar(!showCalendar)} className="flex items-center justify-center w-full h-full min-h-[3rem]">
              <Calendar className="h-5 w-5 text-white/70 mr-3" />
              <span clasname="text-center">
                {checkIn && checkOut
                  ? `${new Date(checkIn).toLocaleDateString()} - ${new Date(checkOut).toLocaleDateString()}`
                  : 'Tarih Seçin'}
              </span>
            </button>

            {showCalendar && (
              <div className="absolute z-30 top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200">
                <DateRange
                  locale={tr}
                  ranges={[{
                    startDate: checkIn ? new Date(checkIn) : new Date(),
                    endDate: checkOut ? new Date(checkOut) : new Date(),
                    key: 'selection',
                  }]}
                  onChange={({ selection }) => {
                    setCheckIn(selection.startDate.toLocaleDateString('en-CA').split('T')[0]);
                    setCheckOut(selection.endDate.toLocaleDateString('en-CA').split('T')[0]);
                  }}
                  minDate={new Date()}
                  rangeColors={['#2883BB']}
                  direction="horizontal"
                />
              </div>
            )}
          </div>
          <div className="relative w-full" ref={roomsRef}>
            <button type="button" onClick={() => setShowRoomsDropdown(!showRoomsDropdown)} className="w-full bg-white/20 rounded-lg flex items-center justify-center px-4 py-3 h-full min-h-[3rem]">
              <Users className="h-5 w-5 text-white/70 mr-3" />
              <span>{totalGuests} Misafir, {rooms.length} Oda</span>
            </button>
            {showRoomsDropdown && (
              <div className="absolute top-full left-0 z-20 mt-2 bg-white text-gray-800 p-4 rounded-lg shadow-lg w-80 space-y-4">
                {rooms.map((room, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2"><p className="font-semibold">Oda {index + 1}</p>{rooms.length > 1 && <button type="button" onClick={() => handleRemoveRoom(index)} className="p-1 rounded-full hover:bg-red-100 text-red-500"><X className="h-4 w-4" /></button>}</div>
                    <div className="flex justify-between items-center mb-2"><label>Yetişkin</label><div className="flex items-center"><button type="button" onClick={() => handleRoomChange(index, 'adult', room.adult - 1)} className="h-6 w-6 border rounded-full">-</button><span className="w-8 text-center">{room.adult}</span><button type="button" onClick={() => handleRoomChange(index, 'adult', room.adult + 1)} className="h-6 w-6 border rounded-full">+</button></div></div>
                    <div className="flex justify-between items-center"><label>Çocuk</label><button type="button" onClick={() => handleAddChild(index)} className="bg-blue-100 text-blue-600 rounded-full p-1"><Plus className="h-4 w-4" /></button></div>
                    {room.childAges.map((age, childIndex) => (<div key={childIndex} className="flex justify-between items-center mt-2 pl-4"><span className="text-sm">Çocuk {childIndex + 1} Yaşı</span><div className="flex items-center"><input type="number" min="0" max="17" value={age} onChange={(e) => handleChildAgeChange(index, childIndex, parseInt(e.target.value))} className="w-16 p-1 border rounded-md" /><button type="button" onClick={() => handleRemoveChild(index, childIndex)} className="ml-2 text-red-500 hover:text-red-700"><Minus className="h-4 w-4" /></button></div></div>))}
                  </div>
                ))}
                <button type="button" onClick={handleAddRoom} className="w-full text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition text-sm">+ Oda Ekle</button>
              </div>
            )}
          </div>
          <button type="submit" className="w-full lg:col-span-1 bg-[#F9F7F3] text-[#F7A072] font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center text-base shadow-md">
              Otelleri Keşfet
            </button>
        </div></div> </div>
        {/*burda searchbar daki ikinci row olarak oluşturulan kısmı kaldırdım .Tek row olarak bıraktım.*/}
        {/* Hata Mesajı Gösterim Alanı */}
        {formError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center mb-4 transition-opacity duration-300 ease-in-out opacity-100"
            role="alert"
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="font-semibold">{formError}</p>
            <button
              onClick={() => setFormError(null)}
              className="ml-auto text-red-700 hover:text-red-900 focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};