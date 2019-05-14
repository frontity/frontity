export default (pathOrLink: string): string => {
  try {
    return new URL(pathOrLink).pathname;
  } catch (e) {
    // is not a URL
    return pathOrLink;
  }
};