import type { ComponentChildren } from "preact";

type Props = {
  children?: ComponentChildren;
};

export function H4({ children }: Props) {
  if (!children) return null;

  const id = children.toString().replace(/\s+/g, "-").toLowerCase();

  return (
    <h4 class="mt-8 mb-6 scroll-m-20 text-lg font-semibold tracking-tight" id={id} data-anchor>
      {children}
    </h4>
  );
}
