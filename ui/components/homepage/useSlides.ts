import { useEffect, useRef, useState } from "react";
import { getLogoStyle, updateLogo } from "./logoUtils";

export function useSlides(duration: number, ease: string) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoStyle, setLogoStyle] = useState(getLogoStyle(0));

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const slidesCountRef = useRef(0);

  const wheelDeltaRef = useRef(0);
  const wheelTimeoutRef = useRef<number | null>(null);

  const clamp = (v: number, lo: number, hi: number) =>
    Math.max(lo, Math.min(hi, v));

  const setInnerTransform = (
    el: HTMLDivElement | null,
    index: number,
    duration: number,
    ease: string,
    animate = true
  ) => {
    if (!el) return;
    const y = index * window.innerHeight;
    el.style.transition = animate ? `transform ${duration}ms ${ease}` : "none";
    el.style.transform = `translateY(-${y}px)`;
  };

  const animateToIndex = (index: number, animate = true) => {
    return new Promise<void>((resolve) => {
      const el = innerRef.current;
      if (!el) return resolve();

      const prevIndex = currentIndexRef.current;
      currentIndexRef.current = index;
      setCurrentIndex(index);

      // Immediate shrink when leaving first slide
      if (prevIndex === 0 && index !== 0) {
        const style = getLogoStyle(index);
        setLogoStyle({ size: style.size, position: style.position });
        setIsScrolled(true);
      }

            // Expand halfway when returning to first slide
            if (prevIndex !== 0 && index === 0) {
              setTimeout(
                () => updateLogo(index, setLogoStyle, setIsScrolled),
                duration / 2
              );
            }

            setInnerTransform(el, index, duration, ease, animate);

            if (!animate) {
              updateLogo(index, setLogoStyle, setIsScrolled);
              return resolve();
            }

            let finished = false;
            const onEnd = (ev: TransitionEvent) => {
              if (ev.propertyName !== "transform") return;
              if (finished) return;
              finished = true;
              el.removeEventListener("transitionend", onEnd as any);
              updateLogo(index, setLogoStyle, setIsScrolled);
              resolve();
            };
            el.addEventListener("transitionend", onEnd as any);

            // Fallback timeout in case transitionend doesn't fire
            window.setTimeout(() => {
              if (!finished) {
                finished = true;
                el.removeEventListener("transitionend", onEnd as any);
                updateLogo(index, setLogoStyle, setIsScrolled);
                resolve();
              }
            }, duration + 120);
          });
        };

        const scrollToIndex = (index: number) => {
          const next = clamp(index, 0, slidesCountRef.current - 1);
          if (isAnimatingRef.current || next === currentIndexRef.current) return;
          isAnimatingRef.current = true;
          animateToIndex(next, true).then(() => (isAnimatingRef.current = false));
        };

        const scrollToFirstSlide = () => scrollToIndex(0);

        useEffect(() => {
          const slides = containerRef.current?.querySelectorAll(".slide");
          slidesCountRef.current = slides?.length || 0;
          currentIndexRef.current = 0;
          setInnerTransform(innerRef.current, 0, duration, ease, false);
          updateLogo(0, setLogoStyle, setIsScrolled);
        }, [duration, ease]);

        useEffect(() => {
          const onResize = () => {
            updateLogo(currentIndexRef.current, setLogoStyle, setIsScrolled);
            setInnerTransform(
              innerRef.current,
              currentIndexRef.current,
              duration,
              ease,
              false
            );
          };
          window.addEventListener("resize", onResize);
          return () => window.removeEventListener("resize", onResize);
        }, [duration, ease]);

        return {
          isScrolled,
          logoStyle,
          containerRef,
          innerRef,
          scrollToIndex,
          scrollToFirstSlide,
          isAnimatingRef,
          currentIndexRef,
          slidesCountRef,
          wheelDeltaRef,
          wheelTimeoutRef,
          animateToIndex,
          clamp,
        };
      }
      