export type Item = {
  name: string;
  href: string;
  items?: Item[];
};

export const nav = [
  {
    name: "Installation",
    href: "#installation",
  },
  {
    name: "Usage",
    href: "#usage",
    items: [{ name: "Link", href: "#link" }],
  },
  {
    name: "Examples",
    href: "#examples",
    items: [
      { name: "Default", href: "#default" },
      { name: "Secondary", href: "#secondary" },
      { name: "Outline", href: "#outline" },
      { name: "Destructive", href: "#destructive" },
    ],
  },
] satisfies Item[];
