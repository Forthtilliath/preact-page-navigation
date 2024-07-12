type Props = React.PropsWithChildren<{}>;

export function H2({ children }: Props) {
  if (!children) return null;

  const id = children.toString().replace(/\s+/g, "-").toLowerCase();

  return (
    <h2
      className="my-4font-heading mt-12 mb-6 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
      id={id}
      data-anchor
    >
      {children}
    </h2>
  );
}
