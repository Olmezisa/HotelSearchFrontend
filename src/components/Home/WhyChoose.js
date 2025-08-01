import React from 'react';
import { DollarSign, ShieldCheck, Hotel, Globe } from 'lucide-react'; // Yeni ikonlar eklendi (Users yerine Globe)

const WhyChoose = () => {
  const features = [
    { title: "En Düşük Fiyat Garantisi!", icon: <DollarSign size={40} className="text-[#2781B9]" /> },
    { title: "Güvenli Rezervasyon", icon: <ShieldCheck size={40} className="text-[#2781B9]" /> },
    { title: "1M+ Otel Seçeneği", icon: <Hotel size={40} className="text-[#2781B9]" /> },
    { title: "Geniş Destinasyon Ağı", icon: <Globe size={40} className="text-[#2781B9]" /> },
  ];

  return (
    <section className="bg-[#F9F7F3] py-16 mt-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#093B5A] mb-6">
          Neden Bizi Tercih Etmelisiniz?
        </h2>
        <div className="w-24 h-1 bg-[#D48A61] mx-auto mb-12 rounded-full"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300 flex flex-col items-center justify-center"
            >
              <div className="mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#093B5A]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
