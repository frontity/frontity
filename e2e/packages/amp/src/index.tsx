import * as React from "react";
import Package from "../types";
import { connect, Head, styled } from "frontity";

const Container = styled.main`
  margin: 0 auto;
  max-width: 58rem;
`;

/**
 * A React component to render the test AMP theme.
 *
 * @returns React element.
 */
const Theme = connect(({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const Html2React = libraries.html2react.Component;

  return (
    <Container>
      <Head>
        {/* AMP needs a link in head with rel="canonical" */}
        <link
          rel="canonical"
          href="http://localhost:3001/hello-world/?frontity_name=amp-wordpress"
        />
      </Head>
      <div id="test">
        <h2>
          <Html2React html={post.title.rendered} />
        </h2>
        <div>
          <Html2React html={post.content.rendered} />
        </div>
      </div>
    </Container>
  );
});

const AmpPackage: Package = {
  name: "e2e-amp",
  roots: {
    amp: Theme,
  },
};

export default AmpPackage;
