import { useState, useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { tr } from "date-fns/locale";

/**
 * Giriş ve çıkış tarihlerini seçmek için kullanılan takvim bileşeni.
 * @param {string} checkIn - Giriş tarihi.
 * @param {string} checkOut - Çıkış tarihi.
 * @param {function} onDateChange - Tarihler değiştiğinde çağrılan fonksiyon.
 */
export const DateSelector = ({ checkIn, checkOut, onDateChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDateSelect = (selection) => {
    onDateChange(
      selection.startDate.toLocaleDateString('en-CA').split('T')[0],
      selection.endDate.toLocaleDateString('en-CA').split('T')[0]
    );
  };

  return (
    <div className="relative w-full bg-white/20 rounded-lg px-4 py-3" ref={calendarRef}>
      <button type="button" onClick={() => setShowCalendar(!showCalendar)} className="flex items-center justify-center w-full h-full min-h-[3rem]">
        <Calendar className="h-5 w-5 text-white/70 mr-3" />
        <span className="text-center">
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
            onChange={({ selection }) => handleDateSelect(selection)}
            minDate={new Date()}
            rangeColors={['#2883BB']}
            direction="horizontal"
          />
        </div>
      )}
    </div>
  );
};
