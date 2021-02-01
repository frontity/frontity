export default {
  name: "test",
  priority: 10,
  pattern: "/test",
  func: async ({ link, state }) => {
    Object.assign(state.source.data[link], { isTest: true });
  },
};
