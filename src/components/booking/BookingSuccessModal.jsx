import React from 'react';
import { CheckCircle } from 'lucide-react';

export const BookingSuccessModal = ({ show, onClose, onViewDetails, reservationNumber }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all scale-100">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-5" />
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Rezervasyon Başarılı!</h2>
                <p className="text-gray-700 mb-2">Rezervasyonunuz başarıyla tamamlandı.</p>
                {reservationNumber && <p className="text-gray-700 font-semibold mb-4">Rezervasyon Numaranız: <span className="text-blue-600">{reservationNumber}</span></p>}
                <p className="text-gray-700 mb-6">Onay e-postanız gönderildi.</p>
                <button onClick={onViewDetails} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg w-full mb-3">
                    Rezervasyon Detaylarını Gör
                </button>
                <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg w-full">
                    Kapat
                </button>
            </div>
        </div>
    );
};