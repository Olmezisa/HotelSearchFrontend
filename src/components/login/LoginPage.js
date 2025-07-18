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
        <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#B5E2FA' , borderRadius: '10px'}}>
            <div className="w-full max-w-md rounded-xl shadow-lg p-8 space-y-6" style={{ backgroundColor: '#F9F7F3' }}>
                <h2 className="text-3xl font-bold text-center" style={{ color: '#cf680eff' }}>Giriş Yap</h2>

                {/* Hata Mesajı */}
                {error && (
                    <div className="border px-4 py-3 rounded relative" role="alert" style={{ backgroundColor: '#e68a59ff', borderColor: '#F7A072', color: '#001624' }}>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: '#cf680eff' }}>
                            E-posta Adresi
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="eposta@example.com"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                            style={{ 
                                borderColor: '#EDDEA4',
                                backgroundColor: '#F9F7F3',
                                color: '#001624'
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: '#cf680eff' }}>
                            Şifre
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Şifrenizi girin"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                            style={{ 
                                borderColor: '#EDDEA4',
                                backgroundColor: '#F9F7F3',
                                color: '#001624'
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
                                    accentColor: '#2883BB',
                                    borderColor: '#EDDEA4'
                                }}
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm" style={{ color: '#001624' }}>
                                Beni Hatırla
                            </label>
                        </div>
                        <a href="#" className="text-sm font-medium hover:opacity-80" style={{ color: '#2883BB' }}>
                            Şifremi Unuttum?
                        </a>
                    </div>

                    <div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{ 
                                backgroundColor: '#2883BB',
                                color: '#b8c4eeff'
                            }}
                        >
                            Giriş Yap
                        </button>
                    </div>
                </div>

                {/* İsteğe bağlı: Kayıt ol veya diğer seçenekler */}
                <div className="text-center text-sm" style={{ color: '#001624' }}>
                    Hesabınız yok mu?{' '}
                    <a href="#" className="font-medium hover:opacity-80" style={{ color: '#2883BB' }}>
                        Şimdi Kayıt Ol
                    </a>
                </div>
            </div>
        </div>
    );
}