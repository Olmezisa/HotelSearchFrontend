import React, { useState } from "react";
import GuestForm from "./GuestForm";
import PaymentForm from "./PaymentForm";
import { useLocation } from 'react-router-dom';

const BookingPage = () => {
  const { state } = useLocation(); // ❗ useLocation burada, doğru yer
  const selectedHotel = state?.hotel; // ❗ otel bilgisi burada alınır

  const [guestInfo, setGuestInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const handleSubmit = () => {
    if (!guestInfo || !paymentInfo) {
      alert("Lütfen tüm bilgileri doldurun.");
      return;
    }

    const payload = {
      hotel: selectedHotel,
      guestInfo,
      paymentInfo,
    };

    console.log("Rezervasyon Bilgileri:", payload);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[#001624]">Rezervasyon</h1>

      {/* Otel bilgisi gösterimi */}
      {selectedHotel && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-[#D46A00] mb-2">{selectedHotel.name}</h2>
          <p className="text-gray-600">Şehir: {selectedHotel.city?.name || "Bilinmiyor"}</p>
          <p className="text-gray-600 mt-1">
            Fiyat: {selectedHotel.offers?.[0]?.price?.amount} {selectedHotel.offers?.[0]?.price?.currency}
          </p>
        </div>
      )}

      {/* Form alanı */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GuestForm onChange={setGuestInfo} />
        <PaymentForm onChange={setPaymentInfo} />
      </div>

      {/* Gönder butonu */}
      <button
        onClick={handleSubmit}
        className="mt-8 bg-[#2883BB] text-white px-6 py-3 rounded-lg hover:bg-[#1a5a8a] transition-colors font-semibold"
      >
        Rezervasyonu Tamamla
      </button>
    </div>
  );
};

export default BookingPage;
