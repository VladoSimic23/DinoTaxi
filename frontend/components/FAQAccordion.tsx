"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({ faq }: { faq: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faq.map((item: FAQItem, index: number) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen
                ? "bg-neutral-800/80 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
                : "bg-neutral-900/50 border-white/5 hover:border-white/10 hover:bg-neutral-800/50"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between px-0 sm:px-6 py-4 sm:py-6 text-left focus:outline-none group"
              aria-expanded={isOpen}
            >
              <h3
                className={`text-lg sm:text-xl font-bold pr-8 transition-colors ${isOpen ? "text-white" : "text-neutral-200 group-hover:text-white"}`}
              >
                {item.question}
              </h3>
              <div
                className={`p-2 rounded-full transition-colors ${isOpen ? "bg-yellow-500/10" : "bg-white/5 group-hover:bg-white/10"}`}
              >
                <ChevronDown
                  className={`text-yellow-500 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  size={20}
                />
              </div>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-6 pt-0 text-neutral-400 leading-relaxed border-t border-white/5 mt-2">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
