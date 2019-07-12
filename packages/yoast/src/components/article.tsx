import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import Yoast from "../../types";

const Article: React.FC<Connect<Yoast>> = ({ state }) => {
  const data = state.source.get(state.router.link);

  // Return null if this link doesn't point to an article
  if (!data.isPost) return null;

  // Get tags and section names
  const post = state.source[data.type][data.id];
  const tags = post.tags.map(id => state.source.tag[id].name);
  const [section] = post.categories.map(
    id => state.source.category[id].name
  ) || [null];

  // Get published and modified times
  const published = post.date_gmt || post.date;
  const modified = post.modified_gmt || post.modified;

  // Render the component
  return (
    <Head>
      {tags.map(tag => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}
      {section && <meta property="article:section" content={section} />}
      <meta property="article:published_time" content={published} />
      <meta property="article:modified_time" content={modified} />
    </Head>
  );
};

export default connect(Article);
