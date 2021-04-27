import { isArchive, isRedirection } from "@frontity/source";
import Source from "@frontity/source/types";
import { State } from "frontity/types";

/**
 * Arguments passed to {@link getLinksFromPages}.
 */
type GetLinksFromPagesParams = {
  /**
   * List of links pointing to archive pages.
   *
   * @example ["/blog/", "/blog/page/2/", "/blog/page/3/"]
   */
  pages: string[];

  /**
   * The first link showed by the infinite scroll hook. If the link is not
   * included in the first page, it is returned the first one, in order to show
   * recent links after it.
   *
   * @example "/blog/some-post/"
   */
  firstLink: string;

  /**
   * The `state.source.get` state from Source.
   */
  sourceGet: State<Source>["source"]["get"];
};

/**
 * Get pathname of a link.
 *
 * @param link - The link.
 * @returns A pathname.
 */
const getPathname = (link: string) =>
  new URL(link.replace(/\/?$/, "/"), "https://example.com").pathname;

/**
 * Extension of the regular Set object implementing an addLink method.
 */
class LinkSet extends Set<string> {
  /**
   * Add a link to the set.
   *
   * Does a brute force O(n) search of all links in the set comparing them by
   * pathname before adding the new link.
   *
   * @param link - The string.
   * @returns - The string.
   */
  addLink(link: string) {
    if (![...this].some((item) => getPathname(item) === getPathname(link))) {
      this.add(link);
    }

    return this;
  }
}

/**
 * Get all the item links from the given pages, removing redirections and
 * duplicated ones.
 *
 * @param params - Object of type {@link GetLinksFromPagesParams}.
 * @returns List of item links.
 */
export const getLinksFromPages = ({
  pages,
  firstLink,
  sourceGet,
}: GetLinksFromPagesParams): string[] => {
  // Get the data object of all ready pages.
  const pagesData = pages
    .map((link) => sourceGet(link))
    .filter((data) => data.isReady)
    .filter(isArchive);

  // Initializes an empty set of links.
  const rawLinks = new LinkSet();

  // If the first page doesn't contain `firstLink`, add it first.
  if (!pagesData[0]?.items.find(({ link }) => link === firstLink))
    rawLinks.addLink(firstLink);

  // Get all the post links from the pages. As `rawLinks` is a `Set`, any
  // duplicated link is not included. Also, the insertion order is preserved.
  pagesData.forEach((data) => {
    data.items.forEach(({ link }) => rawLinks.addLink(link));
  });

  // Remove links that point to redirections.
  return [...rawLinks].filter((link) => !isRedirection(sourceGet(link)));
};
