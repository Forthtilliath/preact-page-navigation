import { useEffect, useRef, useState } from "preact/hooks";
import { buildNavigationStructure, Item } from "../buildNavigationStructure";
import { useActiveItem } from "./useActiveItem";

export const DATA_PROP = "data-anchor";

export function useNavigation(dataAnchor = DATA_PROP) {
  const [nav, setNav] = useState<Item[]>([]);
  const [headings, setHeadings] = useState<HTMLElement[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const active = useActiveItem(headings);

  useEffect(() => {
    if (!ref.current) return;

    setHeadings(
      Array.from(ref.current.querySelectorAll<HTMLElement>(`[${dataAnchor}]`))
    );
  }, []);

  useEffect(() => {
    setNav(buildNavigationStructure(headings));
  }, [headings]);

  return [ref, nav, active] as const;
}
