describe("UseInfiniteScroll", () => {
  it("useArchiveInfiniteScroll should load next page", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

    // Stubs calls to REST API.
    cy.intercept("https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1", {
      fixture: "use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delayMs: 300,
    }).as("pageOne");
    cy.intercept("https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2", {
      fixture: "use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delayMs: 300,
    }).as("pageTwo");

    // Changes url to `/archive`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/archive/");
    cy.wait("@pageOne");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.wait("@pageTwo");
    cy.location("href").should("eq", "http://localhost:3001/archive/");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/archive/page/2/");

    // Scrolls back to top.
    cy.scrollTo("top");
    cy.location("href").should("eq", "http://localhost:3001/archive/");
  });

  it.only("useArchiveInfiniteScroll should return `isError` true", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

    // Stubs calls to REST API.
    cy.intercept("https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1", {
      fixture: "use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delayMs: 300,
    }).as("pageOne");
    cy.intercept("https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2", {
      statusCode: 503,
      body: {},
      delayMs: 300,
    }).as("pageTwo");

    // Changes url to `/archive`.
    cy.get("[data-test='to-archive']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/archive/");
    cy.wait("@pageOne");
    cy.get("[data-test='archive']").should("exist");
    cy.get("[data-test='page-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next page.
    cy.scrollTo("bottom");
    cy.get("[data-test='fetching']").should("exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.get("[data-test='error']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/archive/");

    // Try fetching again.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetch']").should("not.exist");
    cy.get("[data-test='fetching']").should("exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='error']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/archive/");

    cy.intercept("https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2", {
      fixture: "use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delayMs: 300,
    }).as("pageTwo");

    // Try one more time.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='page-2']").should("not.exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='page-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/archive/page/2/");
  });

  it("usePostTypeInfiniteScroll should load next post", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

    // Stubs calls to REST API.
    cy.intercept("https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1", {
      fixture: "use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delayMs: 300,
    }).as("pageOne");
    cy.intercept(
      "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-1",
      {
        fixture: "use-infinite-scroll/post-1.json",
        headers: {
          "x-wp-total": "1",
          "x-wp-totalpages": "1",
        },
        delayMs: 300,
      }
    ).as("postOne");

    // Changes url to `/post-type`.
    cy.get("[data-test='to-first-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
    cy.wait("@postOne");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-1']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.get("[data-test='post-2']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-2/");

    // Scrolls back to top.
    cy.scrollTo("top");
    cy.location("href").should("eq", "http://localhost:3001/post-1/");
  });

  it("usePostTypeInfiniteScroll should return `isError` true", () => {
    cy.visit("http://localhost:3001/?frontity_name=use-infinite-scroll");
    cy.location("href").should("eq", "http://localhost:3001/");

    // Stubs calls to REST API.
    cy.intercept(
      "https://domain.com/wp-json/wp/v2/posts?_embed=true&slug=post-10",
      {
        fixture: "use-infinite-scroll/post-last.json",
        headers: {
          "x-wp-total": "1",
          "x-wp-totalpages": "1",
        },
        delayMs: 300,
      }
    ).as("lastPost");
    cy.intercept("https://domain.com/wp-json/wp/v2/posts?_embed=true&page=1", {
      fixture: "use-infinite-scroll/page-1.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delayMs: 300,
    }).as("pageOne");
    cy.intercept("https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2", {
      statusCode: 503,
      body: {},
      delayMs: 300,
    }).as("pageTwo");

    // Changes url to `/post-type`.
    cy.get("[data-test='to-last-post']").should("exist").click();
    cy.location("href").should("eq", "http://localhost:3001/post-10/");
    cy.wait("@lastPost");
    cy.get("[data-test='post-type']").should("exist");
    cy.get("[data-test='post-10']").should("exist");
    cy.get("[data-test='fetching']").should("not.exist");

    // Scrolls to bottom to fetch next post.
    cy.scrollTo("bottom");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='post-11']").should("not.exist");
    cy.get("[data-test='error']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-10/");

    // Try fetching again.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetch']").should("not.exist");
    cy.get("[data-test='fetching']").should("exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='error']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-10/");

    cy.intercept("https://domain.com/wp-json/wp/v2/posts?_embed=true&page=2", {
      fixture: "use-infinite-scroll/page-2.json",
      headers: {
        "x-wp-total": "20",
        "x-wp-totalpages": "2",
      },
      delayMs: 300,
    }).as("pageTwo");

    // Try one more time.
    cy.get("[data-test='fetch']").should("exist").click();
    cy.get("[data-test='fetching']").should("exist");
    cy.get("[data-test='post-11']").should("not.exist");
    cy.wait("@pageTwo");
    cy.get("[data-test='fetching']").should("not.exist");
    cy.get("[data-test='post-11']").should("exist").scrollIntoView();
    cy.location("href").should("eq", "http://localhost:3001/post-11/");
  });
});
