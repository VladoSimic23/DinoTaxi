"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Briefcase,
  Check,
} from "lucide-react";
import Image from "next/image";

export interface Vehicle {
  name: string;
  type?: string;
  passengers: number;
  luggage: number;
  features?: string[];
  description?: string;
  gallery?: { url: string }[];
}

export default function VehicleSection({
  vehicle,
  index = 0,
}: {
  vehicle: Vehicle;
  index?: number;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  // Effect to subscribe to Embla events
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Initial call after bindings to ensure correct state natively
    // We defer the execution to avoid sync state updates during render
    requestAnimationFrame(() => onSelect());
  }, [emblaApi, onSelect]);

  if (!vehicle) return null;

  return (
    <section
      className={`bg-neutral-900 text-white ${index === 0 ? "pt-[86px] pb-[38px] lg:pt-24 lg:pb-12" : "py-[38px] lg:py-12"}`}
      id={index === 0 ? "vehicle" : undefined}
    >
      <div className="max-w-7xl mx-auto px-6">
        {index === 0 && (
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Ride in Comfort
            </h2>
            <p className="text-neutral-400 text-lg">
              Experience our premium selected vehicle for your transfers.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Gallery Carousel */}
          {vehicle.gallery && vehicle.gallery.length > 0 && (
            <div
              className={`relative group ${index % 2 !== 0 ? "order-1 lg:order-2" : ""}`}
            >
              <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
                <div className="flex">
                  {vehicle.gallery.map((img: { url: string }, idx: number) => (
                    <div
                      className="relative flex-[0_0_100%] min-w-0 h-[300px] sm:h-[400px] lg:h-[500px]"
                      key={idx}
                    >
                      <Image
                        src={img.url}
                        alt={`${vehicle.name} - image ${idx + 1}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Buttons */}
              {vehicle.gallery.length > 1 && (
                <>
                  <button
                    onClick={scrollPrev}
                    aria-label="Prethodna slika"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={scrollNext}
                    aria-label="Sljedeća slika"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {vehicle.gallery.map((_: unknown, idx: number) => (
                      <div
                        key={idx}
                        className={`transition-all duration-300 rounded-full ${idx === selectedIndex ? "w-6 h-2 bg-yellow-500" : "w-2 h-2 bg-white/50"}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Vehicle Info */}
          <div className={index % 2 !== 0 ? "order-2 lg:order-1" : ""}>
            <div className="inline-block px-4 py-1.5 rounded-full bg-neutral-800 text-yellow-500 text-sm font-semibold mb-4 border border-white/10">
              {vehicle.type || "Premium Vehicle"}
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              {vehicle.name}
            </h3>

            {vehicle.description && (
              <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                {vehicle.description}
              </p>
            )}

            <div className="flex gap-6 mb-8 pb-8 border-b border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-neutral-400 text-sm uppercase tracking-wider font-bold">
                  Passengers
                </span>
                <div className="flex items-center gap-2 text-xl font-medium">
                  <Users className="text-yellow-500" />
                  Up to {vehicle.passengers}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-neutral-400 text-sm uppercase tracking-wider font-bold">
                  Luggage
                </span>
                <div className="flex items-center gap-2 text-xl font-medium">
                  <Briefcase className="text-yellow-500" />
                  {vehicle.luggage} Bags
                </div>
              </div>
            </div>

            {vehicle.features && vehicle.features.length > 0 && (
              <div>
                <h3 className="text-lg font-bold mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-2 gap-4">
                  {vehicle.features.map((feature: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-neutral-300"
                    >
                      <Check size={18} className="text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
