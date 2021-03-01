import useInfiniteScroll from "../";

() => {
  useInfiniteScroll({
    currentLink: "/page-one/",
  });

  useInfiniteScroll({
    currentLink: "/page-one/",
    nextLink: "/page-two/",
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
