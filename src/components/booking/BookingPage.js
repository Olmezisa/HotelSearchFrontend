// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Star, Wifi, Car, Users, MapPin, Calendar, CreditCard, User, Phone, Mail, CheckCircle } from 'lucide-react';

// const BookingPage = () => {
//   const location = useLocation();
//   const { hotel, offerDetails, roomOffer } = location.state || {};

//   const [selectedRoom, setSelectedRoom] = useState(null);
//   const [guestInfo, setGuestInfo] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     specialRequests: ''
//   });
//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: '',
//     expiryDate: '',
//     cvv: '',
//     cardHolder: ''
//   });

//   // Fallback veriler (eğer state boşsa)
//   const defaultHotelData = {
//     name: "DoubleTree by Hilton Antalya City Centre",
//     rating: 8.4,
//     reviewCount: 1025,
//     reviewText: "Mükemmel",
//     location: "Eşref Mahallesi, Adnan Menderes Bulvarı 61, 07010 Muratpaşa, Antalya",
//     checkIn: "20 Ağustos 2025",
//     checkInTime: "Çarşamba 14:00",
//     checkOut: "21 Ağustos 2025",
//     checkOutTime: "Perşembe 12:00",
//     guests: "2 Yetişkin",
//     nights: "1 gece",
//     roomType: "Standart Oda - 29 m²",
//     features: ["2 Yetişkin", "Sigara İçilmeyen", "Balkon Oda", "Kahvaltı Dahil"]
//   };

//   // Tarihleri formatlamak için yardımcı fonksiyon
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     return new Date(dateString).toLocaleDateString('tr-TR', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric'
//     });
//   };

//   const formatDateTime = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
//     const dayName = dayNames[date.getDay()];
//     return `${dayName} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
//   };

//   // OfferDetail'den gelen verilerle hotelData oluştur
//   const hotelData = hotel ? {
//     name: hotel.name || defaultHotelData.name,
//     rating: hotel.stars || 4,
//     reviewCount: defaultHotelData.reviewCount,
//     reviewText: defaultHotelData.reviewText,
//     location: hotel.city && hotel.country 
//       ? `${hotel.city.name}, ${hotel.country.name}` 
//       : defaultHotelData.location,
//     checkIn: formatDate(offerDetails?.checkIn) || defaultHotelData.checkIn,
//     checkInTime: formatDateTime(offerDetails?.checkIn) || defaultHotelData.checkInTime,
//     checkOut: formatDate(offerDetails?.checkOut) || defaultHotelData.checkOut,
//     checkOutTime: formatDateTime(offerDetails?.checkOut) || defaultHotelData.checkOutTime,
//     guests: "2 Yetişkin", // Bu bilgi offerDetails'de yoksa sabit
//     nights: offerDetails?.checkIn && offerDetails?.checkOut 
//       ? `${Math.ceil((new Date(offerDetails.checkOut) - new Date(offerDetails.checkIn)) / (1000 * 60 * 60 * 24))} gece`
//       : defaultHotelData.nights,
//     roomType: roomOffer?.roomName || defaultHotelData.roomType,
//     features: roomOffer ? [
//       "2 Yetişkin",
//       roomOffer.boardName || "Oda + Kahvaltı",
//       "Sigara İçilmeyen"
//     ] : defaultHotelData.features
//   } : defaultHotelData;

//   // Fiyat bilgileri
// // Fiyat bilgileri
// const totalPrice = offerDetails?.passengerAmountToPay?.amount || 26775.25;
// const currency = offerDetails?.passengerAmountToPay?.currency || 'TRY';

// const priceBreakdown = {
//   roomPrice: totalPrice * 0.915, // Yaklaşık hesap
//   taxes: totalPrice * 0.085,
//   serviceFee: 0
// };

//   const handleInputChange = (section, field, value) => {
//     if (section === 'guest') {
//       setGuestInfo(prev => ({ ...prev, [field]: value }));
//     } else if (section === 'payment') {
//       setPaymentInfo(prev => ({ ...prev, [field]: value }));
//     }
//   };

//   const handleBooking = () => {
//     alert('Rezervasyon başarıyla tamamlandı!');
//   };

//   // Eğer veri yoksa uyarı göster
//   if (!hotel && !offerDetails) {
//     return (
//       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-md text-center">
//           <h2 className="text-xl font-bold text-red-600 mb-4">Rezervasyon Bilgileri Bulunamadı</h2>
//           <p className="text-gray-600 mb-4">Lütfen önce bir otel seçiniz.</p>
//           <button 
//             onClick={() => window.history.back()} 
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Geri Dön
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-6xl mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Main Content */}
//           <div className="lg:col-span-2 space-y-6">

