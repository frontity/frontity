import { getLinksFromPages } from "../utils";

describe("getLinksFromPages", () => {
  const sourceGet = jest.fn();
  beforeEach(() => {
    sourceGet.mockReset();
  });

  it("should work with no links", () => {
    const pages = ["/"];
    const firstLink = "/post-1";
    sourceGet
      .mockReturnValueOnce({
        isArchive: true,
        isReady: true,
        items: [],
      })
      .mockImplementation((link) => ({ link }));

    expect(getLinksFromPages({ pages, firstLink, sourceGet }))
      .toMatchInlineSnapshot(`
      Array [
        "/post-1",
      ]
    `);
  });

  it("should work with one link", () => {
    const pages = ["/"];
    const firstLink = "/post-1";
    sourceGet
      .mockReturnValueOnce({
        isArchive: true,
        isReady: true,
        items: [
          {
            link: "/post-1",
          },
        ],
      })
      .mockImplementation((link) => ({ link }));

    expect(getLinksFromPages({ pages, firstLink, sourceGet }))
      .toMatchInlineSnapshot(`
      Array [
        "/post-1",
      ]
    `);
  });

  it("should work if the first link is in the second page", () => {
    const pages = ["/", "/page/2"];
    const firstLink = "/post-1";
    sourceGet
      .mockReturnValueOnce({
        isArchive: true,
        isReady: true,
        items: [
          {
            link: "/post-2",
          },
        ],
      })
      .mockReturnValueOnce({
        isArchive: true,
        isReady: true,
        items: [
          {
            link: "/post-3",
          },
          {
            link: "/post-1",
          },
          {
            link: "/post-4",
          },
        ],
      })
      .mockImplementation((link) => ({ link }));

    expect(getLinksFromPages({ pages, firstLink, sourceGet }))
      .toMatchInlineSnapshot(`
      Array [
        "/post-1",
        "/post-2",
        "/post-3",
        "/post-4",
      ]
    `);
  });

  it("should not break with an empty array of pages", () => {
    const pages = [];
    const firstLink = "/post-1";

    sourceGet.mockImplementation((link) => ({ link }));

    expect(getLinksFromPages({ pages, firstLink, sourceGet }))
      .toMatchInlineSnapshot(`
      Array [
        "/post-1",
      ]
    `);
  });

  it("should remove duplicated links on different pages", () => {
    const pages = ["/", "/page/2"];
    const firstLink = "/post-4";

    sourceGet
      .mockReturnValueOnce({
        isArchive: true,
        isReady: true,
        items: [
          {
            link: "/post-4",
          },
          {
            link: "/post-3",
          },
          {
            link: "/post-2",
          },
        ],
      })
      .mockReturnValueOnce({
        isArchive: true,
        isReady: true,
        items: [
          {
            link: "/post-3",
          },
          {
            link: "/post-2",
          },
          {
            link: "/post-1",
          },
        ],
      })
      .mockImplementation((link) => ({ link }));

    expect(getLinksFromPages({ pages, firstLink, sourceGet }))
      .toMatchInlineSnapshot(`
      Array [
        "/post-4",
        "/post-3",
        "/post-2",
        "/post-1",
      ]
    `);
  });

  it("should remove redirected links", () => {
    const pages = ["/", "/page/2"];
    const firstLink = "/post-1";

    sourceGet
      .mockReturnValueOnce({
        isArchive: true,
        isReady: true,
        items: [
          {
            link: "/post-1",
          },
          {
            link: "/post-2",
          },
          {
            link: "/post-3",
          },
        ],
      })
      .mockImplementation((link) => {
        if (link === "/post-2")
          return {
            isRedirection: true,
            location: "/post-1",
          };

        if (link === "/post-3")
          return {
            isRedirection: true,
            isExternal: true,
            location: "https://external.location",
          };

        return { link };
      });

    expect(getLinksFromPages({ pages, firstLink, sourceGet }))
      .toMatchInlineSnapshot(`
      Array [
        "/post-1",
      ]
    `);
  });

  it("should skip pages that are not ready yet", () => {
    const pages = ["/", "/page/2"];
    const firstLink = "/post-1";

    sourceGet
      .mockReturnValueOnce({
        isArchive: true,
        isReady: true,
        items: [
          {
            link: "/post-1",
          },
          {
            link: "/post-2",
          },
        ],
      })
      .mockReturnValueOnce({
        isFetching: true,
        isReady: false,
      })
      .mockImplementation((link) => ({ link }));

    expect(getLinksFromPages({ pages, firstLink, sourceGet }))
      .toMatchInlineSnapshot(`
      Array [
        "/post-1",
        "/post-2",
      ]
    `);
  });

  it("should work with pages that are being updated", () => {
    const pages = ["/", "/page/2"];
    const firstLink = "/post-1";

    sourceGet
      .mockReturnValueOnce({
        isArchive: true,
        isReady: true,
        items: [
          {
            link: "/post-1",
          },
          {
            link: "/post-2",
          },
        ],
      })
      .mockReturnValueOnce({
        isArchive: true,
        isFetching: true,
        isReady: true,
        items: [
          {
            link: "/post-3",
          },
        ],
      })
      .mockImplementation((link) => ({ link }));

    expect(getLinksFromPages({ pages, firstLink, sourceGet }))
      .toMatchInlineSnapshot(`
      Array [
        "/post-1",
        "/post-2",
        "/post-3",
      ]
    `);
  });

  it("should skip pages that are not an archive (e.g. errors)", () => {
    const pages = ["/", "/page/2"];
    const firstLink = "/post-1";

    sourceGet
      .mockReturnValueOnce({
        isArchive: true,
        isReady: true,
        items: [
          {
            link: "/post-1",
          },
          {
            link: "/post-2",
          },
        ],
      })
      .mockReturnValueOnce({
        isError: true,
        isReady: true,
        is408: true,
        errorStatus: 408,
        errorStatusMessage: "Request Timeout",
      })
      .mockImplementation((link) => ({ link }));

    expect(getLinksFromPages({ pages, firstLink, sourceGet }))
      .toMatchInlineSnapshot(`
      Array [
        "/post-1",
        "/post-2",
      ]
    `);
  });
});
