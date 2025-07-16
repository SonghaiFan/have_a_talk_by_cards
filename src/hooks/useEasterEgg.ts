import { useState, useEffect, useCallback } from "react";

interface UseEasterEggOptions {
  clickCount: number; // Number of clicks needed to trigger
  timeWindow: number; // Time window in milliseconds
  onUnlock?: () => void; // Callback when successfully unlocked
}

export const useEasterEgg = ({
  clickCount = 4,
  timeWindow = 2000,
  onUnlock,
}: UseEasterEggOptions) => {
  const [clicks, setClicks] = useState<number[]>([]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Handle new click
  const handleClick = useCallback(() => {
    const currentTime = Date.now();
    setClicks((prevClicks) => {
      const newClicks = [...prevClicks, currentTime];
      return newClicks.filter(
        (clickTime) => currentTime - clickTime < timeWindow
      );
    });
  }, [timeWindow]);

  // Check for unlock condition
  useEffect(() => {
    if (clicks.length >= clickCount && !isUnlocked) {
      setIsUnlocked(true);
      onUnlock?.();

      // Optional: Store unlock state in localStorage
      localStorage.setItem("premiumUnlocked", "true");
    }
  }, [clicks, clickCount, isUnlocked, onUnlock]);

  // Initialize unlock state from localStorage
  useEffect(() => {
    const storedUnlock = localStorage.getItem("premiumUnlocked");
    if (storedUnlock === "true") {
      setIsUnlocked(true);
    }
  }, []);

  return {
    handleClick,
    isUnlocked,
    clickProgress: clicks.length / clickCount, // For visual feedback
  };
};
