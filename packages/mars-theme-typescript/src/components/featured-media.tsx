import Image from "@frontity/components/image";
import { connect, styled, useConnect } from "frontity";
import { Packages } from "../../types";

/**
 * Object defining a media URL for a specific with.
 */
interface MediaSizes {
  /**
   * Source URL of the media.
   */
  source_url: string;

  /**
   * Width for this media.
   */
  width: number;
}

/**
 * Props of the {@link FeaturedMedia} component.
 */
interface FeaturedMediaProps {
  /**
   * ID of the attachment entity.
   */
  id: number;
}

/**
 * Show the specified attachment entity as the featured media of a post.
 *
 * @param props - Object of type {@link FeaturedMediaProps}.
 * @returns The featured media.
 */
const FeaturedMedia = ({ id }: FeaturedMediaProps): JSX.Element => {
  const { state } = useConnect<Packages>();
  const media = state.source.attachment[id];

  if (!media) return null;

  const srcset =
    Object.values(media.media_details.sizes)
      // Get the url and width of each size.
      .map((item: MediaSizes) => [item.source_url, item.width])
      // Recude them to a string with the format required by `srcset`.
      .reduce(
        (final, current, index, array) =>
          final.concat(
            `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
          ),
        ""
      ) || null;

  return (
    <Container>
      <StyledImage
        alt={media.title?.rendered}
        src={media.source_url}
        srcSet={srcset}
      />
    </Container>
  );
};

export default connect(FeaturedMedia);

const Container = styled.div`
  margin-top: 16px;
  height: 300px;
`;

const StyledImage = styled(Image)`
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
