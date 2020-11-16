import React from "react";
import { Global, css, connect, styled } from "frontity";
import Package from "../types";

/**
 * A React component that can change the background color of the body.
 *
 * @returns React element.
 */
const GlobalBackgroundBlue = () => {
  const [global, setGlobal] = React.useState(false);
  return (
    <>
      {global && (
        <Global
          styles={css`
            body {
              background-color: blue;
            }
          `}
        />
      )}
      <div data-test-id="div-with-text">BackgroundBlue</div>
      <button data-test-id="toggle-button" onClick={() => setGlobal(!global)}>
        Toggle Global
      </button>
    </>
  );
};

/**
 * A React component that can change the color of the body.
 *
 * @returns React element.
 */
const GlobalColorRed = () => {
  const [global, setGlobal] = React.useState(false);
  return (
    <>
      {global && (
        <Global
          styles={css`
            body {
              color: red;
            }
          `}
        />
      )}
      <div data-test-id="div-with-text">ColorRed</div>
      <button data-test-id="toggle-button" onClick={() => setGlobal(!global)}>
        Toggle Global
      </button>
    </>
  );
};

/**
 * A styled component of a `<div>` that can change the color.
 *
 * @param color - The color that will be used for this `<div>` element.
 * @defaultValue "red"
 *
 * @returns A div tag.
 */
const Styled = styled.div`
  color: ${({ color }) => color || "red"};
`;

/**
 * A React component with a `css` prop to change the color.
 *
 * @param color - The color that will be used for the `<div>` element.
 * @defaultValue "red"
 *
 * @param children - The children of the `<div>` element.
 *
 * @returns A div tag.
 */
const CSS = ({ children, color }) => (
  <div
    data-test-id="css-div"
    css={css`
      color: ${color || "red"};
    `}
  >
    {children}
  </div>
);

/**
 * A React component that wraps both a styled component and a component using
 * the `css` prop with a button to toggle between red and blue colors.
 *
 * @returns React element.
 */
const StyledPage = () => {
  const [isBlue, setIsBlue] = React.useState(false);
  return (
    <>
      <Styled color={isBlue && "blue"} data-test-id="styled-div">
        I&apos;m styled
      </Styled>
      <CSS color={isBlue && "blue"}>I&apos;m css</CSS>
      <button onClick={() => setIsBlue(!isBlue)} data-test-id="toggle-button">
        Toggle color
      </button>
    </>
  );
};

const Root = connect(({ state }) => {
  const { pathname } = new URL(state.router.link, "http://localhost:3001");
  console.log(pathname);
  if (pathname === "/background-blue/") return <GlobalBackgroundBlue />;
  if (pathname === "/color-red/") return <GlobalColorRed />;
  if (pathname === "/styled-css/") return <StyledPage />;
});

const EmotionPackage: Package = {
  name: "e2e-emotion",
  roots: {
    emotion: Root,
  },
};

export default EmotionPackage;
