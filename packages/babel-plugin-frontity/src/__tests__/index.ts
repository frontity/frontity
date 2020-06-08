import pluginTester from "babel-plugin-tester";
import frontityPlugin from "../";

pluginTester({
  title: "Unrelated imports",
  plugin: frontityPlugin,
  tests: [
    {
      title: "Unrelated named import",
      code: 'import { named } from "other-module";',
    },
    {
      title: "Unrelated default import",
      code: 'import def from "other-module";',
    },
    {
      title: "Unrelated import from frontity",
      code: 'import { connect } from "frontity";',
    },
    {
      title: "Unrelated multiple import from frontity",
      code: 'import { connect, loadable } from "frontity";',
    },
  ],
});

pluginTester({
  title: "styled",
  plugin: frontityPlugin,
  tests: [
    {
      title: "Only styled import",
      code: 'import { styled } from "frontity";',
      output: 'import styled from "@emotion/styled";',
    },
    {
      title: "Styled import with other unrelated import",
      code: 'import { connect, styled } from "frontity";',
      output: `
        import { connect } from "frontity";
        import styled from "@emotion/styled";
      `,
    },
    {
      title: "Styled import with other two unrelated imports",
      code: 'import { connect, loadable, styled } from "frontity";',
      output: `
        import { connect } from "frontity";
        import { loadable } from "frontity";
        import styled from "@emotion/styled";
      `,
    },
  ],
});

pluginTester({
  title: "css",
  plugin: frontityPlugin,
  tests: [
    {
      title: "Only css import",
      code: 'import { css } from "frontity";',
      output: 'import { css } from "@emotion/core";',
    },
    {
      title: "css import with other unrelated import",
      code: 'import { connect, css } from "frontity";',
      output: `
        import { connect } from "frontity";
        import { css } from "@emotion/core";
      `,
    },
  ],
});

pluginTester({
  title: "Global",
  plugin: frontityPlugin,
  tests: [
    {
      title: "Only Global import",
      code: 'import { Global } from "frontity";',
      output: 'import { Global } from "@emotion/core";',
    },
    {
      title: "Global import with other unrelated import",
      code: 'import { connect, Global } from "frontity";',
      output: `
        import { connect } from "frontity";
        import { Global } from "@emotion/core";
      `,
    },
  ],
});

pluginTester({
  title: "keyframes",
  plugin: frontityPlugin,
  tests: [
    {
      title: "Only keyframes import",
      code: 'import { keyframes } from "frontity";',
      output: 'import { keyframes } from "@emotion/core";',
    },
    {
      title: "keyframes import with other unrelated import",
      code: 'import { connect, keyframes } from "frontity";',
      output: `
        import { connect } from "frontity";
        import { keyframes } from "@emotion/core";
      `,
    },
  ],
});

pluginTester({
  title: "css and styled",
  plugin: frontityPlugin,
  tests: [
    {
      title: "css import with styled import",
      code: 'import { styled, css } from "frontity";',
      output: `
        import styled from "@emotion/styled";
        import { css } from "@emotion/core";
      `,
    },
    {
      title: "css import with styled and other unrelated import",
      code: 'import { styled, css, connect } from "frontity";',
      output: `
        import styled from "@emotion/styled";
        import { css } from "@emotion/core";
        import { connect } from "frontity";
      `,
    },
  ],
});
