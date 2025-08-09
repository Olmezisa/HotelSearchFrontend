import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../api/santsgApi';

// Ayrıştırılmış Componentler
import { BookingHotelInfo } from '../components/booking/BookingHotelInfo';
import { GuestInfoForm } from '../components/booking/GuestInfoForm';
import { SpecialRequests } from '../components/booking/SpecialRequests';
import { PaymentForm } from '../components/booking/PaymentForm';
import { BookingActions } from '../components/booking/BookingActions';
import { BookingSuccessModal } from '../components/booking/BookingSuccessModal';
import { ReservationDetailModal } from '../components/booking/ReservationDetailsModal';
import { BookingErrorModal } from '../components/booking/BookingErrorModal';

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

const BookingPage = () => {
    const location = useLocation();
    const {
        offerDetails: initialOfferDetails,
        transactionData: initialTransactionData,
        mainHotelImage: initialMainHotelImage,
        hotel: initialHotel
    } = location.state || {};

    // --- STATE YÖNETİMİ (Tüm state'ler burada kalır) ---
    const [offerDetails, setOfferDetails] = useState(initialOfferDetails);
    const [transactionData, setTransactionData] = useState(initialTransactionData);
    const [mainHotelImage, setMainHotelImage] = useState(initialMainHotelImage);
    const [loading, setLoading] = useState(!initialOfferDetails);
    const [error, setError] = useState(null);
    const [guestInfo, setGuestInfo] = useState([]);
    const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiryDate: '', cvv: '', cardHolder: '', expiryMonth: '', expiryYear: '' });
    const [isSavingGuestInfo, setIsSavingGuestInfo] = useState(false);
    const [saveGuestInfoError, setSaveGuestInfoError] = useState(null);
    const [showBookingSuccessModal, setShowBookingSuccessModal] = useState(false);
    const [finalReservationNumber, setFinalReservationNumber] = useState('');
    const [showReservationDetailsModal, setShowReservationDetailsModal] = useState(false);
    const [reservationDetailsFromApi, setReservationDetailsFromApi] = useState(null);
    const [showBookingErrorModal, setShowBookingErrorModal] = useState(false);

    // --- EFFECT & VERİ İŞLEME (Tüm mantık burada kalır) ---
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

    const getGuestCounts = (travellers) => {
        if (!travellers || travellers.length === 0) {
            return { adults: 0, children: 0 };
        }

        const adults = travellers.filter(t => t.passengerType === 1).length;
        const children = travellers.filter(t => t.passengerType === 3).length;

        return { adults, children };
    };

    const guestCounts = getGuestCounts(transactionData?.reservationData?.travellers);
    const guestCountText = [];
    if (guestCounts.adults > 0) {
        guestCountText.push(`${guestCounts.adults} Yetişkin`);
    }
    if (guestCounts.children > 0) {
        guestCountText.push(`${guestCounts.children} Çocuk`);
    }

    const totalGuests = (guestCounts.adults || 0) + (guestCounts.children || 0)

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
        guests: guestCountText.length > 0 ? guestCountText.join(', ') : defaultHotelData.guests,
        nights: transactionData?.reservationData?.reservationInfo?.beginDate && transactionData?.reservationData?.reservationInfo?.endDate
            ? `${Math.ceil((new Date(transactionData.reservationData.reservationInfo.endDate) - new Date(transactionData.reservationData.reservationInfo.beginDate)) / (1000 * 60 * 60 * 24))} gece`
            : defaultHotelData.nights,
        totalGuests: totalGuests,
        guestDetails: {
            adults: guestCounts.adults,
            children: guestCounts.children
        },
        roomType: roomOffer?.roomName || defaultHotelData.roomType,
        features: [
            `${guestCounts.adults || 0} Yetişkin`,
            ...(guestCounts.children > 0 ? [`${guestCounts.children} Çocuk`] : []),
            roomOffer?.boardName || "Oda + Kahvaltı",
            "Sigara İçilmeyen"
        ]
    } : defaultHotelData;

    const totalPrice = transactionData?.reservationData?.reservationInfo?.passengerAmountToPay?.amount || 0;
    const currency = transactionData?.reservationData?.reservationInfo?.passengerAmountToPay?.currency || 'EUR';

    // --- OLAY YÖNETİCİLERİ (Tüm handler'lar burada kalır) ---
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

    // --- KOŞULLU RENDER ---
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

    // --- ANA RENDER ---
    return (
        <div className="min-h-screen bg-[#F9F7F3] font-sans">
            <div className="max-w-6xl mx-auto p-4 py-8">
                <h1 className="text-3xl font-bold text-[#093B5A] mb-8 text-center">Rezervasyon Detayları</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-6">
                        <BookingHotelInfo hotelData={currentHotelData} mainHotelImage={mainHotelImage} offerDetails={offerDetails} />
                        <GuestInfoForm guestInfo={guestInfo} onInputChange={handleInputChange} />
                        <SpecialRequests
                            specialRequests={guestInfo[0]?.specialRequests || ''}
                            onTextChange={(e) => handleInputChange(0, 'specialRequests', e.target.value)}
                        />
                    </div>

                    <aside className="lg:sticky lg:top-8 self-start space-y-6">
                        <PaymentForm paymentInfo={paymentInfo} onInputChange={handleInputChange} />
                        <BookingActions totalPrice={totalPrice} currency={currency} onBooking={handleBooking} isBooking={isSavingGuestInfo} error={saveGuestInfoError} />
                    </aside>

                </div>
            </div>

            <BookingSuccessModal
                show={showBookingSuccessModal}
                onClose={() => setShowBookingSuccessModal(false)}
                onViewDetails={handleViewDetails}
                reservationNumber={finalReservationNumber}
            />
            <ReservationDetailModal
                show={showReservationDetailsModal}
                onClose={() => setShowReservationDetailsModal(false)}
                reservationDetailsFromApi={reservationDetailsFromApi}
                formatDate={formatDate} // Kendi formatDate fonksiyonunu prop olarak geç
            />

            <BookingErrorModal
                show={showBookingErrorModal}
                onClose={() => setShowBookingErrorModal(false)}
                error={saveGuestInfoError} // Hata mesajını prop olarak geç
            />
        </div>
    );
};

export default BookingPage;