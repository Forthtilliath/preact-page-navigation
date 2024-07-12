import { DATA_PROP } from "./hooks/useActiveItem";

export type Item = {
  name: string;
  href: string;
  items: Item[];
};

function getHeadingNumber(element: HTMLElement): number {
  const match = element.tagName.match(/^h([23456])$/i);
  if (!match) {
    throw new Error(`Invalid heading tag: ${element.tagName}`);
  }
  return parseInt(match[1], 10);
}

export function buildNavigationStructure(): Item[] {
  const headings = document.querySelectorAll<HTMLElement>(`[${DATA_PROP}]`);
  const navItems: Item[] = [];
  let prevLevel: number = 0;
  const aParentItems: Item[] = [];

  for (const heading of headings) {
    const currLevel = getHeadingNumber(heading);

    const currItem: Item = {
      name: heading.textContent || "",
      href: `#${heading.id}`,
      items: [],
    };

    // new parent : first element
    if (aParentItems.length === 0) {
      navItems.push(currItem);
      prevLevel = currLevel;
      aParentItems[currLevel] = currItem;
      continue;
    }

    // main level
    if (currLevel === 2) {
      aParentItems.splice(currLevel + 1);
      navItems.push(currItem);
      prevLevel = currLevel;
      aParentItems[currLevel] = currItem;
      continue;
    }

    // new parent
    if (currLevel < prevLevel) {
      aParentItems.splice(currLevel + 1);
      const parentIndex = aParentItems.findLastIndex(
        (_, idx) => idx < currLevel
      );
      aParentItems[parentIndex].items.push(currItem);
      prevLevel = currLevel;
      aParentItems[currLevel] = currItem;
      continue;
    }

    // same level
    if (currLevel === prevLevel) {
      aParentItems.splice(currLevel);
    }

    // new child
    const parentIndex = aParentItems.findLastIndex((el) => el);
    aParentItems[parentIndex].items.push(currItem);
    prevLevel = currLevel;
    aParentItems[currLevel] = currItem;
  }

  return navItems;
}
