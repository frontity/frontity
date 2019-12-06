import { connect } from "frontity";
import React, { useEffect } from "react";
import FeaturedMedia from "./featured-media";
// import Posts from "./list";
import {
  EntryContent,
  getCategories,
  getTags,
  Post as ArticlePost,
  PostHeader,
  PostInner,
  PostTitle,
  SectionContainer
} from "./list/article";
import PostCategories from "./list/post-categories";
import PostMeta from "./list/post-meta";
import PostTags from "./list/post-tags";

const Post = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get the data of the author.
  // const author = state.source.author[post.author];
  // Get a human readable date.
  // const date = new Date(post.date);

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  const { hasTags, tags } = getTags(state, post);
  const { hasCategories, categories } = getCategories(state, post);

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  useEffect(() => {
    actions.source.fetch("/");
    // Posts.preload();
  }, []);

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <ArticlePost>
      <PostHeader>
        <SectionContainer>
          {/* If the post has categories, render the categories */}
          {hasCategories && <PostCategories categories={categories} />}

          <PostTitle
            size="h1"
            className="heading-size-1"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* The post's metadata like author, publish date, and comments */}
          <PostMeta item={post} />
        </SectionContainer>
      </PostHeader>

      {/*
       * If the want to show featured media in the
       * list of featured posts, we render the media.
       */}
      {state.theme.featuredMedia.showOnPost && (
        <FeaturedMedia id={post.featured_media} />
      )}

      {/* If the post has an excerpt (short summary text), we render it */}
      {post.content && (
        <PostInner size="thin">
          <EntryContent>
            <Html2React html={post.content.rendered} />
          </EntryContent>
          {/* If the post has tags, render it */}
          {hasTags && <PostTags tags={tags} />}
        </PostInner>
      )}
    </ArticlePost>
  ) : null;
};

export default connect(Post);

// const StyledLink = styled(Link)`
//   padding: 15px 0;
// `;

// const Author = styled.p`
//   color: rgba(12, 17, 43, 0.9);
//   font-size: 0.9em;
//   display: inline;
// `;

// const Fecha = styled.p`
//   color: rgba(12, 17, 43, 0.9);
//   font-size: 0.9em;
//   display: inline;
// `;

/**
 * This component is the parent of the `content.rendered` HTML. We can use nested
 * selectors to style that HTML.
 */
// const Content = styled.div`
//   color: rgba(12, 17, 43, 0.8);
//   word-break: break-word;

//   * {
//     max-width: 100%;
//   }

//   p {
//     line-height: 1.6em;
//   }

//   img {
//     width: 100%;
//     object-fit: cover;
//     object-position: center;
//   }

//   figure {
//     margin: 24px auto;
//     /* next line overrides an inline style of the figure element. */
//     width: 100% !important;

//     figcaption {
//       font-size: 0.7em;
//     }
//   }

//   iframe {
//     display: block;
//     margin: auto;
//   }

//   blockquote {
//     margin: 16px 0;
//     background-color: rgba(0, 0, 0, 0.1);
//     border-left: 4px solid rgba(12, 17, 43);
//     padding: 4px 16px;
//   }

//   a {
//     color: rgb(31, 56, 197);
//     text-decoration: underline;
//   }

//   /* Input fields styles */

//   input[type="text"],
//   input[type="email"],
//   input[type="url"],
//   input[type="tel"],
//   input[type="number"],
//   input[type="date"],
//   textarea,
//   select {
//     display: block;
//     padding: 6px 12px;
//     font-size: 16px;
//     font-weight: 400;
//     line-height: 1.5;
//     color: #495057;
//     background-color: #fff;
//     background-clip: padding-box;
//     border: 1px solid #ced4da;
//     border-radius: 4px;
//     outline-color: transparent;
//     transition: outline-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
//     margin: 8px 0 4px 0;

//     &:focus {
//       outline-color: #1f38c5;
//     }
//   }

//   input[type="submit"] {
//     display: inline-block;
//     margin-bottom: 0;
//     font-weight: 400;
//     text-align: center;
//     white-space: nowrap;
//     vertical-align: middle;
//     -ms-touch-action: manipulation;
//     touch-action: manipulation;
//     cursor: pointer;
//     background-image: none;
//     border: 1px solid #1f38c5;
//     padding: 12px 36px;
//     font-size: 14px;
//     line-height: 1.42857143;
//     border-radius: 4px;
//     color: #fff;
//     background-color: #1f38c5;
//   }

//   /* WordPress Core Align Classes */

//   @media (min-width: 420px) {
//     img.aligncenter,
//     img.alignleft,
//     img.alignright {
//       width: auto;
//     }

//     .aligncenter {
//       display: block;
//       margin-left: auto;
//       margin-right: auto;
//     }

//     .alignright {
//       float: right;
//       margin-left: 24px;
//     }

//     .alignleft {
//       float: left;
//       margin-right: 24px;
//     }
//   }
// `;
