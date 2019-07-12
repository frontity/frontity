import React from "react";
import { connect, Head } from "frontity";
import { Connect } from "frontity/types";
import Yoast from "../../types";

const Twitter: React.FC<Connect<Yoast>> = ({ state }) =>
  state.yoast.twitter ? (
    <Head>
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:title"
        content={state.yoast.twitter.title || state.yoast.title}
      />
      <meta
        name="twitter:description"
        content={state.yoast.twitter.description || state.yoast.description}
      />
      {(state.yoast.twitter.image || state.yoast.image) && (
        <meta
          name="twitter:image"
          content={state.yoast.twitter.image || state.yoast.image}
        />
      )}
      {/* Not exposed in the REST API */}
      {/* <meta name="twitter:creator" content="" /> */}
    </Head>
  ) : null;

export default connect(Twitter);
