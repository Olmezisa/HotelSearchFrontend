import React, { useState } from 'react';
import { MapPin, Phone, Mail, Camera, Wifi, Car, Coffee, Utensils, Dumbbell, Waves } from 'lucide-react';

export default function PropertyRegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    propertyName: '',
    propertyType: '',
    address: '',
    city: '',
    district: '',
    description: '',
    price: '',
    features: [],
    images: []
  });

  const [currentTab, setCurrentTab] = useState('personal');

  const propertyTypes = [
    'Hotel',
    'Apartman',
    'Villa',
    'Pansiyon',
    'Butik Otel',
    'Rezidans',
    'Apart Otel'
  ];

  const availableFeatures = [
    { id: 'wifi', name: 'Wi-Fi', icon: Wifi },
    { id: 'parking', name: 'Otopark', icon: Car },
    { id: 'breakfast', name: 'Kahvaltı', icon: Coffee },
    { id: 'restaurant', name: 'Restoran', icon: Utensils },
    { id: 'gym', name: 'Spor Salonu', icon: Dumbbell },
    { id: 'pool', name: 'Havuz', icon: Waves }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (featureId) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Tesisiniz başarıyla kaydedildi! En kısa sürede sizinle iletişime geçeceğiz.');
  };

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-[#D48A61] to-[#AC440B] text-white shadow-xl transform scale-105'
          : 'bg-white text-[#093B5A] border-2 border-gray-200 hover:border-[#D48A61] hover:shadow-lg hover:scale-102'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* HEADER? */}
      <div className="bg-gradient-to-r from-[#093B5A] to-[#2781B9] py-16">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-bold text-center mb-4 text-white">Tesisinizi Ekleyin</h1>
          <p className="text-center text-xl text-blue-100">Tesisinizi platformumuza eklemek için aşağıdaki formu doldurun</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* NAVİGATİON */}
        <div className="flex justify-center mb-12 space-x-8">
          <TabButton
            id="personal"
            label="Kişisel Bilgiler"
            isActive={currentTab === 'personal'}
            onClick={setCurrentTab}
          />
          <TabButton
            id="property"
            label="Tesis Bilgileri"
            isActive={currentTab === 'property'}
            onClick={setCurrentTab}
          />
          <TabButton
            id="details"
            label="Detaylar"
            isActive={currentTab === 'details'}
            onClick={setCurrentTab}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 backdrop-blur-sm border border-white/20">
          {/* KİŞİSEL CNM */}
          {currentTab === 'personal' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                
                <h2 className="text-4xl font-bold text-[#093B5A] mb-4">Kişisel Bilgileriniz</h2>
                <p className="text-gray-600 text-lg">Sizinle iletişim kurabilmemiz için gerekli bilgileri girin</p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-[#093B5A] font-semibold text-lg mb-3">Adınız</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#D48A61] focus:outline-none text-lg transition-all duration-200 hover:border-gray-300"
                    placeholder="Adınız"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-[#093B5A] font-semibold text-lg mb-3">Soyadınız</label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#D48A61] focus:outline-none text-lg transition-all duration-200 hover:border-gray-300"
                    placeholder="Soyadınız"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[#093B5A] font-semibold text-lg mb-3">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#D48A61] focus:outline-none text-lg transition-all duration-200 hover:border-gray-300"
                  placeholder="E-mail adresiniz"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[#093B5A] font-semibold text-lg mb-3">İletişim Numarası</label>
                <div className="flex">
                  <select className="px-6 py-4 border-2 border-gray-200 rounded-l-2xl bg-white text-[#093B5A] focus:border-[#D48A61] focus:outline-none text-lg">
                    <option value="+90">🇹🇷 +90</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-1 px-6 py-4 border-2 border-l-0 border-gray-200 rounded-r-2xl focus:border-[#D48A61] focus:outline-none text-lg transition-all duration-200 hover:border-gray-300"
                    placeholder="555 555 55 55"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* INFO */}
          {currentTab === 'property' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                
                <h2 className="text-4xl font-bold text-[#093B5A] mb-4">Tesis Bilgileri</h2>
                <p className="text-gray-600 text-lg">Tesisinizin temel bilgilerini girin</p>
              </div>

              <div className="space-y-2">
                <label className="block text-[#093B5A] font-semibold text-lg mb-3">Tesis Adı</label>
                <input
                  type="text"
                  name="propertyName"
                  value={formData.propertyName}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#88B8D2] focus:outline-none text-lg transition-all duration-200 hover:border-gray-300"
                  placeholder="Tesisinizin adı"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[#093B5A] font-semibold text-lg mb-3">Tesis Türü</label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2781B9] focus:outline-none text-lg transition-all duration-200 hover:border-gray-300"
                  required
                >
                  <option value="">Tesis türünü seçin</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-[#093B5A] font-semibold text-lg mb-3">Şehir</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2781B9] focus:outline-none text-lg transition-all duration-200 hover:border-gray-300"
                    placeholder="Şehir"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-[#093B5A] font-semibold text-lg mb-3">İlçe</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2781B9] focus:outline-none text-lg transition-all duration-200 hover:border-gray-300"
                    placeholder="İlçe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[#093B5A] font-semibold text-lg mb-3">Adres</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2781B9] focus:outline-none resize-none text-lg transition-all duration-200 hover:border-gray-300"
                  placeholder="Tesisinizin detaylı adresi"
                  required
                />
              </div>
            </div>
          )}

          {/* DETAYS*/}
          {currentTab === 'details' && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-[#093B5A] mb-4">Tesis Detayları</h2>
                <p className="text-gray-600 text-lg">Tesisinizin özelliklerini ve detaylarını girin</p>
              </div>

              <div className="space-y-2">
                <label className="block text-[#093B5A] font-semibold text-lg mb-3">Gecelik Fiyat (₺)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2781B9] focus:outline-none text-lg transition-all duration-200 hover:border-gray-300"
                  placeholder="Başlangıç fiyatı"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-6">
                <label className="block text-[#093B5A] font-semibold text-lg">Tesis Özellikleri</label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableFeatures.map(feature => {
                    const IconComponent = feature.icon;
                    const isSelected = formData.features.includes(feature.id);
                    return (
                      <button
                        key={feature.id}
                        type="button"
                        onClick={() => handleFeatureToggle(feature.id)}
                        className={`p-6 rounded-2xl border-2 flex flex-col items-center space-y-3 transition-all duration-200 ${
                          isSelected
                            ? 'border-[#2781B9] bg-gradient-to-r from-[#2781B9] to-[#093B5A] text-white shadow-xl transform scale-105'
                            : 'border-gray-200 text-[#093B5A] hover:border-[#2781B9] hover:shadow-lg hover:scale-102'
                        }`}
                      >
                        <IconComponent size={32} />
                        <span className="text-base font-semibold">{feature.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[#093B5A] font-semibold text-lg mb-3">Tesis Açıklaması</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-[#2781B9] focus:outline-none resize-none text-lg transition-all duration-200 hover:border-gray-300"
                  placeholder="Tesisinizi tanıtan açıklama yazın..."
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="block text-[#093B5A] font-semibold text-lg">Tesis Fotoğrafları</label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-[#2781B9] transition-all duration-200 hover:bg-gray-50">
                  <Camera size={64} className="mx-auto text-[#2781B9] mb-6" />
                  <p className="text-[#093B5A] font-semibold text-xl mb-2">Fotoğrafları buraya sürükleyin</p>
                  <p className="text-gray-500 text-lg">veya dosya seçmek için tıklayın</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                     
                      console.log('Files selected:', e.target.files);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ŞOV NAVİGASYONU */}
          <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                if (currentTab === 'property') setCurrentTab('personal');
                if (currentTab === 'details') setCurrentTab('property');
              }}
              className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                currentTab === 'personal'
                  ? 'invisible'
                  : 'bg-gray-100 text-[#093B5A] hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              Önceki Adım
            </button>

            {currentTab !== 'details' ? (
              <button
                type="button"
                onClick={() => {
                  if (currentTab === 'personal') setCurrentTab('property');
                  if (currentTab === 'property') setCurrentTab('details');
                }}
                className="bg-gradient-to-r from-[#2781B9] to-[#093B5A] text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Sonraki Adım
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-[#2781B9] to-[#093B5A] text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105"
              >
                Tesis Kaydını Tamamla
              </button>
            )}
          </div>
        </div>

        {/* UYE GIRISI OLDU CNMMM*/}
        <div className="text-center mt-8">
          <p className="text-[#093B5A] text-lg">
            Zaten üye misiniz?{' '}
            <button className="text-[#2781B9] font-semibold hover:underline transition-all duration-200">
              Giriş Yapın
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}