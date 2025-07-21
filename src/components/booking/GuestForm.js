import React, { useState, useEffect } from "react";

const GuestForm = ({ onChange, numberOfGuests = [], nationality = "TR", currency = "EUR" }) => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    guests: [],
  });

  useEffect(() => {
    const emptyGuests = Array.from({ length: numberOfGuests }, () => ({
      ad: "",
      soyad: "",
      tc: "",
      uyruk: nationality, // otomatik atanır
    }));
    setForm((prev) => ({ ...prev, guests: emptyGuests }));
  }, [numberOfGuests, nationality]);

  const handleInput = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onChange(updated); // BookingPage’e ilet
  };

  const handleGuestChange = (index, field, value) => {
    const updatedGuests = [...form.guests];
    updatedGuests[index][field] = value;
    const updated = { ...form, guests: updatedGuests };
    setForm(updated);
    onChange(updated); // BookingPage’e ilet
  };

  return (
    <div className="space-y-4 p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold text-[#2883BB]">İletişim Bilgileri</h2>
      <input
        placeholder="Email"
        className="input-style"
        value={form.email}
        onChange={(e) => handleInput("email", e.target.value)}
      />
      <input
        placeholder="Telefon"
        className="input-style"
        value={form.phone}
        onChange={(e) => handleInput("phone", e.target.value)}
      />

      {form.guests.map((guest, index) => (
        <div key={index} className="pt-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold text-[#2883BB]">
            {index + 1}. Misafir Bilgileri
          </h2>
          <input
            placeholder="Ad"
            className="input-style"
            value={guest.ad}
            onChange={(e) => handleGuestChange(index, "ad", e.target.value)}
          />
          <input
            placeholder="Soyad"
            className="input-style"
            value={guest.soyad}
            onChange={(e) => handleGuestChange(index, "soyad", e.target.value)}
          />
          <input
            placeholder="Uyruk"
            className="input-style"
            value={guest.uyruk}
            onChange={(e) => handleGuestChange(index, "uyruk", e.target.value)}
          />
          <input
            placeholder="T.C. Kimlik No"
            className="input-style"
            value={guest.tc}
            onChange={(e) => handleGuestChange(index, "tc", e.target.value)}
          />

        </div>
      ))}

      <p className="text-sm text-gray-500 pt-2">
        Ödeme {currency} cinsindendir.
      </p>
    </div>
  );
};

export default GuestForm;
