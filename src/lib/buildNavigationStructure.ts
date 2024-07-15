// TODO: Make first heading dynamic
// - instead of ``assertFirstElementIsH2``, get the number
// - use the number to replace the 2 here ``if (currLevel === 2)``

export type Item = {
  /** Display name of the item */
  name: string;
  /** Link to the anchor */
  href: string;
  /** Children items */
  items: Item[];
};

/**
 * Builds the navigation structure based on the headings in the document.
 *
 * @param {HTMLElement[]} headings - An array of HTML elements representing headings.
 * @return {Item[]} An array of items representing the navigation structure.
 */
export function buildNavigationStructure(headings: HTMLElement[]): Item[] {
  if (headings.length === 0) return [];
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

/**
 * Get the heading number from the provided HTML element.
 *
 * @param {HTMLElement} element - The HTML element to extract the heading number from.
 * @return {number} The extracted heading number.
 */
function getHeadingNumber(element: HTMLElement): number {
  const match = element.tagName.match(/^h([23456])$/i);
  if (!match) {
    throw new Error(`Invalid heading tag: ${element.tagName}`);
  }
  return parseInt(match[1], 10);
}

/**
 * Asserts that the first element is an H2.
 *
 * @param {HTMLElement} element - The HTML element to check.
 * @returns {void}
 */
function assertFirstElementIsH2(element: HTMLElement): void {
  if (element.tagName !== "H2") {
    throw new Error(`The first element must be an H2`);
  }
}
