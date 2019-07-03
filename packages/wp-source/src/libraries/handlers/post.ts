import postTypeHandler from "./postType";

const postHandler = postTypeHandler({
  type: "post",
  endpoint: "posts",
  truths: {
    isPost: true
  }
});

export default postHandler;
