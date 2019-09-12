import React from "react";
import { Global, css, connect, styled, URL } from "frontity";
import Package from "../types";
import aclonicaEot from "./fonts/aclonica-v10-latin-regular.eot";
import aclonicaWoff from "./fonts/aclonica-v10-latin-regular.woff";
import aclonicaWoff2 from "./fonts/aclonica-v10-latin-regular.woff2";
import aclonicaTtf from "./fonts/aclonica-v10-latin-regular.ttf";
import aclonicaSvg from "./fonts/aclonica-v10-latin-regular.svg";

const Div = styled.div`
  font-family: "Aclonica";
`;

const All: React.FC = () => (
  <>
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
    <Div data-test-id="div-with-font">Aclonica Font!</Div>
  </>
);

const Eot1: React.FC = () => (
  <>
    <Global
      styles={css`
        @font-face {
          font-family: "Aclonica";
          font-style: normal;
          font-weight: 400;
          src: url(${aclonicaEot});
        }
      `}
    />
    <Div data-test-id="div-with-font">Aclonica Font!</Div>
  </>
);

const Eot2: React.FC = () => (
  <>
    <Global
      styles={css`
        @font-face {
          font-family: "Aclonica";
          font-style: normal;
          font-weight: 400;
          src: local("Aclonica Regular"), local("Aclonica-Regular"),
            url(${aclonicaEot + "?#iefix"}) format("embedded-opentype");
        }
      `}
    />
    <Div data-test-id="div-with-font">Aclonica Font!</Div>
  </>
);

const Woff1: React.FC = () => (
  <>
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
    <Div data-test-id="div-with-font">Aclonica Font!</Div>
  </>
);

const Woff2: React.FC = () => (
  <>
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
    <Div data-test-id="div-with-font">Aclonica Font!</Div>
  </>
);

const Ttf: React.FC = () => (
  <>
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
    <Div data-test-id="div-with-font">Aclonica Font!</Div>
  </>
);

const Svg: React.FC = () => (
  <>
    <Global
      styles={css`
        @font-face {
          font-family: "Aclonica";
          font-style: normal;
          font-weight: 400;
          src: local("Aclonica Regular"), local("Aclonica-Regular"),
            url(${aclonicaSvg + "#Aclonica"}) format("svg");
        }
      `}
    />
    <Div data-test-id="div-with-font">Aclonica Font!</Div>
  </>
);

const Empty: React.FC = () => (
  <Div data-test-id="div-with-font">Fonts not loaded</Div>
);

const Font: React.FC = connect(({ state }) => {
  const { pathname } = new URL(state.router.link, "http://localhost:3000");
  if (pathname === "/") return <All />;
  if (pathname === "/eot-1") return <Eot1 />;
  if (pathname === "/eot-2") return <Eot2 />;
  if (pathname === "/woff-1") return <Woff1 />;
  if (pathname === "/woff-2") return <Woff2 />;
  if (pathname === "/ttf") return <Ttf />;
  if (pathname === "/svg") return <Svg />;
  if (pathname === "/empty") return <Empty />;
});

const FontsPackage: Package = {
  name: "fonts",
  state: {},
  actions: {},
  roots: {
    fonts: Font
  },
  libraries: {}
};

export default FontsPackage;
