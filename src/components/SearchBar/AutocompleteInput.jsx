import { useState, useEffect, useCallback, useRef } from 'react';
import { MapPin, Hotel } from 'lucide-react';
import { api } from '../../api/santsgApi';

export const AutocompleteInput = ({ onLocationSelect, query, setQuery }) => {
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
        onChange={(e) => { onLocationSelect(null); setQuery(e.target.value); setShowSuggestions(true); }}
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
          {!loadingSuggestions && suggestions.length === 0 && (
            <li className="px-4 py-3 text-gray-500">Sonuç bulunamadı.</li>
          )}
        </ul>
      )}
    </div>
  );
};