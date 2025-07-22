import React, { useState, useEffect, useCallback } from 'react';
import { MapPin, Hotel } from 'lucide-react';
import { api } from '../../api/santsgApi';

export const AutocompleteInput = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = useCallback(async (searchQuery) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const data = await api.getArrivalAutocomplete(searchQuery);
      if (data && data.items) {
        setSuggestions(data.items);
      }
    } catch (error) {
      console.error("Autocomplete hatası:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => { fetchSuggestions(query); }, 500);
    return () => { clearTimeout(handler); };
  }, [query, fetchSuggestions]);

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
    <div className="relative w-full">
      <div className="flex items-center">
        <MapPin className="absolute left-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
          placeholder="Şehir veya otel adı girin (örn: Antalya)"
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
      {showSuggestions && query.length >= 3 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading && <li className="px-4 py-2 text-gray-500">Yükleniyor...</li>}
          {!loading && suggestions.length === 0 && <li className="px-4 py-2 text-gray-500">Sonuç bulunamadı.</li>}
          {suggestions.map((s, index) => (
            <li key={`${s.type}-${s.city?.id || s.hotel?.id}-${index}`} onClick={() => handleSelect(s)} className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition flex items-center">
              <div className="mr-3">{s.type === 2 ? <Hotel className="h-5 w-5 text-gray-500" /> : <MapPin className="h-5 w-5 text-gray-500" />}</div>
              <div>
                <p className="font-semibold">{s.hotel ? s.hotel.name : s.city.name}</p>
                <p className="text-sm text-gray-500">{s.country.name}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};