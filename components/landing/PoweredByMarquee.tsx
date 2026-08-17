import React from 'react';
import { Marquee } from './Marquee';

export const PoweredByMarquee: React.FC = () => {
  const partners = [
    {
      name: "Cloudflare",
      icon: (
        <svg className="w-5 h-5 text-[#F38020]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.14 10.34C18.6 6.89 15.6 4.3 12 4.3c-2.88 0-5.38 1.63-6.64 4.03C2.37 8.65 0 11.2 0 14.3c0 3.31 2.69 6 6 6h13.14c2.68 0 4.86-2.18 4.86-4.86 0-2.52-1.92-4.58-4.42-4.82l-.44-.28z"/>
        </svg>
      )
    },
    {
      name: "Zoho",
      icon: (
        <svg className="w-6 h-5" viewBox="0 0 48 24" fill="currentColor">
          <rect x="2" y="4" width="10" height="16" rx="2" fill="#E42528"/>
          <rect x="14" y="4" width="10" height="16" rx="2" fill="#226EB1"/>
          <rect x="26" y="4" width="10" height="16" rx="2" fill="#1DAE50"/>
          <rect x="38" y="4" width="8" height="16" rx="2" fill="#F8B124"/>
        </svg>
      )
    },
    {
      name: "OpenAI",
      icon: (
        <svg className="w-5 h-5 text-[#0F172A]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1636a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813v6.7227zm1.145-2.0583l2.5484-1.4674 2.5484 1.4674v2.935l-2.5484 1.4674-2.5484-1.4674z"/>
        </svg>
      )
    },
    {
      name: "Next.js",
      icon: (
        <svg className="w-5 h-5 text-[#0F172A]" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="11" fill="#0F172A"/>
          <path d="M15.5 8.5v7l-5.5-7v7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      name: "Google Cloud",
      icon: (
        <svg className="w-5 h-5 text-[#4285F4]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      )
    },
    {
      name: "AWS",
      icon: (
        <svg className="w-5 h-5 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.74 18.06c-2.48 1.84-6.09 2.82-9.2 2.82-4.36 0-8.29-1.63-11.26-4.36-.23-.21-.03-.5.25-.34 3.2 1.86 7.15 2.97 11.2 2.97 2.76 0 5.79-.64 8.52-1.98.42-.21.75.29.49.89zm1.18-1.5c-.32-.41-2.09-.2-2.88-.1-.24.03-.28-.18-.06-.33 1.45-1.02 3.82-.73 4.1.28.27 1.02-1.07 2.76-2.46 3.86-.21.17-.41.08-.31-.14.33-.76 1.93-3.16 1.61-3.57zM11.96 3C6.46 3 2 7.46 2 12.96c0 2.21.72 4.25 1.94 5.9.15.21.41.22.58.04l1.35-1.42c.16-.17.14-.44-.04-.61-1.03-1.12-1.65-2.61-1.65-4.24 0-3.66 2.97-6.63 6.63-6.63 3.66 0 6.63 2.97 6.63 6.63 0 1.62-.62 3.12-1.65 4.24-.18.17-.2.44-.04.61l1.35 1.42c.17.18.43.17.58-.04 1.22-1.65 1.94-3.69 1.94-5.9C21.92 7.46 17.46 3 11.96 3z" />
        </svg>
      )
    },
    {
      name: "Sarvam AI",
      icon: (
        <svg className="w-5 h-5 text-[#0F172A]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 2.8 3.7-.8 1.4 3.5 3.5 1.4-.8 3.7 2.8 2.4-2.8 2.4.8 3.7-3.5 1.4-1.4 3.5-3.7-.8L12 22l-2.4-2.8-3.7.8-1.4-3.5-3.5-1.4.8-3.7L-1 9l2.8-2.4-.8-3.7 3.5-1.4 1.4-3.5 3.7.8L12 2zm0 6a4 4 0 100 8 4 4 0 000-8z"/>
        </svg>
      )
    },
    {
      name: "ElevenLabs",
      icon: (
        <div className="flex items-center gap-1">
          <span className="w-1 h-5 bg-[#0F172A] rounded-full" />
          <span className="w-1 h-5 bg-[#0F172A] rounded-full" />
        </div>
      )
    },
    {
      name: "xAI",
      icon: (
        <svg className="w-5 h-5 text-[#0F172A]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: "Claude",
      icon: (
        <div className="w-5 h-5 rounded-md bg-[#D97757] text-white flex items-center justify-center font-bold text-xs">
          ✳
        </div>
      )
    }
  ];

  return (
    <div className="py-5 sm:py-6 border-t border-[#E2E8F0]/80 relative overflow-hidden bg-transparent flex flex-col items-center">
      <p className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#94A3B8] uppercase mb-3.5 sm:mb-4 text-center select-none">
        POWERED BY
      </p>
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee pauseOnHover className="[--duration:30s] [--gap:3.5rem]">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2.5 px-3 py-1 opacity-75 hover:opacity-100 transition-opacity duration-300 group cursor-default select-none"
            >
              <div className="flex-shrink-0 flex items-center justify-center">
                {partner.icon}
              </div>
              <span className="font-sans font-semibold text-sm sm:text-base text-[#334155] group-hover:text-[#0F172A] transition-colors tracking-tight whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default PoweredByMarquee;

