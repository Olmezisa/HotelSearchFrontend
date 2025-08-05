import React from 'react';

/**
 * Otel bilgilerinin metin kategorilerini gösteren bileşen.
 * @param {object} props
 * @param {Array<object>} props.categories - Gösterilecek metin kategorileri listesi.
 */
export const TextCategoriesSection = ({ categories }) => (
    <>
        {categories.map((cat, idx) => (
            <section key={cat.name || idx} className="animate-fade-in-up" style={{ animationDelay: `${0.4 + idx * 0.2}s` }}>
                <h3 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#2883BB] to-[#B5E2FA]">{cat.name}</h3>
                <div className="text-lg text-slate-600 leading-relaxed prose max-w-none" dangerouslySetInnerHTML={{ __html: cat.presentations?.[0]?.text || '' }}></div>
            </section>
        ))}
    </>
);
