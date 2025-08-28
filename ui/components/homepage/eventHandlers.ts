export function createEventHandlers({
  isAnimatingRef,
  wheelDeltaRef,
  wheelTimeoutRef,
  go,
}: {
  isAnimatingRef: React.MutableRefObject<boolean>;
  wheelDeltaRef: React.MutableRefObject<number>;
  wheelTimeoutRef: React.MutableRefObject<number | null>;
  go: (direction: number) => void;
}) {
  const handleWheel = (ev: WheelEvent) => {
  ev.preventDefault();

  // If animating, ignore any scroll input and reset wheel delta accumulator
  if (isAnimatingRef.current) {
    wheelDeltaRef.current = 0;
    if (wheelTimeoutRef.current) {
      clearTimeout(wheelTimeoutRef.current);
      wheelTimeoutRef.current = null;
    }
    return;
  }

  wheelDeltaRef.current += ev.deltaY;

  if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);

  wheelTimeoutRef.current = window.setTimeout(() => {
    const accumulated = wheelDeltaRef.current;
    wheelDeltaRef.current = 0;
    wheelTimeoutRef.current = null;

    // Double-check animating state before proceeding
    if (isAnimatingRef.current) return;

    if (Math.abs(accumulated) < 50) return;

    isAnimatingRef.current = true;
    go(accumulated > 0 ? 1 : -1);
  }, 10);
};

  let touchStartY = 0;

  const handleTouchStart = (ev: TouchEvent) => {
    touchStartY = ev.touches[0].clientY;
  };

  const handleTouchEnd = (ev: TouchEvent) => {
    if (isAnimatingRef.current) return;

    const diff = touchStartY - ev.changedTouches[0].clientY;
    if (Math.abs(diff) < 50) return;

    isAnimatingRef.current = true;
    go(diff > 0 ? 1 : -1);
  };

  const handleKeyDown = (ev: KeyboardEvent) => {
    if (isAnimatingRef.current) return;

    if (["ArrowDown", "PageDown", "ArrowRight"].includes(ev.key)) {
      isAnimatingRef.current = true;
      go(1);
    } else if (["ArrowUp", "PageUp", "ArrowLeft"].includes(ev.key)) {
      isAnimatingRef.current = true;
      go(-1);
    }
  };

  return { handleWheel, handleTouchStart, handleTouchEnd, handleKeyDown };
}
