import { useEffect, useState } from "react";

// Fallbacks match the values you add to globals.css.
// They only apply during SSR when window is unavailable.
const FALLBACK_BLUE = "#1d62e8";
const FALLBACK_GREEN = "#22c55e";

export function useChartColors() {
  const [chartBlue, setChartBlue] = useState(FALLBACK_BLUE);
  const [chartGreen, setChartGreen] = useState(FALLBACK_GREEN);

  useEffect(() => {
    const s = getComputedStyle(document.documentElement);
    const blue = s.getPropertyValue("--chart-blue").trim();
    const green = s.getPropertyValue("--chart-green").trim();
    if (blue) setChartBlue(blue);
    if (green) setChartGreen(green);
  }, []);

  return { chartBlue, chartGreen };
}
