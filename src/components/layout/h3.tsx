type Props = React.PropsWithChildren<{}>;

export function H3({ children }: Props) {
  if (!children) return null;

  const id = children.toString().replace(/\s+/g, "-").toLowerCase();

  return (
    <h3 className="mt-8 mb-6 scroll-m-20 text-xl font-semibold tracking-tight" id={id} data-anchor>
      {children}
    </h3>
  );
}