//             {/* Hotel Info Section */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h2 className="text-xl font-bold text-gray-900 mb-2">KONAKLAMA BİLGİLERİ</h2>

//               <div className="flex gap-4 mb-4">
//                 <div className="w-24 h-20 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-xs text-blue-600">
//                   Otel
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-gray-900">{hotelData.name}</h3>
//                   <div className="flex items-center gap-2 mb-1">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className={`w-4 h-4 ${i < hotelData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                         />
//                       ))}
//                     </div>

//                     <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
//                       {hotelData.rating}
//                     </span>
//                     <span className="text-blue-600 text-sm">{hotelData.reviewText}</span>
//                   </div>
//                   <p className="text-sm text-gray-600 flex items-center">
//                     <MapPin className="w-4 h-4 mr-1" />
//                     {hotelData.location}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4 text-sm mb-4">
//                 <div>
//                   <span className="text-gray-600">Giriş:</span>
//                   <div className="font-semibold">{hotelData.checkIn}</div>
//                   <div className="text-gray-500">{hotelData.checkInTime}</div>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Çıkış:</span>
//                   <div className="font-semibold">{hotelData.checkOut}</div>
//                   <div className="text-gray-500">{hotelData.checkOutTime}</div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4 text-sm mb-4">
//                 <div>
//                   <span className="text-gray-600">Misafir sayısı:</span>
//                   <div className="font-semibold">{hotelData.guests}</div>
//                 </div>
//                 <div>
//                   <span className="text-gray-600">Süre:</span>
//                   <div className="font-semibold">{hotelData.nights}</div>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <span className="text-gray-600 text-sm">Oda Tipi:</span>
//                 <div className="font-semibold">{hotelData.roomType}</div>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 {hotelData.features.map((feature, index) => (
//                   <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
//                     {feature}
//                   </span>
//                 ))}
//               </div>

//               {/* İptal Politikası Bilgisi */}
//               {offerDetails?.refundable !== undefined && (
//                 <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                   <span className={`font-semibold ${!offerDetails.refundable ? 'text-red-600' : 'text-green-600'}`}>
//                     {!offerDetails.refundable ? '❌ İptal Edilemez' : '✅ İptal Edilebilir'}
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Price Info */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="font-semibold text-gray-900 mb-4">FİYAT BİLGİLERİ</h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span>Oda Fiyatı:</span>
//                   <span>{priceBreakdown.roomPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Vergiler ve Ücretler:</span>
//                   <span>{priceBreakdown.taxes.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
//                 </div>
//                 <hr className="my-2" />
//                 <div className="flex justify-between font-semibold text-lg">
//                   <span>Toplam Tutar:</span>
//                   <span className="text-green-600">{totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Guest Information */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="font-semibold text-gray-900 mb-4">MİSAFİR BİLGİLERİ</h3>

