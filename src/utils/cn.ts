export const cn = (
  ...classnames: (string | undefined | null | false)[]
): string => {
  return classnames.filter(Boolean).join(" ");
};
