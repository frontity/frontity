import React from "react";
import { Global, css, connect, URL, styled } from "frontity";
import Package from "../types";

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

const Styled = styled.div`
  color: ${({ color }) => color || "red"};
`;

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
  if (pathname === "/background-blue") return <GlobalBackgroundBlue />;
  if (pathname === "/color-red") return <GlobalColorRed />;
  if (pathname === "/styled-css") return <StyledPage />;
});

const EmotionPackage: Package = {
  name: "emotion",
  state: {},
  actions: {},
  roots: {
    emotion: Root
  },
  libraries: {}
};

export default EmotionPackage;
