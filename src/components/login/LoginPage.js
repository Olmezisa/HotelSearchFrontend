import React, { useState } from 'react';

export default function LoginPage() {
    // State'ler: kullanıcı adı/e-posta, şifre, beni hatırla ve hata mesajı için
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState(''); // Hata mesajını tutacak state

    // Form gönderildiğinde çalışacak fonksiyon
    const handleSubmit = (e) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini engeller

        setError(''); // Önceki hataları temizle

        // Temel doğrulama (daha karmaşık doğrulama eklenebilir)
        if (!email || !password) {
            setError('Lütfen tüm alanları doldurun.');
            return;
        }

        // Basit bir demo login mantığı
        if (email === 'test@example.com' && password === 'password123') {
            alert('Başarıyla giriş yaptınız!');
            // Burada kullanıcıyı yönlendirme (örn: dashboard sayfasına) veya token saklama gibi işlemler yapılabilir.
            console.log('Giriş başarılı!', { email, rememberMe });
        } else {
            setError('Geçersiz e-posta veya şifre.');
            console.log('Giriş başarısız!', { email, password });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="w-full max-w-md rounded-2xl shadow-2xl p-8 space-y-6 backdrop-blur-sm border border-white/20" style={{ backgroundColor: '#F9F7F3' }}>
                <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#093B5A' }}>Giriş Yap</h2>

                {/* Hata Mesajı */}
                {error && (
                    <div className="border px-4 py-3 rounded relative" role="alert" style={{ backgroundColor: '#FBCFB7', borderColor: '#D48A61', color: '#093B5A' }}>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#093B5A' }}>
                            E-posta Adresi
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="eposta@example.com"
                            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                            style={{ 
                                borderColor: '#EDDEA4',
                                backgroundColor: '#F9F7F3',
                                color: '#093B5A'
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: '#093B5A' }}>
                            Şifre
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Şifrenizi girin"
                            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                            style={{ 
                                borderColor: '#EDDEA4',
                                backgroundColor: '#F9F7F3',
                                color: '#093B5A'
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                name="rememberMe"
                                className="h-4 w-4 rounded focus:ring-2"
                                style={{ 
                                    accentColor: '#2781B9',
                                    borderColor: '#EDDEA4'
                                }}
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm" style={{ color: '#093B5A' }}>
                                Beni Hatırla
                            </label>
                        </div>
                        <a href="#" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#2781B9' }}>
                            Şifremi Unuttum?
                        </a>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
                            style={{ 
                                backgroundColor: '#2781B9',
                                color: '#F9F7F3'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#093B5A'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#2781B9'}
                        >
                            Giriş Yap
                        </button>
                    </div>
                </div>

                {/* İsteğe bağlı: Kayıt ol veya diğer seçenekler */}
                <div className="text-center text-sm" style={{ color: '#093B5A' }}>
                    Hesabınız yok mu?{' '}
                    <a href="#" className="font-medium hover:opacity-80 transition-opacity" style={{ color: '#AC440B' }}>
                        Şimdi Kayıt Ol
                    </a>
                </div>

                {/* Dekoratif accent */}
                <div className="flex justify-center space-x-2 mt-6">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D48A61' }}></div>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#F9B18B' }}></div>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#EDDEA4' }}></div>
                </div>
            </div>
        </div>
    );
}