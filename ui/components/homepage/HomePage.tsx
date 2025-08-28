"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Header from "./Header";
import DonationForm from "./DonationForm";
import { useSlides } from "./useSlides";
import { createEventHandlers } from "./eventHandlers";

export default function HomePage() {
  const DURATION = 500;
  const EASE = "cubic-bezier(0.65,0,0.35,1)";

  const {
    isScrolled,
    containerRef,
    innerRef,
    scrollToIndex,
    scrollToFirstSlide,
    isAnimatingRef,
    wheelDeltaRef,
    wheelTimeoutRef,
    currentIndexRef,
    slidesCountRef,
    animateToIndex,
    clamp,
  } = useSlides(DURATION, EASE);

  const logoWrapperRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [logoTransform, setLogoTransform] = useState(
    "translate(-50%, -50%) scale(1)"
  );

  // Responsive base scale based on viewport width
  const getResponsiveBaseScale = () => {
    const width = window.innerWidth;
    if (width < 640) return 0.5;
    if (width < 1024) return 0.7;
    return 0.9;
  };

  const computeTransform = (scrolled: boolean) => {
    const wrapper = logoWrapperRef.current;
    if (!wrapper) return;

    const logoRect = wrapper.getBoundingClientRect();
    const logoHeight = logoRect.height;
    const viewportCenterY = window.innerHeight / 2;

    const headerEl = document.querySelector("header");
    const targetCenterY = headerEl
      ? headerEl.getBoundingClientRect().top + headerEl.offsetHeight / 2
      : 16 + logoHeight / 2;

    const deltaY = targetCenterY - viewportCenterY;
    const baseScale = getResponsiveBaseScale();
    const scrolledScaleFactor = 0.25;
    const targetScale = scrolled ? baseScale * scrolledScaleFactor : baseScale;

    // translateY in % + px calc when scrolled, else center
    const translateY = scrolled ? `calc(-50% + ${deltaY}px)` : "-50%";

    setLogoTransform(`translate(-50%, ${translateY}) scale(${targetScale})`);
  };

  // Update transform on resize or isScrolled change (debounced via RAF)
  useEffect(() => {
    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => computeTransform(isScrolled));
    };
    onResize();

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isScrolled]);

  // Event handlers for wheel, touch, keyboard navigation
  useEffect(() => {
    const totalSlides = () => slidesCountRef.current || 0;

    const go = (dir: number) => {
      const total = totalSlides();
      const next = clamp(currentIndexRef.current + dir, 0, total - 1);
      if (next === currentIndexRef.current) {
        isAnimatingRef.current = false;
        return;
      }
      animateToIndex(next, true).then(() => (isAnimatingRef.current = false));
    };

    const { handleWheel, handleTouchStart, handleTouchEnd, handleKeyDown } =
      createEventHandlers({
        isAnimatingRef,
        wheelDeltaRef,
        wheelTimeoutRef,
        go,
      });

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, []);

  // Recompute transform immediately when isScrolled changes
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => computeTransform(isScrolled));
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isScrolled]);

  return (
    <div>
      <Header
        isScrolled={isScrolled}
        scrollToSlide={scrollToIndex}
        scrollToFirstSlide={scrollToFirstSlide}
      />

      <div
        ref={logoWrapperRef}
        className="fixed left-1/2 z-50"
        style={{
          top: "50%",
          transform: logoTransform,
          transition: `transform ${DURATION}ms ${EASE}`,
          willChange: "transform",
          cursor: isScrolled ? "pointer" : "default",
          pointerEvents: isScrolled ? "auto" : "none",
        }}
        onClick={isScrolled ? scrollToFirstSlide : undefined}
        aria-hidden={false}
      >
        <Image
          src="/logo.png"
          alt="Logo"
          priority
          placeholder="blur"
          blurDataURL="/logo-small-blur.png"
          width={192}
          height={192}
          style={{ display: "block", transformOrigin: "center center" }}
        />
      </div>

      <div ref={containerRef} style={{ height: "100vh", overflow: "hidden" }}>
        <div ref={innerRef} style={{ display: "flex", flexDirection: "column" }}>
          <section className="slide h-screen flex flex-col justify-between items-center text-center relative">
            <h1 className="text-5xl font-bold mt-16">Luchando Por Vivir Y Servir</h1>
            <p className="text-lg mb-16">Tu donación puede hacer la diferencia.</p>
          </section>

          <section className="slide h-screen flex justify-center items-center text-center p-5">
            <div>
              <h2 className="text-2xl mb-2">Que senos haga costumbre</h2>
              <p className="text-lg">Un mensaje poderoso para la concientización.</p>
            </div>
          </section>

          <section className="slide h-screen flex justify-center items-center text-center p-5">
            <div>
              <h2 className="text-2xl mb-2">Conócenos</h2>
              <p className="text-lg">Descubre más sobre nuestra misión y valores.</p>
            </div>
          </section>

          <section className="slide h-screen flex justify-center items-center">
            <DonationForm />
          </section>
        </div>
      </div>
    </div>
  );
}
