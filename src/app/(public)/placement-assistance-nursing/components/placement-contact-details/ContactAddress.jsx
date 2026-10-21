
import { MapPin } from "lucide-react";
import { CONTACT_ADDRESS } from "./contactData";

export default function ContactAddress() {
  return (
    <div className="relative z-10 mt-12 flex items-center justify-center gap-5 sm:mt-16">
      <div className="hidden h-px flex-1 bg-[#e9a3bf]/70 lg:block" />

      <div className="flex max-w-[1100px] items-start justify-center gap-2 text-center sm:items-center">
        <MapPin
          size={20}
          className="mt-0.5 shrink-0 text-[#d92772] sm:mt-0"
          fill="#fce0eb"
        />

        <p className="text-[12px] leading-6 text-slate-500 sm:text-[13px]">
          {CONTACT_ADDRESS}
        </p>
      </div>

      <div className="hidden h-px flex-1 bg-[#e9a3bf]/70 lg:block" />
    </div>
  );
}
