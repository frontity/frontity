export default {
  name: "archive",
  priority: 13,
  pattern: "/archive",
  func: async ({ link, params, state, libraries }) => {
    const handler = libraries.source.handlers.find(
      (handler) => handler.name === "post archive"
    );
    await handler.func({ link, params, state, libraries });
  },
};
