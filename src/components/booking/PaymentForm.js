import React, { useState } from "react";

const PaymentForm = ({ onChange }) => {
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "" });

  const handleCardChange = (field, value) => {
    const updated = { ...card, [field]: value };
    setCard(updated);
    onChange(updated);
  };

  return (
    <div className="space-y-4 p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold text-[#2883BB]">Ödeme Bilgileri</h2>
      <input
        placeholder="Kart Numarası"
        className="input-style"
        value={card.number}
        onChange={(e) => handleCardChange("number", e.target.value)}
      />
      <input
        placeholder="Son Kullanım Tarihi (AA/YY)"
        className="input-style"
        value={card.expiry}
        onChange={(e) => handleCardChange("expiry", e.target.value)}
      />
      <input
        placeholder="CVC"
        className="input-style"
        value={card.cvc}
        onChange={(e) => handleCardChange("cvc", e.target.value)}
      />
    </div>
  );
};

export default PaymentForm;
