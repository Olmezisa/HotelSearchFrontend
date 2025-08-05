import React from 'react';
import { CreditCard } from 'lucide-react';

/**
 * Otel için ödeme planı bilgilerini gösteren bileşen.
 * @param {object} props
 * @param {Array<object>} props.paymentPlanInfo - Ödeme planı bilgileri listesi.
 * @param {string} props.currency - Para birimi kodu (örn. "EUR").
 */
export const PaymentPlanSection = ({ paymentPlanInfo, currency }) => {
    if (!paymentPlanInfo || paymentPlanInfo.length === 0) return null;
    return (
        <section className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
            <h3 className="text-4xl font-bold mb-6 text-[#2883BB] flex items-center">
                <CreditCard className="h-9 w-9 mr-4" /> Ödeme Planı Bilgileri
            </h3>
            <div className="space-y-4">
                {paymentPlanInfo.map((plan, idx) => (
                    <div key={idx} className="p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-md">
                        <p className="text-lg text-slate-700">Ödeme Zamanı: {plan.paymentTimeStatus === 1 ? 'Rezervasyon Anında' : `${plan.day} Gün Önce`}</p>
                        <p className="text-lg text-slate-700 mt-2">Ödenecek Tutar: {plan.price.percent > 0 ? `${plan.price.percent}%` : `${plan.price.amount.toFixed(2)} ${currency}`}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
