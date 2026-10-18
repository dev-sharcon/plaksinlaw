import { Phone, MessageCircle, Send } from "lucide-react";
import { CONTACT_INFO } from "@/data/siteContent";

/**
 * Shown after a form submission while lead delivery is not connected yet (demo mode):
 * asks the visitor to reach the office directly so the request is not lost.
 */
export default function DirectContactNotice({ isRu }: { isRu: boolean }) {
  const btn =
    "inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold border transition-colors";
  return (
    <div className="bg-amber-50 border border-amber-200 p-4 text-left space-y-3">
      <p className="text-xs text-slate-700 leading-relaxed">
        {isRu
          ? "Чтобы гарантированно и быстрее согласовать консультацию, пожалуйста, позвоните нам или напишите в WhatsApp / Telegram:"
          : "To make sure we schedule your consultation promptly, please call us or message us on WhatsApp / Telegram:"}
      </p>
      <div className="grid grid-cols-2 gap-2">
        <a href={CONTACT_INFO.phoneHref} className={`${btn} col-span-2 whitespace-nowrap bg-[#0B1F3A] text-white border-[#0B1F3A]`}>
          <Phone className="w-3.5 h-3.5" />
          <span>{CONTACT_INFO.phoneDisplay}</span>
        </a>
        <a
          href={CONTACT_INFO.whatsappHref}
          target="_blank"
          rel="noreferrer"
          className={`${btn} bg-white text-[#0B1F3A] border-slate-300 hover:border-[#0B1F3A]`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
        <a
          href={CONTACT_INFO.telegramHref}
          target="_blank"
          rel="noreferrer"
          className={`${btn} bg-white text-[#0B1F3A] border-slate-300 hover:border-[#0B1F3A]`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Telegram</span>
        </a>
      </div>
    </div>
  );
}
