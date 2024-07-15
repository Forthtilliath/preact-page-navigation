import { useEffect, useRef, useState } from "preact/hooks";
import { buildNavigationStructure, Item } from "../buildNavigationStructure";
import { useActiveItem } from "./useActiveItem";

export function useNavigation(dataAnchor = "data-anchor") {
  const [items, setItems] = useState<Item[]>([]);
  const [headings, setHeadings] = useState<HTMLElement[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const activeItem = useActiveItem(headings);

  useEffect(() => {
    if (!ref.current) return;

    setHeadings(
      Array.from(ref.current.querySelectorAll<HTMLElement>(`[${dataAnchor}]`))
    );
  }, []);

  useEffect(() => {
    setItems(buildNavigationStructure(headings));
  }, [headings]);

  return [ref, items, activeItem] as const;
}
