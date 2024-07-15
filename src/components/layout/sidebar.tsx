import { tv } from "tailwind-variants";
import { useActiveItem } from "@/lib/hooks/useActiveItem";
import { Item } from "@/lib/buildNavigationStructure";

type Props = {
  items: Item[];
};

export function Sidebar({ items }: Props) {
  const activeHeading = useActiveItem(items);

  return (
    <aside
      class="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12"
      aria-label="Sidebar"
    >
      <div class="space-y-2">
        <p class="font-medium">On This Page</p>

        <Navigation items={items} level={1} active={activeHeading} />
      </div>
    </aside>
  );
}

const navigation = tv({
  base: "m-0 list-none",
  variants: {
    level: {
      1: "pl-0",
      2: "pl-4",
      3: "pl-4",
      4: "pl-4",
      5: "pl-4",
    },
  },
  defaultVariants: {
    level: 1,
  },
});
const link = tv({
  base: "inline-block no-underline transition-colors hover:text-foreground font-normal text-muted-foreground",
  variants: {
    active: {
      true: "font-medium text-foreground",
    },
  },
  defaultVariants: {
    active: false,
  },
});

type NavigationProps = {
  items: Item[];
  level: keyof typeof navigation.variants.level;
  active: string | null;
};
function Navigation({ items, level, active }: NavigationProps) {
  return (
    <ul class={navigation({ level })}>
      {items.map((item) => (
        <li class="mt-0 pt-2">
          <a
            href={item.href}
            class={link({ active: item.href.split("#")[1] === active })}
          >
            {item.name}
            {item.items && (
              <Navigation
                items={item.items}
                level={nextLevel(level)}
                active={active}
              />
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}

function nextLevel(level: number) {
  const nextLevel = level + 1;
  assertsIsValidLevel(nextLevel);
  return nextLevel;
}

function assertsIsValidLevel(
  level: number
): asserts level is NavigationProps["level"] {
  if (level < 1 || level > 5) {
    throw new Error("Invalid level");
  }
}
