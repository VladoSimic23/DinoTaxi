"use client";

import { useEffect, useRef, useState } from "react";

export default function TrustindexWidget() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isNearViewport) return;

    const container = containerRef.current;
    if (!container) return;

    // Clear previously injected script when component remounts.
    container.innerHTML = "";

    const injectScript = () => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.trustindex.io/loader.js?7b028e3697846848130630be7d1";
      script.async = true;
      script.defer = true;
      container.appendChild(script);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(() => injectScript(), {
        timeout: 2000,
      });
      return () => {
        window.cancelIdleCallback(idleId);
        container.innerHTML = "";
      };
    }

    injectScript();

    return () => {
      container.innerHTML = "";
    };
  }, [isNearViewport]);

  return <div id="trustindex-widget-container" ref={containerRef} />;
}
