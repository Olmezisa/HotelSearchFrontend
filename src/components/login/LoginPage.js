import React, { useState } from 'react';

export const LoginPage = () => {
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-800">Giriş Yap</h2>

                {/* Hata Mesajı */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            E-posta Adresi
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="eposta@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Şifre
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Şifrenizi girin"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                                Beni Hatırla
                            </label>
                        </div>
                        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                            Şifremi Unuttum?
                        </a>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Giriş Yap
                        </button>
                    </div>
                </form>

                {/* İsteğe bağlı: Kayıt ol veya diğer seçenekler */}
                <div className="text-center text-sm text-gray-600">
                    Hesabınız yok mu?{' '}
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        Şimdi Kayıt Ol
                    </a>
                </div>
            </div>
        </div>
    );
};