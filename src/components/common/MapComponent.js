import React from 'react';

const MapComponent = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return null;

  const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=12&output=embed`;

  return (
    <iframe
      title="Şehir Haritası"
      src={mapUrl}
      className="w-full h-full block"
      frameBorder="0"
      allowFullScreen
      style={{ border: 0 }}
    ></iframe>
  );
};

export default MapComponent;
