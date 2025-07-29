import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Star, Users, MapPin, Calendar, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { api } from '../../api/santsgApi';
import { VisaIcon, VisaElectronIcon, MastercardIcon, MaestroIcon, AmericanExpressIcon } from '../../assets/icons'

const BookingPage = () => {
  const location = useLocation();
  const {
    offerDetails: initialOfferDetails,
    transactionData: initialTransactionData,
    mainHotelImage: initialMainHotelImage,
    hotel: initialHotel
  } = location.state || {};

  const [offerDetails, setOfferDetails] = useState(initialOfferDetails);
  const [transactionData, setTransactionData] = useState(initialTransactionData);
  const [mainHotelImage, setMainHotelImage] = useState(initialMainHotelImage);

  const [loading, setLoading] = useState(!initialOfferDetails || !initialTransactionData || !initialMainHotelImage);
  const [error, setError] = useState(null);

  const [showBookingSuccessModal, setShowBookingSuccessModal] = useState(false);
  const [showBookingErrorModal, setShowBookingErrorModal] = useState(false);
  const [showReservationDetailsModal, setShowReservationDetailsModal] = useState(false);
  const [finalReservationNumber, setFinalReservationNumber] = useState('');
  const [reservationDetailsFromApi, setReservationDetailsFromApi] = useState(null);

  const [isSavingGuestInfo, setIsSavingGuestInfo] = useState(false);
  const [saveGuestInfoError, setSaveGuestInfoError] = useState(null);

  const [guestInfo, setGuestInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  });

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

  useEffect(() => {
    if (initialOfferDetails && initialTransactionData && initialMainHotelImage) {
      setOfferDetails(initialOfferDetails);
      setTransactionData(initialTransactionData);
      setMainHotelImage(initialMainHotelImage);
      setLoading(false);

      if (initialTransactionData?.reservationData?.travellers) {
        const initialGuestData = initialTransactionData.reservationData.travellers.map(traveller => ({
          firstName: traveller.name || '',
          lastName: traveller.surname || '',
          email: traveller.address?.email || '',
          phone: traveller.address?.contactPhone?.phoneNumber || traveller.address?.phone || '',
          gender: traveller.gender === 0 ? 'Erkek' : (traveller.gender === 1 ? 'Kadın' : 'Kadın'),
          birthDate: (traveller.birthDate && traveller.birthDate !== '0001-01-01T00:00:00') ? traveller.birthDate.split('T')[0] : '2000-01-01',
          nationality: traveller.nationality?.twoLetterCode || '',
        }));
        setGuestInfo(initialGuestData);
      }
    } else if (!initialOfferDetails || !initialTransactionData || !initialMainHotelImage) {
      setError("Rezervasyon bilgileri eksik. Lütfen bir önceki sayfaya dönerek tekrar deneyin.");
      setLoading(false);
    }
  }, [initialOfferDetails, initialTransactionData, initialMainHotelImage]);

  const hotel = initialHotel || offerDetails?.hotels?.[0];
  const roomOffer = hotel?.offers?.[0]?.rooms?.[0];

  const currentHotelData = hotel ? {
    name: hotel.name || defaultHotelData.name,
    rating: hotel.stars || 4,
    reviewCount: defaultHotelData.reviewCount,
    reviewText: defaultHotelData.reviewText,
    location: hotel.city?.name && hotel.country?.name
      ? `${hotel.city.name}, ${hotel.country.name}`
      : defaultHotelData.location,
    checkIn: formatDate(transactionData?.reservationData?.reservationInfo?.beginDate) || defaultHotelData.checkIn,
    checkInTime: formatDateTime(transactionData?.reservationData?.reservationInfo?.beginDate) || defaultHotelData.checkInTime,
    checkOut: formatDate(transactionData?.reservationData?.reservationInfo?.endDate) || defaultHotelData.checkOut,
    checkOutTime: formatDateTime(transactionData?.reservationData?.reservationInfo?.endDate) || defaultHotelData.checkOutTime,
    guests: transactionData?.reservationData?.travellers?.length
      ? `${transactionData.reservationData.travellers.length} Yetişkin`
      : defaultHotelData.guests,
    nights: transactionData?.reservationData?.reservationInfo?.beginDate && transactionData?.reservationData?.reservationInfo?.endDate
      ? `${Math.ceil((new Date(transactionData.reservationData.reservationInfo.endDate) - new Date(transactionData.reservationData.reservationInfo.beginDate)) / (1000 * 60 * 60 * 24))} gece`
      : defaultHotelData.nights,
    roomType: roomOffer?.roomName || defaultHotelData.roomType,
    features: [
      `${transactionData?.reservationData?.travellers?.length || 0} Yetişkin`,
      roomOffer?.boardName || "Oda + Kahvaltı",
      "Sigara İçilmeyen"
    ]
  } : defaultHotelData;

  const totalPrice = transactionData?.reservationData?.reservationInfo?.passengerAmountToPay?.amount || 0;
  const currency = transactionData?.reservationData?.reservationInfo?.passengerAmountToPay?.currency || 'EUR';

  const handleInputChange = (index, field, value) => {
    // index nullsa payment
    if (index === null) {
      if (field === 'cardNumber') {
        const formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
        setPaymentInfo(prev => ({ ...prev, [field]: formattedValue }));
      } else if (field === 'cvv') {
        const formattedValue = value.replace(/\D/g, '').slice(0, 4);
        setPaymentInfo(prev => ({ ...prev, [field]: formattedValue }));
      } else {
        setPaymentInfo(prev => ({ ...prev, [field]: value }));
      }
    } else {
      setGuestInfo(prev =>
        prev.map((guest, i) =>
          i === index ? { ...guest, [field]: value } : guest
        )
      );
    }
  };

  const handleBooking = async () => {
    setIsSavingGuestInfo(true);
    setSaveGuestInfoError(null);

    try {
      // guestInfo state'indeki verileri kullanarak updatedTravellers dizisini oluştur
      const updatedTravellers = transactionData.reservationData.travellers.map((traveller, index) => {
        const currentGuest = guestInfo[index];
        if (!currentGuest) {
          // Eğer ilgili misafir bilgisi guestInfo'da yoksa, mevcut traveller objesini kullan
          return traveller;
        }

        let addressUpdates = { ...traveller.address };
        if (index === 0) { // Ana misafir için contactPhone objesi
          let contactPhone = {
            countryCode: '',
            areaCode: '',
            phoneNumber: currentGuest.phone || ''
          };
          // Telefon numarasını ayrıştırma
          if (currentGuest.phone) {
            const phoneParts = currentGuest.phone.match(/^\+(\d+)\s(\d{3})\s(.+)$/);
            if (phoneParts) {
              contactPhone.countryCode = phoneParts[1];
              contactPhone.areaCode = phoneParts[2];
              contactPhone.phoneNumber = phoneParts[3].replace(/\s/g, '');
            } else {
              // Eğer format eşleşmezse, tüm numarayı phoneNumber'a ata
              contactPhone.phoneNumber = currentGuest.phone;
            }
          }
          addressUpdates.contactPhone = contactPhone;
          delete addressUpdates.phone; // Eğer varsa eski phone alanını temizle
        } else {
          addressUpdates.phone = currentGuest.phone || '';
          delete addressUpdates.contactPhone;
        }
        addressUpdates.email = currentGuest.email;

        return {
          ...traveller,
          name: currentGuest.firstName,
          surname: currentGuest.lastName,
          title: currentGuest.gender === 'Erkek' ? 1 : (currentGuest.gender === 'Kadın' ? 3 : traveller.title),
          // isLeader alanını doğrudan index'e göre ayarla
          isLeader: index === 0, // Sadece ilk misafiri lider olarak işaretle
          birthDate: currentGuest.birthDate ? `${currentGuest.birthDate}T00:00:00` : (traveller.birthDate || '2000-01-01T00:00:00'),
          nationality: {
            twoLetterCode: currentGuest.nationality || (traveller.nationality?.twoLetterCode || 'TR')
          },
          address: addressUpdates,
          academicTitle: traveller.academicTitle || { id: 1 },
          passengerType: traveller.passengerType || 1,
          identityNumber: traveller.identityNumber || '',
          passportInfo: traveller.passportInfo || {
            serial: "",
            number: "",
            expireDate: "2030-01-01T00:00:00",
            issueDate: "2020-01-01T00:00:00",
            citizenshipCountryCode: ""
          },
          destinationAddress: traveller.destinationAddress || {},
          orderNumber: traveller.orderNumber || (index + 1),
          documents: traveller.documents || [],
          insertFields: traveller.insertFields || [],
          status: traveller.status || 0,
          gender: currentGuest.gender === 'Erkek' ? 0 : (currentGuest.gender === 'Kadın' ? 1 : traveller.gender)
        };
      });

      const setInfoPayload = {
        transactionId: transactionData.transactionId,
        travellers: updatedTravellers,
        reservationNote: guestInfo[0]?.specialRequests || '',
        agencyReservationNumber: "Agency reservation number text"
      };

      console.log("Gönderilen setInfoPayload:", setInfoPayload); // Payload'ı konsola yazdır

      const setInfoResponse = await api.setReservationInfo(setInfoPayload);

      if (setInfoResponse.header.success) {
        const commitResponse = await api.commitTransaction({
          transactionId: setInfoResponse.body.transactionId
        });

        if (commitResponse.header.success) {
          const reservationNumber = commitResponse.body.reservationNumber;
          setFinalReservationNumber(reservationNumber); // Rezervasyon numarasını state'e kaydet
          setShowBookingSuccessModal(true);

        } else {
          setSaveGuestInfoError(commitResponse.header.messages[0]?.message || "Rezervasyon kesinleştirilemedi.");
          setShowBookingErrorModal(true);
        }

      } else {
        setSaveGuestInfoError(setInfoResponse.header.messages[0]?.message || "Misafir bilgileri kaydedilemedi.");
        setShowBookingErrorModal(true);
      }
    } catch (e) {
      console.error("Rezervasyon işlemi hatası:", e);
      setSaveGuestInfoError(e.message || "Rezervasyon işlemi sırasında bir hata oluştu.");
      setShowBookingErrorModal(true);
    } finally {
      setIsSavingGuestInfo(false);
    }
  };

  const handleViewDetails = async () => {
    if (!finalReservationNumber) {
      setSaveGuestInfoError("Rezervasyon numarası bulunamadı.");
      setShowBookingErrorModal(true);
      return;
    }

    setShowBookingSuccessModal(false);
    setLoading(true);
    setSaveGuestInfoError(null);

    try {
      const reservationDetailResponse = await api.getReservationDetail(finalReservationNumber);

      if (reservationDetailResponse.header.success) {
        setReservationDetailsFromApi(reservationDetailResponse.body); // Detayları state'e kaydet
        setShowReservationDetailsModal(true);
      } else {
        setSaveGuestInfoError(reservationDetailResponse.header.messages[0]?.message || "Rezervasyon detayları alınamadı.");
        setShowBookingErrorModal(true);
      }
    } catch (e) {
      console.error("Rezervasyon detayları alma hatası:", e);
      setSaveGuestInfoError(e.message || "Rezervasyon detayları alınırken bir hata oluştu.");
      setShowBookingErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F7F3] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center border border-[#88B8D2]/20">
          <h2 className="text-xl font-bold text-[#2781B9] mb-4">Bilgiler Yükleniyor...</h2>
          <p className="text-[#093B5A] mb-4">Lütfen bekleyiniz.</p>
          <div className="mx-auto animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2781B9]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F9F7F3] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center border border-[#D48A61]/20">
          <h2 className="text-xl font-bold text-[#AC440B] mb-4">Hata!</h2>
          <p className="text-[#093B5A] mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-[#D48A61] hover:bg-[#AC440B] text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  if (!offerDetails || !transactionData || !mainHotelImage) {
    return (
      <div className="min-h-screen bg-[#F9F7F3] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center border border-[#D48A61]/20">
          <h2 className="text-xl font-bold text-[#AC440B] mb-4">Rezervasyon Bilgileri Eksik</h2>
          <p className="text-[#093B5A] mb-4">Rezervasyon detayları veya işlem bilgileri yüklenemedi. Lütfen bir önceki sayfaya dönerek tekrar deneyin.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-[#D48A61] hover:bg-[#AC440B] text-white px-6 py-2 rounded-lg transition-colors duration-200"
          >
            Geri Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F7F3] font-sans">
      <div className="max-w-6xl mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold text-[#093B5A] mb-8 text-center">Rezervasyon Detayları</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hotel Info Section */}
            <div className="bg-white rounded-xl shadow-lg p-7 border border-[#88B8D2]/20">
              <h2 className="text-2xl font-bold text-[#093B5A] mb-5 border-b border-[#88B8D2]/30 pb-3">KONAKLAMA BİLGİLERİ</h2>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">

                <div className="w-full md:w-36 h-28 rounded-xl overflow-hidden flex-shrink-0 border border-[#88B8D2]/20">
                  <img
                    src={mainHotelImage || 'https://placehold.co/144x112/093B5A/F9F7F3?text=Görsel+Yok'}
                    alt="Otel Görseli"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-2xl text-[#093B5A] mb-1">{currentHotelData.name}</h3>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < currentHotelData.rating ? 'text-[#EDDEA4] fill-[#EDDEA4]' : 'text-[#88B8D2]'}`}
                        />
                      ))}
                    </div>
                    {currentHotelData.rating > 0 && (
                      <span className="bg-[#2781B9] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                        {currentHotelData.rating}
                      </span>
                    )}
                  </div>
                  <p className="text-base text-[#2781B9] flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-[#88B8D2]" />
                    {currentHotelData.location}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-base mb-6 border-t border-[#EDDEA4]/30 pt-5">
                <div>
                  <span className="text-[#2781B9] font-medium">Giriş Tarihi:</span>
                  <div className="font-semibold text-[#093B5A] flex items-center mt-1">
                    <Calendar className="w-5 h-5 mr-2 text-[#D48A61]" />
                    {currentHotelData.checkIn} <span className="ml-2 text-[#88B8D2]">({currentHotelData.checkInTime})</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#2781B9] font-medium">Çıkış Tarihi:</span>
                  <div className="font-semibold text-[#093B5A] flex items-center mt-1">
                    <Calendar className="w-5 h-5 mr-2 text-[#D48A61]" />
                    {currentHotelData.checkOut} <span className="ml-2 text-[#88B8D2]">({currentHotelData.checkOutTime})</span>
                  </div>
                </div>
                <div>
                  <span className="text-[#2781B9] font-medium">Misafir Sayısı:</span>
                  <div className="font-semibold text-[#093B5A] flex items-center mt-1">
                    <Users className="w-5 h-5 mr-2 text-[#D48A61]" />
                    {currentHotelData.guests}
                  </div>
                </div>
                <div>
                  <span className="text-[#2781B9] font-medium">Konaklama Süresi:</span>
                  <div className="font-semibold text-[#093B5A] flex items-center mt-1">
                    <Calendar className="w-5 h-5 mr-2 text-[#D48A61]" />
                    {currentHotelData.nights}
                  </div>
                </div>
              </div>

              <div className="mb-6 border-t border-[#EDDEA4]/30 pt-5">
                <span className="text-[#2781B9] text-base font-medium">Oda Tipi:</span>
                <div className="font-bold text-[#093B5A] text-lg mt-1">{currentHotelData.roomType}</div>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-[#EDDEA4]/30 pt-5">
                {currentHotelData.features.map((feature, index) => (
                  <span key={index} className="bg-[#EDDEA4]/20 text-[#AC440B] px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-[#EDDEA4]/50">
                    {feature}
                  </span>
                ))}
              </div>

              {/* İptal Politikası Bilgisi */}
              {offerDetails?.refundable !== undefined && (
                <div className="mt-6 p-4 bg-[#F9F7F3] rounded-lg border border-[#88B8D2]/20">
                  <span className={`font-semibold text-base flex items-center ${!offerDetails.refundable ? 'text-[#AC440B]' : 'text-[#2781B9]'}`}>
                    {!offerDetails.refundable ? '❌ İptal Edilemez Rezervasyon' : '✅ İptal Edilebilir Rezervasyon'}
                  </span>
                  <p className="text-sm text-[#093B5A] mt-1">
                    {!offerDetails.refundable
                      ? "Bu rezervasyon iptal edilemez ve iade yapılmaz."
                      : "Bu rezervasyon belirli koşullar altında iptal edilebilir. Detaylar için iptal politikasını inceleyiniz."}
                  </p>
                </div>
              )}
            </div>

            {/* Guest Information - Dinamik olarak oluşturuluyor */}
            <div className="bg-white rounded-xl shadow-lg p-7 border border-[#88B8D2]/20">
              <h3 className="text-2xl font-bold text-[#093B5A] mb-5 border-b border-[#88B8D2]/30 pb-3">MİSAFİR BİLGİLERİ</h3>

              <div className="space-y-6">
                {guestInfo.map((guest, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="bg-[#D48A61] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow">{index + 1}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-[#093B5A] mb-4">{index + 1}. Misafir {index === 0 && '(Ana Misafir)'}</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-[#2781B9] mb-2">Ad *</label>
                          <input
                            type="text"
                            value={guest.firstName}
                            onChange={(e) => handleInputChange(index, 'firstName', e.target.value)}
                            className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200"
                            placeholder="Adınız"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#2781B9] mb-2">Soyad *</label>
                          <input
                            type="text"
                            value={guest.lastName}
                            onChange={(e) => handleInputChange(index, 'lastName', e.target.value)}
                            className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200"
                            placeholder="Soyadınız"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-[#2781B9] mb-2">Doğum Tarihi *</label>
                          <input
                            type="date"
                            value={guest.birthDate}
                            onChange={(e) => handleInputChange(index, 'birthDate', e.target.value)}
                            className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#2781B9] mb-2">Uyruk (TR, DE, US vb.) *</label>
                          <input
                            type="text"
                            value={guest.nationality}
                            onChange={(e) => handleInputChange(index, 'nationality', e.target.value.toUpperCase())}
                            className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200"
                            placeholder="TR"
                            maxLength="2"
                            required
                          />
                        </div>
                      </div>

                      {/* Sadece ana misafir için e-posta ve telefon alanları */}
                      {index === 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-[#2781B9] mb-2">E-posta *</label>
                            <input
                              type="email"
                              value={guest.email}
                              onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                              className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200"
                              placeholder="ornek@email.com"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#2781B9] mb-2">Telefon *</label>
                            <input
                              type="tel"
                              value={guest.phone}
                              onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                              className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200"
                              placeholder="+90 555 123 45 67"
                              required
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-4 mb-4">
                        <label className="flex items-center text-sm font-medium text-[#093B5A]">
                          <input
                            type="radio"
                            name={`gender-${index}`}
                            value="Kadın"
                            checked={guest.gender === 'Kadın'}
                            onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                            className="text-[#D48A61] focus:ring-[#D48A61] mr-2"
                          />
                          Kadın
                        </label>
                        <label className="flex items-center text-sm font-medium text-[#093B5A]">
                          <input
                            type="radio"
                            name={`gender-${index}`}
                            value="Erkek"
                            checked={guest.gender === 'Erkek'}
                            onChange={(e) => handleInputChange(index, 'gender', e.target.value)}
                            className="text-[#D48A61] focus:ring-[#D48A61] mr-2"
                          />
                          Erkek
                        </label>
                      </div>

                      <div className="mb-4">
                        <label className="flex items-center gap-2 text-sm font-medium text-[#093B5A]">
                          <input type="checkbox" className="text-[#D48A61] rounded focus:ring-[#D48A61]" required />
                          <span>18 yaşından büyüğüm *</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div className="bg-white rounded-xl shadow-lg p-7 border border-[#88B8D2]/20">
              <h3 className="text-2xl font-bold text-[#093B5A] mb-5 border-b border-[#88B8D2]/30 pb-3">ÖZEL TALEPLER</h3>
              <div className="mb-5 space-y-3">
                <label className="flex items-center gap-3 text-base font-medium text-[#093B5A]">
                  <input type="checkbox" className="text-[#D48A61] rounded focus:ring-[#D48A61] w-5 h-5" />
                  <span>Erken giriş talep ediyorum</span>
                </label>
                <label className="flex items-center gap-3 text-base font-medium text-[#093B5A]">
                  <input type="checkbox" className="text-[#D48A61] rounded focus:ring-[#D48A61] w-5 h-5" />
                  <span>Geç çıkış talep ediyorum</span>
                </label>
              </div>
              <div>
                <label className="block text-base font-medium text-[#2781B9] mb-3">Diğer özel talepleriniz:</label>
                <textarea
                  rows="4"
                  value={guestInfo[0]?.specialRequests || ''}
                  onChange={(e) => handleInputChange(0, 'specialRequests', e.target.value)}
                  className="w-full p-4 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200 resize-y bg-[#F9F7F3]/50"
                  placeholder="Özel taleplerinizi yazınız..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="space-y-6">
            {/* Payment Cards */}
            <div className="bg-white rounded-xl shadow-lg p-7 border border-[#88B8D2]/20">
              <h3 className="text-2xl font-bold text-[#093B5A] mb-5 border-b border-[#88B8D2]/30 pb-3">ÖDEME BİLGİLERİ</h3>

              <div className="mb-6">
                <h4 className="text-base font-medium text-[#2781B9] mb-3 text-center">Banka/Kredi Kartı</h4>
                <div className="flex flex-wrap justify-center items-center gap-4">
                  {/* Visa */}
                  <div className="h-8 w-16 bg-white border border-[#88B8D2]/30 rounded flex items-center justify-center">
                    <VisaIcon />
                  </div>

                  {/* Visa Electron */}
                  <div className="h-8 w-16 bg-white border border-[#88B8D2]/30 rounded flex items-center justify-center">
                    <VisaElectronIcon />
                  </div>

                  {/* Mastercard */}
                  <div className="h-8 w-16 bg-white border border-[#88B8D2]/30 rounded flex items-center justify-center">
                    <MastercardIcon />
                  </div>

                  {/* Maestro */}
                  <div className="h-8 w-16 bg-white border border-[#88B8D2]/30 rounded flex items-center justify-center">
                    <MaestroIcon />
                  </div>

                  {/* American Express */}
                  <div className="h-8 w-16 bg-white border border-[#88B8D2]/30 rounded flex items-center justify-center">
                    <AmericanExpressIcon />
                  </div>

                  {/* Troy */}
                  <div className="bg-[#2781B9] text-white px-3 py-1 rounded text-sm font-bold h-8 flex items-center">
                    troy
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#2781B9] mb-2">Kart Numarası *</label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => handleInputChange(null, 'cardNumber', e.target.value)}
                    className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200"
                    placeholder="**** **** **** ****"
                    maxLength="19"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2781B9] mb-2">Kart Sahibi *</label>
                  <input
                    type="text"
                    value={paymentInfo.cardHolder}
                    onChange={(e) => handleInputChange(null, 'cardHolder', e.target.value)}
                    className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200"
                    placeholder="Kart üzerindeki isim"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2781B9] mb-2">Son Kullanma Tarihi *</label>
                    <select
                      className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200"
                      required
                      onChange={(e) => handleInputChange(null, 'expiryMonth', e.target.value)}
                    >
                      <option value="">Ay</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={String(i + 1).padStart(2, '0')}>{String(i + 1).padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2781B9] mb-2">&nbsp;</label>
                    <select
                      className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200"
                      required
                      onChange={(e) => handleInputChange(null, 'expiryYear', e.target.value)}
                    >
                      <option value="">Yıl</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i} value={new Date().getFullYear() + i}>{new Date().getFullYear() + i}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#2781B9] mb-2">CVV *</label>
                  <input
                    type="text"
                    value={paymentInfo.cvv}
                    onChange={(e) => handleInputChange(null, 'cvv', e.target.value)}
                    className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200"
                    placeholder="***"
                    maxLength="4"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-base font-medium text-[#2781B9] mb-3">Taksit Seçeneği</h4>
                <select className="w-full p-3 border border-[#88B8D2]/40 rounded-lg focus:ring-2 focus:ring-[#2781B9] focus:border-[#2781B9] transition duration-200">
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
            <div className="bg-white rounded-xl shadow-lg p-7 border border-[#88B8D2]/20">
              <div className="bg-gradient-to-r from-[#EDDEA4]/30 to-[#F9B18B]/20 border border-[#D48A61]/30 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-between">
                  <CheckCircle className="w-8 h-8 text-[#2781B9] flex-shrink-0" />
                  <div className="text-right flex-grow">
                    <div className="text-3xl font-extrabold text-[#AC440B]">
                      {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}
                    </div>
                    <div className="text-base text-[#2781B9] font-medium mt-1">toplam tutar</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-base mb-6 border-b border-[#EDDEA4]/30 pb-5">
                <div className="flex justify-between font-bold text-lg text-[#093B5A]">
                  <span>Toplam:</span>
                  <span>{totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: currency })}</span>
                </div>
              </div>

              <p className="text-center text-sm text-[#2781B9] mb-6 flex items-center justify-center gap-2">
                <CreditCard className="w-4 h-4" /> Ödeme bilgileri 256-bit SSL ile korunmaktadır.
              </p>

              <div className="space-y-4 mb-8">
                <label className="flex items-start gap-3 text-sm text-[#093B5A]">
                  <input type="checkbox" className="mt-1 w-5 h-5 text-[#D48A61] rounded focus:ring-[#D48A61]" required />
                  <span>Üyelik şartlarını ve koşullarını kabul ediyorum *</span>
                </label>
                <label className="flex items-start gap-3 text-sm text-[#093B5A]">
                  <input type="checkbox" className="mt-1 w-5 h-5 text-[#D48A61] rounded focus:ring-[#D48A61]" required />
                  <span>Kişisel Verilerin Korunması Kanunu çerçevesinde, gerekli izinlerin alınmasını ve kişisel veri işlenmesini onaylıyorum *</span>
                </label>
                <label className="flex items-start gap-3 text-sm text-[#093B5A]">
                  <input type="checkbox" className="mt-1 w-5 h-5 text-[#D48A61] rounded focus:ring-[#D48A61]" />
                  <span>E-posta ve SMS ile bildirim almayı kabul ediyorum</span>
                </label>
              </div>

              <button
                className="w-full bg-blue-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-xl transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg mb-4"
              >
                {'💳 Kartla Rezervasyon Tamamla'}
              </button>

              <button
                onClick={handleBooking}

                className="w-full bg-gradient-to-r from-[#D48A61] to-[#AC440B] hover:from-[#AC440B] hover:to-[#D48A61] text-white py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                disabled={isSavingGuestInfo}
              >
                {isSavingGuestInfo ? 'Bilgiler Kaydediliyor...' : 'Hızlı Rezervasyon'}
              </button>

              {saveGuestInfoError && (
                <div className="bg-[#FBCFB7] border border-[#D48A61] text-[#AC440B] text-sm mt-2 p-2 rounded text-center">
                  {saveGuestInfoError}
                </div>
              )}

              <p className="text-center text-xs text-[#2781B9] mt-4">
                Size <span className="text-[#AC440B] underline font-semibold">SANTSG 293 48 21</span> numaralı telefonumuzdan ulaşılacaktır.
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
            <p className="text-gray-700 mb-2">Rezervasyonunuz başarıyla tamamlandı.</p>
            {finalReservationNumber && (
              <p className="text-gray-700 font-semibold mb-4">Rezervasyon Numaranız: <span className="text-blue-600">{finalReservationNumber}</span></p>
            )}
            <p className="text-gray-700 mb-6">Onay e-postanız gönderildi.</p>
            <button
              onClick={handleViewDetails} // Yeni buton: Detayları gör
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full mb-3"
            >
              Rezervasyon Detaylarını Gör
            </button>
            <button
              onClick={() => setShowBookingSuccessModal(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* New: Reservation Details Modal */}
      {showReservationDetailsModal && reservationDetailsFromApi && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center transform scale-95 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rezervasyon Detayları</h2>
            <div className="text-left space-y-2 mb-6">
              <p><strong>Rezervasyon No:</strong> {reservationDetailsFromApi.reservationNumber}</p>
              <p><strong>Otel Adı:</strong> {reservationDetailsFromApi.reservationData.services[0].serviceDetails.hotelDetail.name}</p>
              <p><strong>Giriş Tarihi:</strong> {formatDate(reservationDetailsFromApi.reservationData.reservationInfo.beginDate)}</p>
              <p><strong>Çıkış Tarihi:</strong> {formatDate(reservationDetailsFromApi.reservationData.reservationInfo.endDate)}</p>
              <p>
                <strong>Toplam Fiyat:</strong> {
                  reservationDetailsFromApi?.reservationData?.reservationInfo?.totalPrice?.amount
                    ? `${reservationDetailsFromApi.reservationData.reservationInfo.totalPrice.amount.toFixed(2)} ${reservationDetailsFromApi.reservationData.reservationInfo.totalPrice.currency}`
                    : 'N/A'
                }
              </p>
              {reservationDetailsFromApi.travellers && reservationDetailsFromApi.travellers.length > 0 && (
                <div>
                  <strong>Misafirler:</strong>
                  <ul className="list-disc list-inside ml-4">
                    {reservationDetailsFromApi.travellers.map((traveller, idx) => (
                      <li key={idx}>{traveller.name} {traveller.surname} ({traveller.type})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowReservationDetailsModal(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {/* Booking Error Modal */}
      {showBookingErrorModal && (
        <div className="fixed inset-0 bg-[#093B5A]/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center transform scale-95 animate-fade-in border border-[#D48A61]/20">
            <XCircle className="w-16 h-16 text-[#AC440B] mx-auto mb-5" />
            <h2 className="text-2xl font-bold text-[#093B5A] mb-3">Rezervasyon Başarısız!</h2>
            <p className="text-[#2781B9] mb-6">Rezervasyonunuz tamamlanamadı. Lütfen bilgilerinizi kontrol edip tekrar deneyin.</p>
            <button
              onClick={() => setShowBookingErrorModal(false)}
              className="bg-gradient-to-r from-[#AC440B] to-[#D48A61] hover:from-[#D48A61] hover:to-[#AC440B] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 w-full"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
