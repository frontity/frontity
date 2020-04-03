import React from "react";
import { Connect, Package } from "frontity/types";
import Script from "./script";
import { useInView } from "react-intersection-observer";

type TweetType = React.FC<Connect<Package, any>>;

const Tweet: TweetType = ({ children, ...props }) => {
  const [ref, onScreen] = useInView({
    rootMargin: "400px",
    triggerOnce: true,
  });

  return (
    <>
      <blockquote ref={ref} {...props}>
        {children}
      </blockquote>
      {onScreen && <Script src="https://platform.twitter.com/widgets.js" />}
    </>
  );
};

export default Tweet;
