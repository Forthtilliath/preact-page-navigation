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
  let parentItems: Item[] = [];

  for (const heading of headings) {
    const currLevel = getHeadingNumber(heading);

    const currItem: Item = {
      name: heading.textContent || "",
      href: `#${heading.id}`,
      items: [],
    };

    // new parent : first element
    if (parentItems.length === 0) {
      parentItems.push(currItem);
      navItems.push(currItem);
      prevLevel = currLevel;
      continue;
    }

    // new parent
    if (currLevel === 2 || currLevel < prevLevel) {
      const diffLevel = prevLevel - currLevel + 1;
      parentItems.splice(diffLevel * -1, diffLevel, currItem);
      navItems.push(currItem);
      prevLevel = currLevel;
      continue;
    }

    // same level
    if (currLevel === prevLevel) {
      parentItems.pop();
    }

    // new child
    const lastParent = parentItems[parentItems.length - 1];
    lastParent.items.push(currItem);
    parentItems.push(currItem);
    prevLevel = currLevel;
  }

  return navItems;
}
