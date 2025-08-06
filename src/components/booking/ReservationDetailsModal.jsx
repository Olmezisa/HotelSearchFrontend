import React from 'react';

// formatDate fonksiyonunu ya prop olarak almalı ya da utils dosyasından import etmeliyiz.
// Bu örnekte prop olarak alacağız.

export const ReservationDetailModal = ({ show, onClose, reservationDetailsFromApi, formatDate }) => {
    // 1. Eğer 'show' prop'u false ise veya veri yoksa, hiç render etme (null dön).
    if (!show || !reservationDetailsFromApi) {
        return null;
    }

    // 4. Verilere güvenli erişim için optional chaining (?.) kullanalım.
    const hotelName = reservationDetailsFromApi?.reservationData?.services?.[0]?.serviceDetails?.hotelDetail?.name || 'Otel Adı Bulunamadı';
    const totalPrice = reservationDetailsFromApi?.reservationData?.reservationInfo?.totalPrice;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all scale-100 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Rezervasyon Detayları</h2>
                <div className="text-left space-y-2 mb-6">
                    <p><strong>Rezervasyon No:</strong> {reservationDetailsFromApi.reservationNumber}</p>
                    <p><strong>Otel Adı:</strong> {hotelName}</p>
                    {/* 3. formatDate fonksiyonunu prop olarak kullan. */}
                    <p><strong>Giriş Tarihi:</strong> {formatDate(reservationDetailsFromApi.reservationData?.reservationInfo?.beginDate)}</p>
                    <p><strong>Çıkış Tarihi:</strong> {formatDate(reservationDetailsFromApi.reservationData?.reservationInfo?.endDate)}</p>
                    <p>
                        <strong>Toplam Fiyat:</strong> {
                            totalPrice?.amount
                                ? `${totalPrice.amount.toFixed(2)} ${totalPrice.currency}`
                                : 'N/A'
                        }
                    </p>
                    {reservationDetailsFromApi.travellers?.length > 0 && (
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
                {/* 2. "Kapat" butonu, dışarıdan gelen 'onClose' fonksiyonunu çağırır. */}
                <button
                    onClick={onClose}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full"
                >
                    Kapat
                </button>
            </div>
        </div>
    );
};