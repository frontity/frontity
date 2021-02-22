import { css, styled, Global } from "frontity";

const globalStyles = css`
  :root {
    --blue-1: #79aad7;
    --blue-2: #aecae8;
    --dark-1: #151515;
    --dark-2: #444;
    --light-1: #eee;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: sans-serif;
    font-size: 1em;
    background: var(--dark-1);
    color: var(--light-1);
  }

  * {
    box-sizing: border-box;
  }
`;

/**
 * The colors.
 */
type Colors = "blue-1" | "blue-2" | "dark-1" | "dark-2" | "light-1";

/**
 * The custom styled Box.
 */
interface BoxProps {
  /**
   * Padding value.
   */
  p?: number;

  /**
   * Margin value.
   */
  m?: number;

  /**
   * Background color.
   */
  bg?: Colors;

  /**
   * The text color.
   */
  color?: Colors;

  /**
   * The font size.
   */
  size?: number;

  /**
   * The border radius.
   */
  r?: number;
}

const Box = styled("div", {
  shouldForwardProp(prop: string) {
    return ["p", "m", "bg", "color", "size", "r", "as"].indexOf(prop) === -1;
  },
})<BoxProps>((props) => [
  {
    display: "flex",
    flexDirection: "column",
    margin: 0,
    padding: 0,
  },
  props.p && { padding: props.p + "em" },
  props.m && { margin: props.m + "em" },
  props.bg && { background: `var(--${props.bg})` },
  props.color && { color: `var(--${props.color})` },
  props.size && { fontSize: props.size + "em" },
  props.r && { borderRadius: props.r + "em" },
]);

const Text = styled(Box)({
  lineHeight: "1.5",
}).withComponent("p");

/**
 * The theme root component.
 *
 * @returns The JSX of the tree.
 */
const Theme = () => {
  return (
    <>
      <Global styles={globalStyles} />
      <Box p={2} as="section">
        <Text size={2} as="h1" color="blue-2">
          Static theme content
        </Text>
        <Box p={1} />
        <Text size={1.25} as="h2" color="blue-1">
          Section title about AMP
        </Text>
        <Box p={0.5} />
        <Text>
          The content in the body, so far, is pretty straightforward. But
          there’s a lot of additional code in the head of the page that might
          not be immediately obvious. Let’s deconstruct the required mark-up.
          Use HTTPS: When creating AMP pages and content, you should strongly
          consider using the HTTPS protocol (vs. HTTP). Although, HTTPS is not
          required for the AMP document itself or for images and fonts, there
          are many AMP features that require HTTPS (e.g., video, iframes, and
          more). To ensure your AMP pages take full advantage of all AMP
          features, use the HTTPS protocol.
        </Text>
        <Box p={0.5} />
        <Text r={0.25} color={"blue-1"}>
          » Read more
        </Text>
        <Box p={1} />
        <Text size={1.25} as="h2" color="blue-1">
          New article is here
        </Text>
        <Box p={0.5} />
        <Text>Not that much content I could find to fill in here.</Text>
        <Box p={0.5} />
        <Text r={0.25} color={"blue-1"}>
          &raquo; Don’t read more
        </Text>
      </Box>
    </>
  );
};

export default {
  roots: {
    static: Theme,
  },
};
