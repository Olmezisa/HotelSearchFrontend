import React, { useState, useEffect } from 'react';
import { Calendar, Users, Clock, MapPin, Wifi, Car, Coffee, Star } from 'lucide-react';

const BookingPage = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState(null);

  // API BAGLA!!!!
  const mockApiData = {
    header: {
      requestId: "d04a941e-a755-4002-931b-24c878a7d546",
      success: true,
      responseTime: "2025-07-22T07:01:31.4720618Z"
    },
    body: {
      offers: [
        {
          night: 2,
          availability: 1,
          rooms: [{ roomName: "Junior suite capacity 2", boardName: "Room only" }],
          price: { amount: 171.71, currency: "EUR" },
          priceBreakdowns: [{
            priceBreakdowns: [
              { date: "2025-07-24T03:00:00+03:00", price: { amount: 85.85, currency: "EUR" }},
              { date: "2025-07-25T03:00:00+03:00", price: { amount: 85.85, currency: "EUR" }}
            ]
          }],
          cancellationPolicies: [{ dueDate: "2025-07-22T03:00:00", price: { amount: 171.71, currency: "EUR" }}],
          checkIn: "2025-07-24T00:00:00Z",
          available: false,
          refundable: false
        },
        {
          night: 2,
          availability: 1,
          rooms: [{ roomName: "Suite capacity 3", boardName: "Room only" }],
          price: { amount: 186.01, currency: "EUR" },
          priceBreakdowns: [{
            priceBreakdowns: [
              { date: "2025-07-24T03:00:00+03:00", price: { amount: 93.01, currency: "EUR" }},
              { date: "2025-07-25T03:00:00+03:00", price: { amount: 93.01, currency: "EUR" }}
            ]
          }],
          available: false,
          refundable: false
        },
        {
          night: 2,
          availability: 1,
          rooms: [{ roomName: "Suite capacity 4", boardName: "Room only" }],
          price: { amount: 200.31, currency: "EUR" },
          priceBreakdowns: [{
            priceBreakdowns: [
              { date: "2025-07-24T03:00:00+03:00", price: { amount: 100.15, currency: "EUR" }},
              { date: "2025-07-25T03:00:00+03:00", price: { amount: 100.15, currency: "EUR" }}
            ]
          }],
          available: true,
          refundable: true
        },
        {
          night: 2,
          availability: 1,
          rooms: [{ roomName: "Suite capacity 5", boardName: "Room only" }],
          price: { amount: 214.61, currency: "EUR" },
          priceBreakdowns: [{
            priceBreakdowns: [
              { date: "2025-07-24T03:00:00+03:00", price: { amount: 107.31, currency: "EUR" }},
              { date: "2025-07-25T03:00:00+03:00", price: { amount: 107.31, currency: "EUR" }}
            ]
          }],
          available: true,
          refundable: false
        },
        {
          night: 2,
          availability: 1,
          rooms: [{ roomName: "Suite capacity 6", boardName: "Room only" }],
          price: { amount: 228.93, currency: "EUR" },
          priceBreakdowns: [{
            priceBreakdowns: [
              { date: "2025-07-24T03:00:00+03:00", price: { amount: 114.47, currency: "EUR" }},
              { date: "2025-07-25T03:00:00+03:00", price: { amount: 114.47, currency: "EUR" }}
            ]
          }],
          available: true,
          refundable: true
        }
      ]
    }
  };

  useEffect(() => {
    // Gerçek uygulamada API çağrısı burada yapılacak
    const fetchBookingData = async () => {
      setLoading(true);
      try {
        // const response = await fetch('/api/booking-offers');
        // const data = await response.json();
        
        // Mock veri kullanıyoruz
        await new Promise(resolve => setTimeout(resolve, 1000)); // Loading simülasyonu
        setBookingData(mockApiData);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const extractCapacity = (roomName) => {
    const match = roomName.match(/capacity (\d+)/);
    return match ? match[1] : '2';
  };

  const getRoomType = (roomName) => {
    if (roomName.includes('Junior suite')) return 'Junior Suite';
    if (roomName.includes('Suite')) return 'Suite';
    return 'Standard';
  };

  const handleBookRoom = (offer) => {
    if (offer.available) {
      setSelectedRoom(offer);
      // Burada rezervasyon işlemi başlatılabilir
      console.log('Booking room:', offer);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Oda seçenekleri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!bookingData?.body?.offers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Rezervasyon verileri yüklenemedi</p>
        </div>
      </div>
    );
  }

  const { offers } = bookingData.body;
  const checkInDate = offers[0]?.checkIn;
  const nights = offers[0]?.night;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🏨 Luxury Hotel Booking
          </h1>
          <p className="text-gray-600">En konforlu odalarımızda unutulmaz bir deneyim</p>
        </div>

        {/* Booking Info Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Giriş Tarihi</p>
                <p className="font-semibold">{formatDate(checkInDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Konaklama</p>
                <p className="font-semibold">{nights} Gece</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Misafir</p>
                <p className="font-semibold">2 Kişi</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Konum</p>
                <p className="font-semibold">Yunanistan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                offer.available ? 'border-gray-200 hover:border-indigo-300' : 'border-gray-300 opacity-75'
              }`}
            >
              {/* Room Image Placeholder */}
              <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    offer.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {offer.available ? 'Müsait' : 'Dolu'}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  {offer.refundable && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      İptal Edilebilir
                    </span>
                  )}
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{getRoomType(offer.rooms[0].roomName)}</h3>
                  <p className="text-indigo-100">Kapasite: {extractCapacity(offer.rooms[0].roomName)} Kişi</p>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800">{offer.rooms[0].roomName}</h4>
                    <p className="text-sm text-gray-500">{offer.rooms[0].boardName}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-4 mb-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Wifi className="w-4 h-4" />
                    <span className="text-xs">WiFi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="w-4 h-4" />
                    <span className="text-xs">Parking</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coffee className="w-4 h-4" />
                    <span className="text-xs">Minibar</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-800">
                      €{offer.price.amount}
                    </span>
                    <span className="text-sm text-gray-500">
                      Toplam {nights} gece
                    </span>
                  </div>
                  <div className="space-y-1">
                    {offer.priceBreakdowns[0].priceBreakdowns.map((breakdown, idx) => (
                      <div key={idx} className="flex justify-between text-sm text-gray-600">
                        <span>Gece {idx + 1}</span>
                        <span>€{breakdown.price.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={() => handleBookRoom(offer)}
                  disabled={!offer.available}
                  className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                    offer.available
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {offer.available ? 'Rezervasyon Yap' : 'Müsait Değil'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Rezervasyon Özeti</h3>
          <p className="text-indigo-100">
            Toplam {offers.length} farklı oda seçeneği • {offers.filter(o => o.available).length} oda müsait
          </p>
          <p className="text-indigo-100 mt-1">
            Fiyatlar {nights} gecelik konaklamayı kapsamaktadır
          </p>
        </div>

        {/* Selected Room Modal Placeholder */}
        {selectedRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Rezervasyon Onayı</h3>
              <p className="text-gray-600 mb-4">
                {selectedRoom.rooms[0].roomName} için rezervasyon yapmak istediğinizi onaylayın.
              </p>
              <p className="text-2xl font-bold text-indigo-600 mb-4">
                €{selectedRoom.price.amount}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  İptal
                </button>
                <button
                  onClick={() => {
                    // Rezervasyon işlemi
                    alert('Rezervasyon başarıyla oluşturuldu!');
                    setSelectedRoom(null);
                  }}
                  className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Onayla
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;