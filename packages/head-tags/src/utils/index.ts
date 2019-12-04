import { URL } from "frontity";
import { HeadTags, State } from "../../types";

type UseFrontityLinks = (args: {
  state: State;
  headTags: HeadTags;
}) => HeadTags;

// Attributes that could contain links.
const possibleLink = ["href", "content"];

// Test if a path is not from a blog link.
const isInvalid = /^\/wp-(json|admin|content)/;

const getUrlPathname = (url: URL, apiUrl: URL, isWpCom: boolean): string => {
  // Get API subdirectory.
  const apiSubdir = isWpCom
    ? ""
    : apiUrl.pathname.replace(/\/wp-json\/?$/, "/");

  // Remove the API subdirectory.
  let { pathname } = url;
  if (apiSubdir && pathname.startsWith(apiSubdir))
    pathname = pathname.replace(apiSubdir, "/");

  // Throw an error (to be captured by `useFrontityLinks`).
  if (isInvalid.test(pathname)) throw new Error("Invalid pathname");

  // Return the final path.
  return pathname === "/" ? "" : pathname;
};

export const useFrontityLinks: UseFrontityLinks = ({ state, headTags }) => {
  // The site URL.
  const frontityUrl = state.frontity.url.replace(/\/?$/, "");

  // The API URL.
  const apiUrl = new URL(state.source.api);
  const { isWpCom } = state.source;

  // For each head tag...
  return headTags.map(({ tag, attributes, content }) => {
    // Compute new attributes changing URLs.
    const newAttributes = Object.entries(attributes).reduce(
      (result, [key, value]) => {
        if (possibleLink.includes(key)) {
          try {
            // Transform value into a URL (if possible).
            const url = new URL(value);

            // Get the path of this URL (THROWS AN ERROR IF IS NOT A VALID ONE).
            const pathname = getUrlPathname(url, apiUrl, isWpCom);

            // Set Frontity URL.
            const { search, hash } = url;
            result[key] = `${frontityUrl}${pathname}${search}${hash}`;
          } catch (e) {
            // Don't change the value.
            result[key] = value;
          }
        }
        return result;
      },
      {}
    );

    // Replace attributes.
    return { tag, attributes: newAttributes, content };
  });
};
