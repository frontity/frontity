import { Processor, Element } from "@frontity/html2react/types";
import { Packages } from "../../types";
import { css } from "frontity";

/**
 * Props for the image element as processed by {@link img}.
 */
export type ImgElement = Element & {
  /**
   * Props.
   */
  props: {
    /**
     * Loading prop that normally is set on the img component by WordPress.
     */
    loading: boolean;

    /**
     * Layout - refers to AMP layout parameter.
     */
    layout: string;
  };
};

/**
 * Props for the {@link AMPImage} Component.
 */
interface ImageProps {
  /**
   * The CSS class name.
   */
  className: string;

  /**
   * Layout - refers to AMP layout parameter.
   */
  layout: "responsive" | "fill";
}

const styles = css`
  & img {
    object-fit: contain;
  }
`;

/**
 * The component that renders an amp-img component
 * in place of a regular <img>.
 *
 * @param props - Defined in {@link ImageProps}.
 * @returns A react component.
 */
const AMPImage: React.FC<ImageProps> = ({ className, layout, ...props }) => (
  <amp-img class={className} layout={layout} {...props} />
);

export const img: Processor<ImgElement, Packages> = {
  name: "amp-img",
  priority: 9, // because it should run before the image processor from html2react
  test: ({ node }) => node.component === "img",
  processor: ({ node }) => {
    // amp-img does not support nor need that prop.
    delete node.props.loading;

    const { width, height } = node.props;

    // If there is no width or height, then this image might not work well with
    // AMP because it requires specifying width & height for most layout types.

    // We resort to using `fill` layout in that case. For the `fill` layout to
    // work, the parent of the img element needs to have positon `relative` or
    // `absolute`: amp.dev/documentation/guides-and-tutorials/develop/style_and_layout/control_layout
    if (!width || !height) {
      node.props.layout = "fill";
      node.props.css = styles;
    } else {
      node.props.layout = "responsive";
    }

    node.component = AMPImage;

    return node;
  },
};
