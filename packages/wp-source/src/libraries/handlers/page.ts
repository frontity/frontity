import postTypeHandler from "./postType";

const pageHandler = postTypeHandler({
  type: "page",
  endpoint: "pages",
  truths: {
    isPage: true
  }
});

export default pageHandler;
