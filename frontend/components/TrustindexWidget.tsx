"use client";

import { useEffect, useRef } from "react";

export default function TrustindexWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previously injected script when component remounts.
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://cdn.trustindex.io/loader.js?7b028e3697846848130630be7d1";
    script.async = true;
    script.defer = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div id="trustindex-widget-container" ref={containerRef} />;
}
