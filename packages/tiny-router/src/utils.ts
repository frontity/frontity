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

  const path = (/^(.*)\/page\//.exec(fullPath) || [null, fullPath])[1];
  const page = parseInt(
    (/\/page\/(\d+)\/?$/.exec(fullPath) || [null, "1"])[1],
    10
  );

  return { path, page };
};
