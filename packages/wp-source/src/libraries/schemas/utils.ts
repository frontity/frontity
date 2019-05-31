export const removeDomain = (link: string) => {
  try {
    const { pathname, search, hash } = new URL(link);
    return `${pathname}${search}${hash}`;
  } catch (e) {
    return "";
  }
};
