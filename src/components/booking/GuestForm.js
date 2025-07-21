import React, { useState } from "react";

const GuestForm = ({ onChange }) => {
  const [form, setForm] = useState({
    email: "",
    phone: "",
    guest1: { ad: "", soyad: "", tc: "" },
    guest2: { ad: "", soyad: "", uyruk: "Türkiye" },
  });

  const handleInput = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    onChange(updated);
  };

  const handleGuestChange = (guestKey, field, value) => {
    const updated = {
      ...form,
      [guestKey]: { ...form[guestKey], [field]: value },
    };
    setForm(updated);
    onChange(updated);
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

      <h2 className="text-xl font-semibold text-[#2883BB]">1. Misafir Bilgileri</h2>
      <input
        placeholder="Ad"
        value={form.guest1.ad}
        onChange={(e) => handleGuestChange("guest1", "ad", e.target.value)}
      />
      <input
        placeholder="Soyad"
        value={form.guest1.soyad}
        onChange={(e) => handleGuestChange("guest1", "soyad", e.target.value)}
      />
      <input
        placeholder="T.C. Kimlik No"
        value={form.guest1.tc}
        onChange={(e) => handleGuestChange("guest1", "tc", e.target.value)}
      />

      <h2 className="text-xl font-semibold text-[#2883BB]">2. Misafir Bilgileri</h2>
      <input
        placeholder="Ad"
        value={form.guest2.ad}
        onChange={(e) => handleGuestChange("guest2", "ad", e.target.value)}
      />
      <input
        placeholder="Soyad"
        value={form.guest2.soyad}
        onChange={(e) => handleGuestChange("guest2", "soyad", e.target.value)}
      />
      <input
        placeholder="Uyruk"
        value={form.guest2.uyruk}
        onChange={(e) => handleGuestChange("guest2", "uyruk", e.target.value)}
      />
    </div>
  );
};

export default GuestForm;
