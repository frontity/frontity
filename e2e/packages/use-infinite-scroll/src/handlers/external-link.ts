export default {
  name: "test",
  priority: 10,
  pattern: "/external-link",
  func: async ({ link, state }) => {
    Object.assign(state.source.data[link], {
      isRedirection: true,
      redirectionStatus: 301,
      is301: true,
      location: "https://external.domain/external-link",
      isExternal: true,
    });
  },
};
