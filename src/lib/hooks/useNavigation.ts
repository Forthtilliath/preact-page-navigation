import { useEffect, useRef, useState } from "preact/hooks";
import { buildNavigationStructure, Item } from "../buildNavigationStructure";

export function useNavigation() {
  const [nav, setNav] = useState<Item[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    setNav(buildNavigationStructure(ref.current));
  }, []);

  return [ref, nav] as const;
}
