import { getLinksFromPages } from "../utils";

describe("getLinksFromPages", () => {
  const sourceGet = jest.fn();
  beforeEach(() => {
    sourceGet.mockReset();
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
        "/post-2",
        "/post-3",
        "/post-4",
      ]
    `);
  });
});