//               <div className="space-y-4">
//                 <div className="flex gap-4">
//                   <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
//                   <div className="flex-1">
//                     <h4 className="font-semibold mb-3">1. Misafir (Ana Misafir)</h4>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm text-gray-600 mb-1">Ad *</label>
//                         <input
//                           type="text"
//                           value={guestInfo.firstName}
//                           onChange={(e) => handleInputChange('guest', 'firstName', e.target.value)}
//                           className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                           placeholder="Adınız"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm text-gray-600 mb-1">Soyad *</label>
//                         <input
//                           type="text"
//                           value={guestInfo.lastName}
//                           onChange={(e) => handleInputChange('guest', 'lastName', e.target.value)}
//                           className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                           placeholder="Soyadınız"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm text-gray-600 mb-1">E-posta *</label>
//                         <input
//                           type="email"
//                           value={guestInfo.email}
//                           onChange={(e) => handleInputChange('guest', 'email', e.target.value)}
//                           className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                           placeholder="ornek@email.com"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm text-gray-600 mb-1">Telefon *</label>
//                         <input
//                           type="tel"
//                           value={guestInfo.phone}
//                           onChange={(e) => handleInputChange('guest', 'phone', e.target.value)}
//                           className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                           placeholder="+90 555 123 45 67"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 mb-4">
//                       <input type="radio" name="gender1" defaultChecked className="text-blue-600" />
//                       <span className="text-sm">Kadın</span>
//                       <input type="radio" name="gender1" className="text-blue-600 ml-4" />
//                       <span className="text-sm">Erkek</span>
//                     </div>

//                     <div className="mb-4">
//                       <label className="flex items-center gap-2 text-sm">
//                         <input type="checkbox" className="text-blue-600" required />
//                         <span>18 yaşından büyüğüm *</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
//                   <div className="flex-1">
//                     <h4 className="font-semibold mb-3">2. Misafir</h4>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm text-gray-600 mb-1">Ad *</label>
//                         <input
//                           type="text"
//                           className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                           placeholder="Adınız"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm text-gray-600 mb-1">Soyad *</label>
//                         <input
//                           type="text"
//                           className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                           placeholder="Soyadınız"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 mb-4">
//                       <input type="radio" name="gender2" defaultChecked className="text-blue-600" />
//                       <span className="text-sm">Kadın</span>
//                       <input type="radio" name="gender2" className="text-blue-600 ml-4" />
//                       <span className="text-sm">Erkek</span>
//                     </div>

//                     <div className="mb-4">
//                       <label className="flex items-center gap-2 text-sm">
//                         <input type="checkbox" className="text-blue-600" required />
//                         <span>18 yaşından büyüğüm *</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Special Requests */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="font-semibold text-gray-900 mb-4">ÖZEL TALEPLER</h3>
//               <div className="mb-4">
//                 <label className="flex items-center gap-2 text-sm mb-3">
//                   <input type="checkbox" className="text-blue-600" />
//                   <span>Erken giriş talep ediyorum</span>
//                 </label>
//                 <label className="flex items-center gap-2 text-sm mb-3">
//                   <input type="checkbox" className="text-blue-600" />
//                   <span>Geç çıkış talep ediyorum</span>
//                 </label>
//               </div>
//               <div>
//                 <label className="block text-sm text-gray-600 mb-2">Diğer özel talepleriniz:</label>
//                 <textarea
//                   rows="3"
//                   value={guestInfo.specialRequests}
//                   onChange={(e) => handleInputChange('guest', 'specialRequests', e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                   placeholder="Özel taleplerinizi yazınız..."
//                 ></textarea>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Booking Summary */}
//           <div className="space-y-6">
//             {/* Payment Cards */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <h3 className="font-semibold text-gray-900 mb-4">ÖDEME BİLGİLERİ</h3>

