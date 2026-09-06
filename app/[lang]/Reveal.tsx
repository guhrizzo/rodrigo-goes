"use client";

import { useEffect } from "react";

export default function Reveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!els.length) return;
    const root = document.documentElement;
    const scroller = document.scrollingElement || root;

    const show = (el: Element) => el.classList.add("is-visible");
    const viewportH = () => scroller.clientHeight || window.innerHeight || 800;

    const sweep = () => {
      const limit = viewportH() * 0.9;
      for (const el of els) {
        if (el.classList.contains("is-visible")) continue;
        if (el.getBoundingClientRect().top < limit) show(el);
      }
    };

    // Reveal what's on screen now BEFORE enabling the gate (no load flash).
    sweep();

    // Forced on: Windows "adjust for best performance" also reports
    // prefers-reduced-motion: reduce, so we intentionally don't gate on it.
    // Effect stays gentle (fade + light blur, small movement).
    root.classList.add("reveal-on");

    let alive = false;

    // Primary: viewport intersection (scroll-container agnostic).
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            alive = true;
            show(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    for (const el of els) {
      if (!el.classList.contains("is-visible")) io.observe(el);
    }

    // Fallback: capturing scroll listener + geometry sweep.
    let raf = 0;
    const onScroll = () => {
      alive = true;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        sweep();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Safety net: if neither IO nor scroll ever signalled (odd embed / browser
    // mode), don't leave anything stuck hidden.
    const failsafe = window.setTimeout(() => {
      if (!alive) els.forEach(show);
    }, 3500);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      window.removeEventListener("scroll", onScroll, { capture: true } as EventListenerOptions);
      document.removeEventListener("scroll", onScroll, { capture: true } as EventListenerOptions);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
