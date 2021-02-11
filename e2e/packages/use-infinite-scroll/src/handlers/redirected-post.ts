export default {
  name: "test",
  priority: 10,
  pattern: "/another-post",
  func: async ({ link, state }) => {
    Object.assign(state.source.data[link], {
      isRedirection: true,
      location: "/redirected-post",
      isExternal: false,
      redirectionStatus: 301,
      is301: true,
    });
  },
};
