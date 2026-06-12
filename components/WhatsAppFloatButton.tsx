import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloatButton() {
  return (
    <a
      href="https://wa.me/message/L6KQCBXWOIUTA1"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat öffnen"
      className="fixed bottom-[25px] right-[25px] z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.32)] transition duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_14px_34px_rgba(37,211,102,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:h-[60px] sm:w-[60px]"
    >
      <FaWhatsapp className="h-8 w-8 sm:h-9 sm:w-9" aria-hidden="true" />
    </a>
  );
}
