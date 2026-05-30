import { useEffect, useState } from "react";

// Generic debounce hook — delays updating the returned value until
// the input has stopped changing for `delay` milliseconds.
// Used to avoid firing an API call on every keystroke in text inputs.

export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
