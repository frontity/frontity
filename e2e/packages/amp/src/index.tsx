import Package, { Packages } from "../types";
import { connect, Head, styled } from "frontity";
import { Connect } from "frontity/types";

import image from "@frontity/html2react/processors/image";
import link from "@frontity/html2react/processors/link";
import iframe from "@frontity/html2react/processors/iframe";

const Container = styled.main`
  margin: 0 auto;
  max-width: 58rem;
`;

/**
 * A React component to render the test AMP theme.
 *
 * @returns React element.
 */
const Theme: React.FC<Connect<Packages>> = connect(({ state, libraries }) => {
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
  libraries: {
    html2react: {
      // We include all the other processors from html2react because we need to
      // check that there is no conflict betwen them an the AMP processors.
      processors: [image, iframe, link],
    },
  },
};

export default AmpPackage;
