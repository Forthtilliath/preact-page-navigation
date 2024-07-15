import { useEffect, useRef, useState } from "preact/hooks";
import { buildNavigationStructure, Item } from "../buildNavigationStructure";
import { DATA_PROP, useActiveItem } from "./useActiveItem";

export function useNavigation() {
  const [nav, setNav] = useState<Item[]>([]);
  const [headings, setHeadings] = useState<HTMLElement[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const active = useActiveItem(headings);

  useEffect(() => {
    if (!ref.current) return;

    setHeadings(
      Array.from(ref.current.querySelectorAll<HTMLElement>(`[${DATA_PROP}]`))
    );
  }, []);

  useEffect(() => {
    setNav(buildNavigationStructure(headings));
  }, [headings]);

  return [ref, nav, active] as const;
}
