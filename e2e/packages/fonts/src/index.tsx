/* eslint-disable */
/*
 * TSDocs will be added in this branch:
 * https://github.com/frontity/frontity/tree/package-name
 */
import React from "react";
import { Global, css, connect, styled } from "frontity";
import Package from "../types";
import aclonicaEot from "./fonts/aclonica-v10-latin-regular.eot";
import aclonicaWoff from "./fonts/aclonica-v10-latin-regular.woff";
import aclonicaWoff2 from "./fonts/aclonica-v10-latin-regular.woff2";
import aclonicaTtf from "./fonts/aclonica-v10-latin-regular.ttf";
import aclonicaSvg from "./fonts/aclonica-v10-latin-regular.svg";

const Div = styled.div`
  font-family: "Aclonica";
  width: 300px;
`;

const Button = styled.button`
  margin: 20px 0;
`;

const All: React.FC = () => {
  const [global, setGlobal] = React.useState(false);
  return (
    <>
      {global && (
        <Global
          styles={css`
            @font-face {
              font-family: "Aclonica";
              font-style: normal;
              font-weight: 400;
              src: url(${aclonicaEot});
              src: local("Aclonica Regular"), local("Aclonica-Regular"),
                url(${aclonicaEot + "?#iefix"}) format("embedded-opentype"),
                url(${aclonicaWoff2}) format("woff2"),
                url(${aclonicaWoff}) format("woff"),
                url(${aclonicaTtf}) format("truetype"),
                url(${aclonicaSvg + "#Aclonica"}) format("svg");
            }
          `}
        />
      )}
      <Div data-test-id="div-with-font">Aclonica Font with all fonts!</Div>
      <Button data-test-id="toggle-button" onClick={() => setGlobal(!global)}>
        Toggle Global
      </Button>
    </>
  );
};

const Woff1: React.FC = () => {
  const [global, setGlobal] = React.useState(false);
  return (
    <>
      {global && (
        <Global
          styles={css`
            @font-face {
              font-family: "Aclonica";
              font-style: normal;
              font-weight: 400;
              src: local("Aclonica Regular"), local("Aclonica-Regular"),
                url(${aclonicaWoff}) format("woff");
            }
          `}
        />
      )}
      <Div data-test-id="div-with-font">Aclonica Font with woff1!</Div>
      <Button data-test-id="toggle-button" onClick={() => setGlobal(!global)}>
        Toggle Global
      </Button>
    </>
  );
};

const Woff2: React.FC = () => {
  const [global, setGlobal] = React.useState(false);
  return (
    <>
      {global && (
        <Global
          styles={css`
            @font-face {
              font-family: "Aclonica";
              font-style: normal;
              font-weight: 400;
              src: local("Aclonica Regular"), local("Aclonica-Regular"),
                url(${aclonicaWoff2}) format("woff2");
            }
          `}
        />
      )}
      <Div data-test-id="div-with-font">Aclonica Font with woff2!</Div>
      <Button data-test-id="toggle-button" onClick={() => setGlobal(!global)}>
        Toggle Global
      </Button>
    </>
  );
};

const Ttf: React.FC = () => {
  const [global, setGlobal] = React.useState(false);
  return (
    <>
      {global && (
        <Global
          styles={css`
            @font-face {
              font-family: "Aclonica";
              font-style: normal;
              font-weight: 400;
              src: local("Aclonica Regular"), local("Aclonica-Regular"),
                url(${aclonicaTtf}) format("truetype");
            }
          `}
        />
      )}
      <Div data-test-id="div-with-font">Aclonica Font with ttf!</Div>
      <Button data-test-id="toggle-button" onClick={() => setGlobal(!global)}>
        Toggle Global
      </Button>
    </>
  );
};

const Empty: React.FC = () => (
  <Div data-test-id="div-with-font">Fonts not loaded</Div>
);

const Font: React.FC = connect(({ state }) => {
  const { pathname } = new URL(state.router.link, "http://localhost:3001");
  if (pathname === "/") return <All />;
  if (pathname === "/woff-1") return <Woff1 />;
  if (pathname === "/woff-2") return <Woff2 />;
  if (pathname === "/ttf") return <Ttf />;
  if (pathname === "/empty") return <Empty />;
});

const FontsPackage: Package = {
  name: "fonts",
  state: {},
  actions: {},
  roots: {
    fonts: Font,
  },
  libraries: {},
};

export default FontsPackage;
