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

function assertFirstElementIsH2(element: HTMLElement): void {
  if (element.tagName !== "H2") {
    throw new Error(`The first element must be an H2`);
  }
}

/**
 * Builds the navigation structure based on the headings in the document.
 *
 * @return {Item[]} An array of items representing the navigation structure.
 */
export function buildNavigationStructure(): Item[] {
  const headings = document.querySelectorAll<HTMLElement>(`[${DATA_PROP}]`);
  if (!headings) return [];
  
  assertFirstElementIsH2(headings[0]);

  const navItems: Item[] = [];
  let prevLevel: number = 0;
  const parentItems: Item[] = [];

  for (const heading of headings) {
    const currLevel = getHeadingNumber(heading);

    const currItem: Item = {
      name: heading.textContent || "",
      href: `#${heading.id}`,
      items: [],
    };

    // main level
    if (currLevel === 2) {
      parentItems.splice(currLevel + 1);
      navItems.push(currItem);
      prevLevel = currLevel;
      parentItems[currLevel] = currItem;
      continue;
    }

    // new parent
    if (currLevel < prevLevel) {
      parentItems.splice(currLevel + 1);
      const parentIndex = parentItems.findLastIndex(
        (_, idx) => idx < currLevel
      );
      parentItems[parentIndex].items.push(currItem);
      prevLevel = currLevel;
      parentItems[currLevel] = currItem;
      continue;
    }

    // same level
    if (currLevel === prevLevel) {
      parentItems.splice(currLevel);
    }

    // new child
    const parentIndex = parentItems.findLastIndex((el) => el);
    parentItems[parentIndex].items.push(currItem);
    prevLevel = currLevel;
    parentItems[currLevel] = currItem;
  }

  return navItems;
}
