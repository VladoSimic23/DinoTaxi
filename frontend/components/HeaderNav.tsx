"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

type HeaderNavProps = {
  phoneHref: string;
  phoneDisplay: string;
  whatsappUrl: string;
};

export default function HeaderNav({
  phoneHref,
  phoneDisplay,
  whatsappUrl,
}: HeaderNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="flex items-center gap-4" ref={menuRef}>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-yellow-500 transition-colors"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-controls="header-dropdown-menu"
        >
          Menu
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div
            id="header-dropdown-menu"
            role="menu"
            className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-md p-2 shadow-xl"
          >
            <Link
              href="/services"
              role="menuitem"
              className="block rounded-xl px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <a
              href={phoneHref}
              role="menuitem"
              className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <Phone size={16} />
              {phoneDisplay}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              role="menuitem"
              className="mt-1 flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-3 text-sm font-bold text-black hover:bg-yellow-400"
              onClick={() => setIsOpen(false)}
            >
              <MessageCircle size={16} />
              Book Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
