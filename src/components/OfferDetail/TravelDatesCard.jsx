import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate } from './formatDate';

export const TravelDatesCard = ({ checkIn, checkOut }) => {
    return (
        <div className="p-6 bg-white rounded-xl shadow-md border border-[#88B8D2]/20">
            <h2 className="text-2xl font-bold text-[#093B5A] mb-4 flex items-center">
                <Calendar className="h-6 w-6 mr-3 text-[#D48A61]" /> Seyahat Tarihleri
            </h2>
            <div className="flex justify-between items-center text-center">
                <div className="bg-[#EDDEA4]/20 p-4 rounded-lg">
                    <p className="font-semibold text-[#2781B9] text-sm">GİRİŞ TARİHİ</p>
                    <p className="text-lg text-[#093B5A] font-bold">{formatDate(checkIn)}</p>
                </div>
                <div className="text-2xl text-[#88B8D2]">→</div>
                <div className="bg-[#EDDEA4]/20 p-4 rounded-lg">
                    <p className="font-semibold text-[#2781B9] text-sm">ÇIKIŞ TARİHİ</p>
                    <p className="text-lg text-[#093B5A] font-bold">{formatDate(checkOut)}</p>
                </div>
            </div>
        </div>
    );
};