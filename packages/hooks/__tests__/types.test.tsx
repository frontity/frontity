import useInfiniteScroll from "../use-infinite-scroll";
import useArchiveInfiniteScroll from "../use-archive-infinite-scroll";
import usePostTypeInfiniteSCroll from "../use-post-type-infinite-scroll";

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

  usePostTypeInfiniteSCroll();

  usePostTypeInfiniteSCroll({});

  usePostTypeInfiniteSCroll({
    limit: 2,
    active: true,
    archive: "/forced-archive/",
    fallback: "/default-archive/",
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
