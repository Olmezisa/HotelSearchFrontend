import React from 'react';
import { Tag, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Spinner } from '../common/Spinner';

export const OfferList = ({ offers, currency, onStartBooking, isBookingLoading, bookingError }) => {
    // Teklif yoksa bileşeni render etme
    if (!offers || offers.length === 0) return null;
    
    return (
        <section className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-4xl font-bold mb-6 text-[#2883BB] flex items-center">
                <Tag className="h-9 w-9 mr-4" /> Fiyat Teklifleri
            </h3>
            <div className="space-y-4">
                {offers.map(offer => {
                    const nights = offer.night || 1;
                    const totalAmount = offer.price?.amount || 0;
                    const nightlyPrice = nights > 0 ? totalAmount / nights : totalAmount;

                    return (
                        <div key={offer.offerId} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h4 className="font-bold text-xl text-slate-800">{offer.rooms[0].roomName}</h4>
                                <p className="text-md text-slate-600 mt-1">{offer.rooms[0].boardName}</p>
                                {nightlyPrice !== null && (
                                    <div className="mt-2 text-xl font-semibold text-[#001624]">
                                        {nightlyPrice.toFixed(2)} {currency}
                                        <span className="text-sm font-normal text-slate-500"> / gecelik</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <Link
                                    to={`/offer-details/${offer.offerId}/${currency}`}
                                    className="flex items-center justify-center text-lg font-semibold px-6 py-3 rounded-xl bg-gradient-to-r from-[#2781B9] to-[#88B8D2] text-white shadow-lg transition-all duration-300 transform hover:scale-105 w-full"
                                >
                                    Detayları Gör
                                </Link>
                                <button
                                    onClick={() => onStartBooking(offer)}
                                    disabled={isBookingLoading}
                                    className="flex items-center justify-center text-lg font-semibold px-6 py-3 rounded-xl bg-gradient-to-r from-[#f7a072] to-[#ac440b] text-white shadow-lg transition-all duration-300 transform hover:scale-105 w-full disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isBookingLoading ? (
                                        <Spinner size="sm" />
                                    ) : (
                                        <>
                                            <ShoppingCart className="h-6 w-6 mr-2" />
                                            Rezervasyon
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
                {bookingError && (
                    <p className="text-red-600 text-center mt-4 font-semibold">{bookingError}</p>
                )}
            </div>
        </section>
    );
};