//               <div className="mb-4">
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">Kabul Edilen Kartlar</h4>
//                 <div className="flex gap-2">
//                   <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">V</div>
//                   <div className="w-8 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">M</div>
//                   <div className="w-8 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
//                   <div className="w-8 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">AE</div>
//                   <div className="w-8 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">T</div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">Kart Numarası *</label>
//                   <input
//                     type="text"
//                     value={paymentInfo.cardNumber}
//                     onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                     placeholder="**** **** **** ****"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">Kart Sahibi *</label>
//                   <input
//                     type="text"
//                     value={paymentInfo.cardHolder}
//                     onChange={(e) => handleInputChange('payment', 'cardHolder', e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                     placeholder="Kart üzerindeki isim"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">Son Kullanma Tarihi *</label>
//                   <div className="grid grid-cols-2 gap-2">
//                     <select 
//                       className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                       required
//                     >
//                       <option value="">Ay</option>
//                       {[...Array(12)].map((_, i) => (
//                         <option key={i} value={i + 1}>{String(i + 1).padStart(2, '0')}</option>
//                       ))}
//                     </select>
//                     <select 
//                       className="p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                       required
//                     >
//                       <option value="">Yıl</option>
//                       {[...Array(10)].map((_, i) => (
//                         <option key={i} value={2025 + i}>{2025 + i}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm text-gray-600 mb-1">CVV *</label>
//                   <input
//                     type="text"
//                     value={paymentInfo.cvv}
//                     onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//                     placeholder="***"
//                     maxLength="4"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <h4 className="text-sm font-medium text-gray-700 mb-2">Taksit Seçeneği</h4>
//                 <select className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none">
//                   <option>Tek Çekim</option>
//                   <option>2 Taksit</option>
//                   <option>3 Taksit</option>
//                   <option>6 Taksit</option>
//                   <option>9 Taksit</option>
//                   <option>12 Taksit</option>
//                 </select>
//               </div>
//             </div>

//             {/* Price Summary */}
//             <div className="bg-white rounded-lg shadow-sm p-6">
//               <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-4">
//                 <div className="flex items-center justify-between">
//                   <CheckCircle className="w-5 h-5 text-green-600" />
//                   <div className="text-right">
//                     <div className="text-2xl font-bold text-green-600">
//                       {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}
//                     </div>
//                     <div className="text-sm text-gray-600">toplam tutar</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2 text-sm mb-4">
//                 <div className="flex justify-between">
//                   <span>Oda fiyatı:</span>
//                   <span>{priceBreakdown.roomPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Vergiler ve ücretler:</span>
//                   <span>{priceBreakdown.taxes.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
//                 </div>
//                 <hr className="my-2" />
//                 <div className="flex justify-between font-semibold">
//                   <span>Toplam:</span>
//                   <span>{totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
//                 </div>
//               </div>

//               <div className="text-xs text-gray-500 mb-4">
//                 💳 Ödeme bilgileri 256-bit SSL ile korunmaktadır.
//               </div>

//               <div className="space-y-2 mb-6">
//                 <label className="flex items-start gap-2 text-xs">
//                   <input type="checkbox" className="mt-1" required />
//                   <span>Üyelik şartlarını ve koşullarını kabul ediyorum *</span>
//                 </label>
//                 <label className="flex items-start gap-2 text-xs">
//                   <input type="checkbox" className="mt-1" required />
//                   <span>Kişisel Verilerin Korunması Kanunu çerçevesinde, gerekli izinlerin alınmasını ve kişisel veri işlenmesini onaylıyorum *</span>
//                 </label>
//                 <label className="flex items-start gap-2 text-xs">
//                   <input type="checkbox" className="mt-1" />
//                   <span>E-posta ve SMS ile bildirim almayı kabul ediyorum</span>
//                 </label>
//               </div>

//               <button
//                 onClick={handleBooking}
//                 className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors mb-3"
//               >
//                 📞 Hızlı Rezervasyon
//               </button>

//               <button 
//                 onClick={handleBooking}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
//               >
//                 💳 Kartla Rezervasyon Tamamla
//               </button>

//               <p className="text-center text-xs text-gray-500 mt-3">
//                 Size <span className="text-blue-600 underline">SANTSG 293 48 21</span> numaralı telefonumuzdan ulaşılacaktır.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;


import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Star, Users, MapPin, Calendar, CreditCard, CheckCircle, XCircle } from 'lucide-react';

