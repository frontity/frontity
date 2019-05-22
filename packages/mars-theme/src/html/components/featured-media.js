import React from "react";
import { connect, styled } from "frontity";

const FeaturedMedia = ({ state, id }) => {
  const media = state.source.attachment[id];

  if (!media) return null;

  const srcset = Object.values(media.media_details.sizes)
    // Get the url and width of each size.
    .map(item => [item.source_url, item.width])
    // Recude them to a string with the format required by `srcset`.
    .reduce(
      (final, current, index, array) =>
        final.concat(
          `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
        ),
      ""
    );

  return (
    <Image alt={media.title.rendered} src={media.source_url} srcSet={srcset} />
  );
};

export default connect(FeaturedMedia);

const Image = styled.img`
  margin-top: 16px;
  height: 300px;
  width: 100%;
  object-fit: cover;
`;
