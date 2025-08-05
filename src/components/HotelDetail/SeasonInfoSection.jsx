import React from 'react';
import { CalendarDays } from 'lucide-react';

/**
 * Otelin mevcut sezon bilgilerini gösteren bileşen.
 * @param {object} props
 * @param {object} props.season - Sezon bilgileri nesnesi.
 */
export const SeasonInfoSection = ({ season }) => {
    if (!season) return null;
    return (
        <section className="p-6 bg-blue-50/70 backdrop-blur-md rounded-2xl border border-blue-200/80 shadow-md animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-2xl font-bold mb-4 text-slate-800 flex items-center">
                <CalendarDays className="h-7 w-7 mr-3" /> Mevcut Sezon
            </h3>
            <p className="text-lg text-slate-700">
                 {new Date(season.beginDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(season.endDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })} tarihleri arasında geçerlidir.
            </p>
        </section>
    );
};
