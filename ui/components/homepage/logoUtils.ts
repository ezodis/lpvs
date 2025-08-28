export type LogoStyle = {
  size: string;
  position: string;
  scrolled: boolean;
};

export function getLogoStyle(slideIndex: number): LogoStyle {
  if (slideIndex === 0) {
    return {
      size: "scale-100", // full size
      position: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      scrolled: false,
    };
  }
  return {
    size: "scale-50", // small shrink scale
    position: "top-2 left-1/2 -translate-x-1/2 cursor-pointer",
    scrolled: true,
  };
}

export function updateLogo(
  slideIndex: number,
  setLogoStyle: (style: { size: string; position: string }) => void,
  setIsScrolled: (scrolled: boolean) => void
) {
  const style = getLogoStyle(slideIndex);
  setLogoStyle({ size: style.size, position: style.position });
  setIsScrolled(style.scrolled);
}

// Smooth update using requestAnimationFrame to avoid jank
let rafId: number;
export function updateLogoSmooth(
  slideIndex: number,
  setLogoStyle: (style: { size: string; position: string }) => void,
  setIsScrolled: (scrolled: boolean) => void
) {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    updateLogo(slideIndex, setLogoStyle, setIsScrolled);
  });
}
