import { useEffect, useMemo, useState } from "preact/hooks";

const DATA_PROP = "data-anchor";

export function useActiveItem() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const itemIds = useMemo(() => {
    return Array.from(document.querySelectorAll(`[${DATA_PROP}]`)).map(
      (el) => el.id
    );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(entry)
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -80% 0%` }
    );

    itemIds?.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}
