import React from "react";
import { useConnect, connect } from "frontity";
import { isPostType, isArchive } from "@frontity/source/data";
import { PostTypeData } from "@frontity/source/types/data";
import WpBasicTests, { Packages } from "../types";

const Post: React.FC<{
  /**
   * The post type data object.
   */
  data: PostTypeData;
}> = connect(({ data }) => {
  const { state } = useConnect<Packages>();
  const post = state.source.post[data.id];
  return <div data-test-id="post">Post: {post.title.rendered}</div>;
});

/**
 * The root component of the package. It's like a mini-theme to know if we are
 * getting data correctly from WordPress.
 *
 * @returns React element.
 */
const Component: React.FC = () => {
  const { state } = useConnect<Packages>();
  const data = state.source.get(state.router.link);

  return (
    <>
      {isArchive(data) && (
        <div>
          Archive:
          {data.items.map(({ link, id }) => (
            <div key={id} data-test-id={id}>
              {link}
            </div>
          ))}
        </div>
      )}
      {isPostType(data) && <Post data={data} />}
    </>
  );
};

const wpBasicTests: WpBasicTests = {
  roots: {
    wpBasicTests: connect(Component),
  },
};

export default wpBasicTests;
