import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { AutocompleteInput } from './AutocompleteInput';
import { DateSelector } from './DateSelector';
import { RoomGuestSelector } from './RoomGuestSelector';
import { ErrorMessage } from './ErrorMessage';

// SearchForm bileşeni props olarak nationality, setNationality, currency, setCurrency alacak
export const SearchForm = ({ onSearch, nationality, currency }) => {
  const [location, setLocation] = useState(null);
  const [query, setQuery] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState([{ adult: 2, childAges: [] }]);
  const [formError, setFormError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

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

    onSearch({
      locationId: location.id,
      locationType: location.type,
      checkIn,
      checkOut,
      nationality,
      currency,
      roomCriteria: rooms,
    });
  };

  const handleDateChange = (start, end) => {
    setCheckIn(start);
    setCheckOut(end);
  };

  return (
    <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/30 text-white shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="w-full flex justify-center">
          <div className="scale-[0.9] origin-top max-w-6xl w-full px-2">
            <div className="flex flex-col lg:flex-row gap-3 w-full">
              <div className="lg:col-span-2 w-full bg-white/20 rounded-lg flex items-center px-4 py-3">
                <MapPin className="h-5 w-5 text-white/70 mr-3" />
                <AutocompleteInput onLocationSelect={setLocation} query={query} setQuery={setQuery} />
              </div>

              <DateSelector
                checkIn={checkIn}
                checkOut={checkOut}
                onDateChange={handleDateChange}
              />
              
              <RoomGuestSelector
                rooms={rooms}
                onRoomsChange={setRooms}
              />
              
              <button type="submit" className="w-full lg:col-span-1 bg-[#F9F7F3] text-[#F7A072] font-bold py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center text-base shadow-md">
                Otelleri Keşfet
              </button>
            </div>
          </div>
        </div>
        
        <ErrorMessage message={formError} onClear={() => setFormError(null)} />
      </form>
    </div>
  );
};
