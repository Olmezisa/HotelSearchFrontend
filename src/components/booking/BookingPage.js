import React, { useState } from "react";
import GuestForm from "./GuestForm";
import PaymentForm from "./PaymentForm";
import { useLocation } from "react-router-dom";

const BookingPage = () => {
  const { state } = useLocation();
  const hotel = state?.hotel;
  const offer = state?.selectedOffer;
  const numberOfGuests = state?.numberOfGuests;
  const numberOfRooms = state?.numberOfRooms;

  const [guestInfo, setGuestInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);

  const handleSubmit = () => {
    // Validasyon eklendi
    if (!guestInfo || !guestInfo.isValid) {
      alert("Lütfen misafir bilgilerini eksiksiz ve doğru doldurun.");
      return;
    }
    if (!paymentInfo || !paymentInfo.isValid) {
      alert("Lütfen ödeme bilgilerini eksiksiz ve doğru doldurun.");
      return;
    }

    const payload = {
      hotel,
      offer,
      guestInfo,
      paymentInfo,
      numberOfGuests,
      numberOfRooms,
    };

    console.log("Rezervasyon Bilgileri:", payload);
    alert("Rezervasyon başarıyla alındı! (Simülasyon)");
    // TODO: API çağrısı yapılacak
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-[#093b5a]">Rezervasyon</h1>

      {hotel && offer ? (
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
          <img
            src={
              hotel?.seasons?.[0]?.mediaFiles?.[0]?.urlFull ||
              hotel?.thumbnailFull ||
              "https://placehold.co/300x200?text=Resim+Yok"
            }
            alt="Otel Görseli"
            className="md:w-64 h-auto md:h-48 object-cover rounded-lg shadow"
          />

          <div>
            <h2 className="text-2xl font-semibold text-[#D46A00] mb-2">{hotel.name}</h2>
            <p className="text-gray-700">Şehir: {hotel.city?.name || "Bilinmiyor"}</p>
            <p className="text-gray-700 mt-1">Adres: {hotel.address || "Adres bilgisi yok"}</p>
            <p className="text-gray-700 mt-1">Oda: {offer.rooms?.[0]?.roomName || "Belirtilmemiş"}</p>
            <p className="text-gray-700 mt-1">Pansiyon: {offer.rooms?.[0]?.boardName || "Belirtilmemiş"}</p>

            {/* Yeni Eklenecek Alanlar */}
            {numberOfGuests && (
              <p className="text-gray-700 mt-1">
                Kişi Sayısı: <strong>{numberOfGuests}</strong>
              </p>
            )}
            {numberOfRooms && (
              <p className="text-gray-700 mt-1">
                Oda Adeti: <strong>{numberOfRooms}</strong>
              </p>
            )}

            {/* 5. madde: Otel Yıldızı ve İptal Politikası */}
            <p className="text-gray-700 mt-1">
              Yıldız: <strong>{hotel.stars || "Bilinmiyor"}</strong>
            </p>
            <p className="text-gray-700 mt-1">
              İptal Politikası: <strong>{offer.cancellationPolicy || "Belirtilmemiş"}</strong>
            </p>

            <p className="text-lg font-semibold mt-3 text-blue-700">
              Fiyat: {offer.price?.amount?.toFixed(2) || "N/A"} {offer.price?.currency || ""}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-red-500 font-semibold mb-6">
          Otel veya teklif bilgisi bulunamadı. Lütfen yeniden arama yapınız.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GuestForm onChange={setGuestInfo} />
        <PaymentForm onChange={setPaymentInfo} />
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-[#2883bb] to-[#093b5a] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-md hover:scale-105 transition-all duration-300"
        >
          Rezervasyonu Tamamla
        </button>
      </div>
    </div>
  );
};

export default BookingPage;
