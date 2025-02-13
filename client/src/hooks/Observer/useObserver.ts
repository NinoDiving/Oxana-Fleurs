import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (
  options: IntersectionObserverInit = {},
  threshold = 0.5,
) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        ...options,
        threshold,
      },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options, threshold]);

  return { isVisible, elementRef };
};

export default useIntersectionObserver;
