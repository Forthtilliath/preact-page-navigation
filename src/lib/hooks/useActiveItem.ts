import { useEffect, useState } from "preact/hooks";
import { Item } from "../buildNavigationStructure";

export const DATA_PROP = "data-anchor";

export function useActiveItem(items: Item[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const elements = document.querySelectorAll(`[${DATA_PROP}]`);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    },
    { rootMargin: `0% 0% -80% 0%` }
  );

  useEffect(() => {
    for (const el of elements) {
      observer.observe(el);
    }

    return () => {
      for (const el of elements) {
        observer.unobserve(el);
      }
    };
  }, []);

  return activeId;
}
