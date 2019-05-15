export const parsePath = (
  pathOrLink: string
): { path: string; page: number } => {
  let fullPath: string;

  try {
    // Try if it's a URL.
    fullPath = new URL(pathOrLink).pathname;
  } catch (e) {
    // It's already a path.
    fullPath = pathOrLink;
  }

  const [, path, page] = /^(.*)page\/(\d+)\/?$/.exec(fullPath) || [
    null,
    fullPath,
    "1"
  ];

  return { path, page: parseInt(page, 10) };
};
