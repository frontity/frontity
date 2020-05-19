import { useMemo } from "react";
import { useConnect } from "frontity";
import WpSource from "@frontity/wp-source/types";
import TinyRouter from "@frontity/tiny-router/types";

export default () => {
  const { state } = useConnect<WpSource & TinyRouter>();

  const pages = (state.router.state.pages || []).map((page) =>
    state.source.get(page)
  );

  if (!start.isArchive) return [];

  // Recursively concat items of all pages.
  const getItems = (link: string) => {
    if (!link) return [];
    const data = state.source.get(link);
    if (data.isArchive && data.isReady) {
      return data.items.concat(getItems(data.next));
    }
    return [];
  };

  return getItems(start.link);
};
