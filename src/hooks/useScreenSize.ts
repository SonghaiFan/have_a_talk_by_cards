import { useState, useEffect } from "react";

interface ScreenSize {
  width: number;
  height: number;
  isMinimumSizeMet: boolean;
}

// Minimum screen size requirements
const MIN_WIDTH = 360;
const MIN_HEIGHT = 640;

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return {
      width,
      height,
      isMinimumSizeMet: width >= MIN_WIDTH && height >= MIN_HEIGHT,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({
        width,
        height,
        isMinimumSizeMet: width >= MIN_WIDTH && height >= MIN_HEIGHT,
      });
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Add orientation change listener for mobile devices
    window.addEventListener("orientationchange", () => {
      // Small delay to ensure dimensions are updated after orientation change
      setTimeout(handleResize, 100);
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return screenSize;
};
