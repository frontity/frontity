import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import Yoast from "../../types";

const Facebook: React.FC<Connect<Yoast>> = ({ state }) => {
  // Render nothing if facebook is not enabled
  if (!state.yoast.facebook) return null;

  const data = state.source.get(state.router.link);

  // Post-specific attributes
  let updatedTime: string;

  if (data.isPost) {
    const post = state.source[data.type][data.id];
    updatedTime = post.modified_gmt || post.modified;
  }

  return (
    <>
      <Head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />;
        <meta
          property="og:title"
          content={state.yoast.facebook.title || state.yoast.title}
        />
        <meta
          property="og:description"
          content={state.yoast.facebook.description || state.yoast.description}
        />
        <meta property="og:url" content={state.yoast.canonical} />
        <meta property="og:site_name" content={state.frontity.name} />
      </Head>
      {data.isPost && (
        <Head>
          <meta property="og:updated_time" content={updatedTime} />
          {(state.yoast.facebook.image || state.yoast.image) && (
            <meta
              property="og:image"
              content={state.yoast.facebook.image || state.yoast.image}
            />
          )}
        </Head>
      )}
    </>
  );
};

export default connect(Facebook);
