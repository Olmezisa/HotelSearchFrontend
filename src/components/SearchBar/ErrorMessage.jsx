import { useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';

/**
 * Hata mesajını gösteren ve belirli bir süre sonra gizleyen bileşen.
 * @param {string} message - Gösterilecek hata mesajı.
 * @param {function} onClear - Hata temizlendiğinde çağrılan fonksiyon.
 */
export const ErrorMessage = ({ message, onClear }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClear();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClear]);

  if (!message) {
    return null;
  }

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center mb-4 transition-opacity duration-300 ease-in-out opacity-100"
      role="alert"
    >
      <AlertCircle className="h-5 w-5 mr-2" />
      <p className="font-semibold">{message}</p>
      <button
        onClick={onClear}
        className="ml-auto text-red-700 hover:text-red-900 focus:outline-none"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
