import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Star, Wifi, Car, Users, MapPin, Calendar, CreditCard, User, Phone, Mail, CheckCircle } from 'lucide-react';

const BookingPage = () => {
  const location = useLocation();
  const { hotel, offerDetails, roomOffer } = location.state || {};

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });

  // Fallback veriler (eğer state boşsa)
  const defaultHotelData = {
    name: "DoubleTree by Hilton Antalya City Centre",
    rating: 8.4,
    reviewCount: 1025,
    reviewText: "Mükemmel",
    location: "Eşref Mahallesi, Adnan Menderes Bulvarı 61, 07010 Muratpaşa, Antalya",
    checkIn: "20 Ağustos 2025",
    checkInTime: "Çarşamba 14:00",
    checkOut: "21 Ağustos 2025",
    checkOutTime: "Perşembe 12:00",
    guests: "2 Yetişkin",
    nights: "1 gece",
    roomType: "Standart Oda - 29 m²",
    features: ["2 Yetişkin", "Sigara İçilmeyen", "Balkon Oda", "Kahvaltı Dahil"]
  };

  // Tarihleri formatlamak için yardımcı fonksiyon
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const dayName = dayNames[date.getDay()];
    return `${dayName} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // OfferDetail'den gelen verilerle hotelData oluştur
  const hotelData = hotel ? {
    name: hotel.name || defaultHotelData.name,
    rating: hotel.stars || 4,
    reviewCount: defaultHotelData.reviewCount,
    reviewText: defaultHotelData.reviewText,
    location: hotel.city && hotel.country 
      ? `${hotel.city.name}, ${hotel.country.name}` 
      : defaultHotelData.location,
    checkIn: formatDate(offerDetails?.checkIn) || defaultHotelData.checkIn,
    checkInTime: formatDateTime(offerDetails?.checkIn) || defaultHotelData.checkInTime,
    checkOut: formatDate(offerDetails?.checkOut) || defaultHotelData.checkOut,
    checkOutTime: formatDateTime(offerDetails?.checkOut) || defaultHotelData.checkOutTime,
    guests: "2 Yetişkin", // Bu bilgi offerDetails'de yoksa sabit
    nights: offerDetails?.checkIn && offerDetails?.checkOut 
      ? `${Math.ceil((new Date(offerDetails.checkOut) - new Date(offerDetails.checkIn)) / (1000 * 60 * 60 * 24))} gece`
      : defaultHotelData.nights,
    roomType: roomOffer?.roomName || defaultHotelData.roomType,
    features: roomOffer ? [
      "2 Yetişkin",
      roomOffer.boardName || "Oda + Kahvaltı",
      "Sigara İçilmeyen"
    ] : defaultHotelData.features
  } : defaultHotelData;

  // Fiyat bilgileri
// Fiyat bilgileri
const totalPrice = offerDetails?.passengerAmountToPay?.amount || 26775.25;
const currency = offerDetails?.passengerAmountToPay?.currency || 'TRY';

const priceBreakdown = {
  roomPrice: totalPrice * 0.915, // Yaklaşık hesap
  taxes: totalPrice * 0.085,
  serviceFee: 0
};

  const handleInputChange = (section, field, value) => {
    if (section === 'guest') {
      setGuestInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleBooking = () => {
    alert('Rezervasyon başarıyla tamamlandı!');
  };

  // Eğer veri yoksa uyarı göster
  if (!hotel && !offerDetails) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Rezervasyon Bilgileri Bulunamadı</h2>
          <p className="text-gray-600 mb-4">Lütfen önce bir otel seçiniz.</p>
          <button 
            onClick={() => window.history.back()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hotel Info Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">KONAKLAMA BİLGİLERİ</h2>

              <div className="flex gap-4 mb-4">
                <div className="w-24 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-xs text-blue-600">
                  Otel
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{hotelData.name}</h3>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < hotelData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>

                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      {hotelData.rating}
                    </span>
                    <span className="text-blue-600 text-sm">{hotelData.reviewText}</span>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotelData.location}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-600">Giriş:</span>
                  <div className="font-semibold">{hotelData.checkIn}</div>
                  <div className="text-gray-500">{hotelData.checkInTime}</div>
                </div>
                <div>
                  <span className="text-gray-600">Çıkış:</span>
                  <div className="font-semibold">{hotelData.checkOut}</div>
                  <div className="text-gray-500">{hotelData.checkOutTime}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-600">Misafir sayısı:</span>
                  <div className="font-semibold">{hotelData.guests}</div>
                </div>
                <div>
                  <span className="text-gray-600">Süre:</span>
                  <div className="font-semibold">{hotelData.nights}</div>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-gray-600 text-sm">Oda Tipi:</span>
                <div className="font-semibold">{hotelData.roomType}</div>
              </div>

              <div className="flex flex-wrap gap-2">
                {hotelData.features.map((feature, index) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                    {feature}
                  </span>
                ))}
              </div>

              {/* İptal Politikası Bilgisi */}
              {offerDetails?.refundable !== undefined && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <span className={`font-semibold ${!offerDetails.refundable ? 'text-red-600' : 'text-green-600'}`}>
                    {!offerDetails.refundable ? '❌ İptal Edilemez' : '✅ İptal Edilebilir'}
                  </span>
                </div>
              )}
            </div>

            {/* Price Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">FİYAT BİLGİLERİ</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Oda Fiyatı:</span>
                  <span>{priceBreakdown.roomPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vergiler ve Ücretler:</span>
                  <span>{priceBreakdown.taxes.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Toplam Tutar:</span>
                  <span className="text-green-600">{totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">MİSAFİR BİLGİLERİ</h3>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-3">1. Misafir (Ana Misafir)</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Ad *</label>
                        <input
                          type="text"
                          value={guestInfo.firstName}
                          onChange={(e) => handleInputChange('guest', 'firstName', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="Adınız"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Soyad *</label>
                        <input
                          type="text"
                          value={guestInfo.lastName}
                          onChange={(e) => handleInputChange('guest', 'lastName', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="Soyadınız"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">E-posta *</label>
                        <input
                          type="email"
                          value={guestInfo.email}
                          onChange={(e) => handleInputChange('guest', 'email', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="ornek@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Telefon *</label>
                        <input
                          type="tel"
                          value={guestInfo.phone}
                          onChange={(e) => handleInputChange('guest', 'phone', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="+90 555 123 45 67"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <input type="radio" name="gender1" defaultChecked className="text-blue-600" />
                      <span className="text-sm">Kadın</span>
                      <input type="radio" name="gender1" className="text-blue-600 ml-4" />
                      <span className="text-sm">Erkek</span>
                    </div>

                    <div className="mb-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="text-blue-600" required />
                        <span>18 yaşından büyüğüm *</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-3">2. Misafir</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Ad *</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="Adınız"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Soyad *</label>
                        <input
                          type="text"
                          className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                          placeholder="Soyadınız"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <input type="radio" name="gender2" defaultChecked className="text-blue-600" />
                      <span className="text-sm">Kadın</span>
                      <input type="radio" name="gender2" className="text-blue-600 ml-4" />
                      <span className="text-sm">Erkek</span>
                    </div>

                    <div className="mb-4">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="text-blue-600" required />
                        <span>18 yaşından büyüğüm *</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">ÖZEL TALEPLER</h3>
              <div className="mb-4">
                <label className="flex items-center gap-2 text-sm mb-3">
                  <input type="checkbox" className="text-blue-600" />
                  <span>Erken giriş talep ediyorum</span>
                </label>
                <label className="flex items-center gap-2 text-sm mb-3">
                  <input type="checkbox" className="text-blue-600" />
                  <span>Geç çıkış talep ediyorum</span>
                </label>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Diğer özel talepleriniz:</label>
                <textarea
                  rows="3"
                  value={guestInfo.specialRequests}
                  onChange={(e) => handleInputChange('guest', 'specialRequests', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  placeholder="Özel taleplerinizi yazınız..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="space-y-6">
            {/* Payment Cards */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">ÖDEME BİLGİLERİ</h3>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Kabul Edilen Kartlar</h4>
                <div className="flex gap-2">
                  <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">V</div>
                  <div className="w-8 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">M</div>
                  <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
                  <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">AE</div>
                  <div className="w-8 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">T</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Kart Numarası *</label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="**** **** **** ****"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Kart Sahibi *</label>
                  <input
                    type="text"
                    value={paymentInfo.cardHolder}
                    onChange={(e) => handleInputChange('payment', 'cardHolder', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="Kart üzerindeki isim"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Son Kullanma Tarihi *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select 
                      className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Ay</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
                      ))}
                    </select>
                    <select 
                      className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">Yıl</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={2025 + i}>{2025 + i}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">CVV *</label>
                  <input
                    type="text"
                    value={paymentInfo.cvv}
                    onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    placeholder="***"
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Taksit Seçeneği</h4>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option>Tek Çekim</option>
                  <option>2 Taksit</option>
                  <option>3 Taksit</option>
                  <option>6 Taksit</option>
                  <option>9 Taksit</option>
                  <option>12 Taksit</option>
                </select>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}
                    </div>
                    <div className="text-sm text-gray-600">toplam tutar</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span>Oda fiyatı:</span>
                  <span>{priceBreakdown.roomPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vergiler ve ücretler:</span>
                  <span>{priceBreakdown.taxes.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Toplam:</span>
                  <span>{totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
                </div>
              </div>

              <div className="text-xs text-gray-500 mb-4">
                💳 Ödeme bilgileri 256-bit SSL ile korunmaktadır.
              </div>

              <div className="space-y-2 mb-6">
                <label className="flex items-start gap-2 text-xs">
                  <input type="checkbox" className="mt-1" required />
                  <span>Üyelik şartlarını ve koşullarını kabul ediyorum *</span>
                </label>
                <label className="flex items-start gap-2 text-xs">
                  <input type="checkbox" className="mt-1" required />
                  <span>Kişisel Verilerin Korunması Kanunu çerçevesinde, gerekli izinlerin alınmasını ve kişisel veri işlenmesini onaylıyorum *</span>
                </label>
                <label className="flex items-start gap-2 text-xs">
                  <input type="checkbox" className="mt-1" />
                  <span>E-posta ve SMS ile bildirim almayı kabul ediyorum</span>
                </label>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors mb-3"
              >
                📞 Hızlı Rezervasyon
              </button>

              <button 
                onClick={handleBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                💳 Kartla Rezervasyon Tamamla
              </button>

              <p className="text-center text-xs text-gray-500 mt-3">
                Size <span className="text-blue-600 underline">SANTSG 293 48 21</span> numaralı telefonumuzdan ulaşılacaktır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;