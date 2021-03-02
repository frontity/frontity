export default {
  name: "test",
  priority: 10,
  pattern: "/another-post",
  func: async ({ link, state }) => {
    // Create a redirection data object.
    Object.assign(state.source.data[link], {
      isRedirection: true,
      redirectionStatus: 301,
      is301: true,
      location: "/redirected-post/",
      isExternal: false,
    });
  },
};
