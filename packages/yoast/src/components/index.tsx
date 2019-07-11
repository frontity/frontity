import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import Yoast from "../../types";
import Article from "./article";
import Twitter from "./twitter";
import Facebook from "./facebook";

const Root: React.FC<Connect<Yoast>> = ({ state }) => (
  <>
    <Head>
      <title>{state.yoast.title}</title>
      <meta name="description" content={state.yoast.description} />
      <link rel="canonical" href={state.yoast.canonical} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebSite",
          "@id": "#website",
          url: state.frontity.url,
          name: state.frontity.name,
          potentialAction: {
            "@type": "SearchAction",
            target: `${state.frontity.url}/?s={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Head>
    <Article />
    <Twitter />
    <Facebook />
  </>
);

export default connect(Root);
