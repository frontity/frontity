import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import FeaturedMedia from "../featured-media";

/**
 * Item Component
 *
 * It renders the preview of a blog post. Each blog post contains
 * - Title: clickable title of the post
 * - Author: name of author and published date
 * - FeaturedMedia: the featured image/video of the post
 */
const Item = ({ state, item }) => {
  const author = state.source.author[item.author];
  const date = new Date(item.date);

  return (
    <article>
      <EntryTitleLink link={item.link}>
        <EntryTitle dangerouslySetInnerHTML={{ __html: item.title.rendered }} />
      </EntryTitleLink>

      <div>
        {/* If the post has an author, we render a clickable author text. */}
        {author && (
          <Link link={author.link}>
            <AuthorName>
              By <b>{author.name}</b>
            </AuthorName>
          </Link>
        )}
        <PublishDate>
          {" "}
          on <b>{date.toDateString()}</b>
        </PublishDate>
      </div>

      {/*
       * If the want to show featured media in the
       * list of featured posts, we render the media.
       */}
      {state.theme.featured.showOnList && (
        <FeaturedMedia id={item.featured_media} />
      )}

      {/* If the post has an excerpt (short summary text), we render it */}
      {item.excerpt && (
        <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
      )}
    </article>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);

const EntryTitle = styled.h1`
  margin: 0;
  @media (min-width: 700px) {
    font-size: 6.4rem;
  }
  @media (min-width: 1200px) {
    font-size: 8.4rem;
  }
`;

const EntryTitleLink = styled(Link)`
  color: #000000;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const AuthorName = styled.span`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
`;

const PublishDate = styled.span`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
`;

const Excerpt = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);
`;
