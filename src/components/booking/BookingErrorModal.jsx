import { XCircle } from "lucide-react";

export const BookingErrorModal = ({ show, onClose, error }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-[#093B5A]/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all scale-100 animate-fade-in border border-[#D48A61]/20">
                <XCircle className="w-16 h-16 text-[#AC440B] mx-auto mb-5" />
                <h2 className="text-2xl font-bold text-[#093B5A] mb-3">Rezervasyon Başarısız!</h2>
                <p className="text-[#2781B9] mb-6">{error || "Rezervasyonunuz tamamlanamadı. Lütfen bilgilerinizi kontrol edip tekrar deneyin."}</p>
                <button
                    onClick={onClose}
                    className="bg-gradient-to-r from-[#AC440B] to-[#D48A61] hover:from-[#D48A61] hover:to-[#AC440B] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 w-full"
                >
                    Tekrar Dene
                </button>
            </div>
        </div>
    )
}