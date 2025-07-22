import React from 'react';

const ReservationDetails = ({ reservation }) => {
  if (!reservation) return null;

  const { reservationNumber, travellers, services, reservationInfo } = reservation;

  return (
    <div className="border rounded-md p-4 shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Rezervasyon Detayları</h2>

      <p className="mb-3">
        <strong>Rezervasyon Numarası:</strong> {reservationNumber}
      </p>

      <h3 className="font-semibold mb-2">Yolcular</h3>
      <ul className="mb-4 list-disc list-inside">
        {travellers.map((traveller) => (
          <li key={traveller.travellerId}>
            {traveller.title === 1 && 'Mr.'}
            {traveller.title === 2 && 'Ms.'}
            {traveller.title === 3 && 'Mrs.'}
            {traveller.title === 4 && 'Miss '}
            {traveller.name} {traveller.surname} - Doğum Tarihi: {new Date(traveller.birthDate).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <h3 className="font-semibold mb-2">Konaklama Bilgisi</h3>
      {services.map((service) => (
        <div key={service.id} className="mb-4 p-3 border rounded">
          <p><strong>Oda:</strong> {service.room}</p>
          <p><strong>Oda Tipi:</strong> {service.name}</p>
          <p><strong>Giriş:</strong> {new Date(service.beginDate).toLocaleDateString()}</p>
          <p><strong>Çıkış:</strong> {new Date(service.endDate).toLocaleDateString()}</p>
          <p><strong>Gece Sayısı:</strong> {service.night}</p>
          <p><strong>Fiyat:</strong> {service.price.amount} {service.price.currency}</p>
          <p><strong>Pansiyon:</strong> {service.board}</p>
        </div>
      ))}

      <h3 className="font-semibold mb-2">Diğer Bilgiler</h3>
      <p><strong>Not:</strong> {reservationInfo?.note || '-'}</p>
      <p><strong>Acenta Rezervasyon Numarası:</strong> {reservationInfo?.agencyReservationNumber || '-'}</p>
    </div>
  );
};

export default ReservationDetails;
