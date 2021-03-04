import usePostTypeInfiniteSCroll from "../";

() => {
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