const BookingPage = () => {
  const location = useLocation();
  // location.state'ten gelen offerDetails ve transactionData'yı alıyoruz
  // transactionData'nın otel detay sayfasından zaten çekilmiş olarak gelmesi bekleniyor
  const { offerDetails: initialOfferDetails, transactionData: initialTransactionData } = location.state || {};

  // offerDetails ve transactionData'yı state'e atıyoruz
  const [offerDetails, setOfferDetails] = useState(initialOfferDetails);
  const [transactionData, setTransactionData] = useState(initialTransactionData);

  // Yükleme ve hata durumları için state
  // Başlangıçta hem offerDetails hem de transactionData gelmediyse yükleniyor sayılır
  const [loading, setLoading] = useState(!initialOfferDetails || !initialTransactionData);
  const [error, setError] = useState(null);
  // Rezervasyon onay modalı için state
  const [showBookingSuccessModal, setShowBookingSuccessModal] = useState(false);
  const [showBookingErrorModal, setShowBookingErrorModal] = useState(false);

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

  // Fallback veriler (eğer gerekli veriler bulunamazsa)
  const defaultHotelData = {
    name: "Otel Bilgisi Yok",
    rating: 0,
    reviewCount: 0,
    reviewText: "N/A",
    location: "Bilinmiyor",
    checkIn: "N/A",
    checkInTime: "N/A",
    checkOut: "N/A",
    checkOutTime: "N/A",
    guests: "N/A",
    nights: "N/A",
    roomType: "N/A",
    features: []
  };

  // Tarihleri formatlamak için yardımcı fonksiyon
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
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
    return `${dayName} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // Sayfa yüklendiğinde veya initial veriler değiştiğinde state'leri güncelle
  useEffect(() => {
    if (initialOfferDetails && initialTransactionData) {
      setOfferDetails(initialOfferDetails);
      setTransactionData(initialTransactionData);
      setLoading(false);
    } else if (!initialOfferDetails || !initialTransactionData) {
      // Eğer gerekli verilerden biri veya ikisi de gelmediyse hata göster
      setError("Rezervasyon bilgileri eksik. Lütfen bir önceki sayfaya dönerek tekrar deneyin.");
      setLoading(false);
    }
  }, [initialOfferDetails, initialTransactionData]);

  // Otel ve oda bilgilerini offerDetails'ten al
  const hotel = offerDetails?.hotels?.[0];
  const roomOffer = hotel?.offers?.[0]?.rooms?.[0];

  // currentHotelData'yı offerDetails ve transactionData'dan türet
  const currentHotelData = hotel ? {
    name: hotel.name || defaultHotelData.name,
    rating: hotel.stars || 4, // API yanıtında stars yoksa varsayılan veya statik
    location: hotel.city?.name && hotel.country?.name
      ? `${hotel.city.name}, ${hotel.country.name}`
      : defaultHotelData.location,
    // Tarihleri transactionData'dan al
    checkIn: formatDate(transactionData?.reservationData?.reservationInfo?.beginDate) || defaultHotelData.checkIn,
    //! checkInTime: formatDateTime(transactionData?.reservationData?.beginDate) || defaultHotelData.checkInTime,
    checkOut: formatDate(transactionData?.reservationData?.reservationInfo?.endDate) || defaultHotelData.checkOut,
    //! checkOutTime: formatDateTime(transactionData?.reservationData?.endDate) || defaultHotelData.checkOutTime,
    // Misafir sayısını transactionData'dan al
    guests: transactionData?.reservationData?.travellers?.length
      ? `${transactionData.reservationData.travellers.length} Yetişkin` // Çocuk bilgisi traveller objelerinde yoksa sadece yetişkin sayısı
      : defaultHotelData.guests,
    // Konaklama süresini transactionData'dan al
    nights: transactionData?.reservationData?.reservationInfo?.beginDate && transactionData?.reservationData?.reservationInfo?.endDate
      ? `${Math.ceil((new Date(transactionData.reservationData.reservationInfo.endDate) - new Date(transactionData.reservationData.reservationInfo.beginDate)) / (1000 * 60 * 60 * 24))} gece`
      : defaultHotelData.nights,
    roomType: roomOffer?.roomName || defaultHotelData.roomType,
    features: [
      `${transactionData?.reservationData?.travellers?.length || 0} Yetişkin`, // Özelliklerde de güncel misafir sayısı
      roomOffer?.boardName || "Oda + Kahvaltı",
      "Sigara İçilmeyen" // Bu bilgi API'de yoksa sabit kalabilir
    ]
  } : defaultHotelData;

  // Fiyat bilgileri: transactionData'dan al
  const totalPrice = transactionData?.reservationData?.reservationInfo?.passengerAmountToPay?.amount || 0;
  const currency = transactionData?.reservationData?.reservationInfo?.passengerAmountToPay?.currency || 'EUR';

  // API yanıtında detaylı fiyat kırılımı (oda fiyatı, vergiler) doğrudan bulunmadığı için
  // bu kısmı sadece toplam tutarı gösterecek şekilde basitleştiriyoruz.
  // Eğer API'den bu detaylar gelirse, burayı güncelleyebilirsiniz.
  const priceBreakdown = {
    roomPrice: 0, // API'den gelmiyor, gösterilmeyecek
    taxes: 0,     // API'den gelmiyor, gösterilmeyecek
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
    // Gerçek rezervasyon işlemleri burada yapılır
    // Örnek olarak başarılı modalı gösteriyoruz
    setShowBookingSuccessModal(true);
    // Hata durumunda setShowBookingErrorModal(true);
  };

  // Eğer veri yükleniyorsa veya hata varsa
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Bilgiler Yükleniyor...</h2>
          <p className="text-gray-600">Lütfen bekleyiniz.</p>
          <div className="mt-4 animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Hata!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
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

  // Eğer gerekli offerDetails veya transactionData gelmediyse (hata durumu dışında)
  // Bu kontrolü en sona taşıdık, çünkü loading ve error durumları öncelikli
  if (!offerDetails || !transactionData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Rezervasyon Bilgileri Eksik</h2>
          <p className="text-gray-600 mb-4">Rezervasyon detayları veya işlem bilgileri yüklenemedi. Lütfen bir önceki sayfaya dönerek tekrar deneyin.</p>
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
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="max-w-6xl mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Rezervasyon Detayları</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hotel Info Section */}
            <div className="bg-white rounded-xl shadow-lg p-7 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-5 border-b pb-3">KONAKLAMA BİLGİLERİ</h2>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
                <div className="w-full md:w-36 h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-sm text-white font-semibold shadow-md flex-shrink-0">
                  <span className="text-center">Otel Görseli <br/> (Placeholder)</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-2xl text-gray-900 mb-1">{currentHotelData.name}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < currentHotelData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    {currentHotelData.rating > 0 && (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                        {currentHotelData.rating}
                      </span>
                    )}
                  </div>
                  <p className="text-base text-gray-700 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                    {currentHotelData.location}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-base mb-6 border-t pt-5">
                <div>
                  <span className="text-gray-600 font-medium">Giriş Tarihi:</span>
                  <div className="font-semibold text-gray-800 flex items-center mt-1">
                    <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                    {currentHotelData.checkIn}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Çıkış Tarihi:</span>
                  <div className="font-semibold text-gray-800 flex items-center mt-1">
                    <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                    {currentHotelData.checkOut}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Misafir Sayısı:</span>
                  <div className="font-semibold text-gray-800 flex items-center mt-1">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    {currentHotelData.guests}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Konaklama Süresi:</span>
                  <div className="font-semibold text-gray-800 flex items-center mt-1">
                    <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                    {currentHotelData.nights}
                  </div>
                </div>
              </div>

              <div className="mb-6 border-t pt-5">
                <span className="text-gray-600 text-base font-medium">Oda Tipi:</span>
                <div className="font-bold text-gray-800 text-lg mt-1">{currentHotelData.roomType}</div>
              </div>

              <div className="flex flex-wrap gap-3 border-t pt-5">
                {currentHotelData.features.map((feature, index) => (
                  <span key={index} className="bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                    {feature}
                  </span>
                ))}
              </div>

              {/* İptal Politikası Bilgisi */}
              {offerDetails?.refundable !== undefined && ( // İptal edilebilir bilgisi offerDetails'ten alınmalı
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className={`font-semibold text-base flex items-center ${!offerDetails.refundable ? 'text-red-600' : 'text-green-600'}`}>
                    {!offerDetails.refundable ? '❌ İptal Edilemez Rezervasyon' : '✅ İptal Edilebilir Rezervasyon'}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">
                    {!offerDetails.refundable
                      ? "Bu rezervasyon iptal edilemez ve iade yapılmaz."
                      : "Bu rezervasyon belirli koşullar altında iptal edilebilir. Detaylar için iptal politikasını inceleyiniz."}
                  </p>
                </div>
              )}
            </div>

            {/* Guest Information */}
            <div className="bg-white rounded-xl shadow-lg p-7 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-5 border-b pb-3">MİSAFİR BİLGİLERİ</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">1</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-800 mb-4">1. Misafir (Ana Misafir)</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ad *</label>
                        <input
                          type="text"
                          value={guestInfo.firstName}
                          onChange={(e) => handleInputChange('guest', 'firstName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="Adınız"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Soyad *</label>
                        <input
                          type="text"
                          value={guestInfo.lastName}
                          onChange={(e) => handleInputChange('guest', 'lastName', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="Soyadınız"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">E-posta *</label>
                        <input
                          type="email"
                          value={guestInfo.email}
                          onChange={(e) => handleInputChange('guest', 'email', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="ornek@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefon *</label>
                        <input
                          type="tel"
                          value={guestInfo.phone}
                          onChange={(e) => handleInputChange('guest', 'phone', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="+90 555 123 45 67"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <input type="radio" name="gender1" defaultChecked className="text-blue-600 focus:ring-blue-500 mr-2" />
                        Kadın
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <input type="radio" name="gender1" className="text-blue-600 focus:ring-blue-500 mr-2" />
                        Erkek
                      </label>
                    </div>

                    <div className="mb-4">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <input type="checkbox" className="text-blue-600 rounded focus:ring-blue-500" required />
                        <span>18 yaşından büyüğüm *</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">2</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-800 mb-4">2. Misafir</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ad *</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="Adınız"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Soyad *</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                          placeholder="Soyadınız"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <input type="radio" name="gender2" defaultChecked className="text-blue-600 focus:ring-blue-500 mr-2" />
                        Kadın
                      </label>
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <input type="radio" name="gender2" className="text-blue-600 focus:ring-blue-500 mr-2" />
                        Erkek
                      </label>
                    </div>

                    <div className="mb-4">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <input type="checkbox" className="text-blue-600 rounded focus:ring-blue-500" required />
                        <span>18 yaşından büyüğüm *</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white rounded-xl shadow-lg p-7 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-5 border-b pb-3">ÖZEL TALEPLER</h3>
              <div className="mb-5 space-y-3">
                <label className="flex items-center gap-3 text-base font-medium text-gray-700">
                  <input type="checkbox" className="text-blue-600 rounded focus:ring-blue-500 w-5 h-5" />
                  <span>Erken giriş talep ediyorum</span>
                </label>
                <label className="flex items-center gap-3 text-base font-medium text-gray-700">
                  <input type="checkbox" className="text-blue-600 rounded focus:ring-blue-500 w-5 h-5" />
                  <span>Geç çıkış talep ediyorum</span>
                </label>
              </div>
              <div>
                <label className="block text-base font-medium text-gray-700 mb-3">Diğer özel talepleriniz:</label>
                <textarea
                  rows="4"
                  value={guestInfo.specialRequests}
                  onChange={(e) => handleInputChange('guest', 'specialRequests', e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
                  placeholder="Özel taleplerinizi yazınız..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="space-y-6">
            {/* Payment Cards */}
            <div className="bg-white rounded-xl shadow-lg p-7 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-5 border-b pb-3">ÖDEME BİLGİLERİ</h3>

              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-700 mb-3">Kabul Edilen Kartlar</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="w-12 h-8 bg-blue-700 rounded-md flex items-center justify-center text-white text-sm font-bold shadow-sm">VISA</div>
                  <div className="w-12 h-8 bg-orange-600 rounded-md flex items-center justify-center text-white text-sm font-bold shadow-sm">MASTERCARD</div>
                  <div className="w-12 h-8 bg-red-700 rounded-md flex items-center justify-center text-white text-sm font-bold shadow-sm">AMEX</div>
                  <div className="w-12 h-8 bg-green-700 rounded-md flex items-center justify-center text-white text-sm font-bold shadow-sm">TROY</div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kart Numarası *</label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="**** **** **** ****"
                    maxLength="19" // 16 rakam + 3 boşluk
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kart Sahibi *</label>
                  <input
                    type="text"
                    value={paymentInfo.cardHolder}
                    onChange={(e) => handleInputChange('payment', 'cardHolder', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Kart üzerindeki isim"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Son Kullanma Tarihi *</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      required
                      onChange={(e) => handleInputChange('payment', 'expiryMonth', e.target.value)}
                    >
                      <option value="">Ay</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label> {/* Placeholder for alignment */}
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      required
                      onChange={(e) => handleInputChange('payment', 'expiryYear', e.target.value)}
                    >
                      <option value="">Yıl</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
                  <input
                    type="text"
                    value={paymentInfo.cvv}
                    onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="***"
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-base font-medium text-gray-700 mb-3">Taksit Seçeneği</h4>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200">
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
            <div className="bg-white rounded-xl shadow-lg p-7 border border-gray-200">
              <div className="bg-green-50 border border-green-300 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between">
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                  <div className="text-right flex-grow">
                    <div className="text-3xl font-extrabold text-green-700">
                      {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}
                    </div>
                    <div className="text-base text-gray-600 font-medium mt-1">toplam tutar</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-base mb-6 border-b pb-5">
                {/* Oda fiyatı ve vergiler API'den doğrudan gelmediği için bu bölümü basitleştirdik */}
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Toplam:</span>
                  <span>{totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
                </div>
              </div>

              <p className="text-center text-sm text-gray-500 mb-6 flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" /> Ödeme bilgileri 256-bit SSL ile korunmaktadır.
              </p>

              <div className="space-y-4 mb-8">
                <label className="flex items-start gap-3 text-sm text-gray-700">
                  <input type="checkbox" className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" required />
                  <span>Üyelik şartlarını ve koşullarını kabul ediyorum *</span>
                </label>
                <label className="flex items-start gap-3 text-sm text-gray-700">
                  <input type="checkbox" className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" required />
                  <span>Kişisel Verilerin Korunması Kanunu çerçevesinde, gerekli izinlerin alınmasını ve kişisel veri işlenmesini onaylıyorum *</span>
                </label>
                <label className="flex items-start gap-3 text-sm text-gray-700">
                  <input type="checkbox" className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                  <span>E-posta ve SMS ile bildirim almayı kabul ediyorum</span>
                </label>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg mb-4"
              >
                📞 Hızlı Rezervasyon
              </button>

              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                💳 Kartla Rezervasyon Tamamla
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Size <span className="text-blue-600 underline font-semibold">SANTSG 293 48 21</span> numaralı telefonumuzdan ulaşılacaktır.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Success Modal */}
      {showBookingSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center transform scale-95 animate-fade-in">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-5" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Rezervasyon Başarılı!</h2>
            <p className="text-gray-700 mb-6">Rezervasyonunuz başarıyla tamamlandı. Onay e-postanız gönderildi.</p>
            <button
              onClick={() => setShowBookingSuccessModal(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
            >
              Tamam
            </button>
          </div>
        </div>
      )}

      {/* Booking Error Modal (örnek) */}
      {showBookingErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center transform scale-95 animate-fade-in">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-5" />
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Rezervasyon Başarısız!</h2>
            <p className="text-gray-700 mb-6">Rezervasyonunuz sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.</p>
            <button
              onClick={() => setShowBookingErrorModal(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
