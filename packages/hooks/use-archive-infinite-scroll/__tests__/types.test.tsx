import useArchiveInfiniteScroll from "../";

() => {
  useArchiveInfiniteScroll();

  useArchiveInfiniteScroll({});

  useArchiveInfiniteScroll({
    limit: 1,
    active: false,
    fetchInViewOptions: {
      root: null,
      rootMargin: "",
      threshold: 1,
      triggerOnce: true,
    },
    routeInViewOptions: {
      root: document.createElement("div"),
      rootMargin: "",
      threshold: 0.5,
      triggerOnce: false,
    },
  });

  return null;
};

//eslint-disable-next-line @typescript-eslint/no-empty-function
test("Types are fine!", () => {});
