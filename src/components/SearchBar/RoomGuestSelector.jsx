import { useState, useEffect, useRef } from 'react';
import { Users, Plus, Minus, X } from 'lucide-react';

/**
 * Oda ve misafir sayısını seçmek için kullanılan açılır menü bileşeni.
 * @param {Array} rooms - Mevcut oda ve misafir verisi.
 * @param {function} onRoomsChange - Odalar değiştiğinde çağrılan fonksiyon.
 */
export const RoomGuestSelector = ({ rooms, onRoomsChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const roomsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (roomsRef.current && !roomsRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalGuests = rooms.reduce((acc, room) => acc + room.adult + room.childAges.length, 0);

  const handleAddRoom = () => onRoomsChange([...rooms, { adult: 1, childAges: [] }]);
  const handleRemoveRoom = (index) => { if (rooms.length > 1) onRoomsChange(rooms.filter((_, i) => i !== index)); };
  const handleRoomChange = (index, field, value) => { const newRooms = [...rooms]; newRooms[index][field] = Math.max(1, value); onRoomsChange(newRooms); };
  const handleChildAgeChange = (roomIndex, childIndex, age) => { const newRooms = [...rooms]; newRooms[roomIndex].childAges[childIndex] = age; onRoomsChange(newRooms); };
  const handleAddChild = (roomIndex) => { const newRooms = [...rooms]; newRooms[roomIndex].childAges.push(0); onRoomsChange(newRooms); };
  const handleRemoveChild = (roomIndex, childIndex) => { const newRooms = [...rooms]; newRooms[roomIndex].childAges.splice(childIndex, 1); onRoomsChange(newRooms); };

  return (
    <div className="relative w-full" ref={roomsRef}>
      <button type="button" onClick={() => setShowDropdown(!showDropdown)} className="w-full bg-white/20 rounded-lg flex items-center justify-center px-4 py-3 h-full min-h-[3rem]">
        <Users className="h-5 w-5 text-white/70 mr-3" />
        <span>{totalGuests} Misafir, {rooms.length} Oda</span>
      </button>
      {showDropdown && (
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
  );
};
