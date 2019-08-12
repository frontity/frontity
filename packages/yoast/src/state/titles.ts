import { State } from "frontity/types";
import { Data, Author } from "@frontity/source";
import humanize from "string-humanize";
import Yoast from "../../types";
import { getEntity, appendPage, getPage, hasName } from "./utils";

export const dateTitle = ({
  data,
  state
}: {
  data: Data;
  state: State<Yoast>;
}) => {
  // Do nothing if data is not a Date object
  if (!data.isDate) return;

  // Get date values fron data
  const { year, month = 1, day = 1 } = data;

  // Build a "en-US" locale string using date values
  const dateStr = new Date(year, month - 1, day).toLocaleDateString("en-US", {
    formatMatcher: "basic",
    year: "numeric",
    month: data.month && "long",
    day: data.day && "numeric"
  });

  // Get page values from link and data
  const page = getPage(state.router.link);
  const { totalPages } = data;

  // Build and return title
  return appendPage({
    title: `${dateStr} - ${state.frontity.title}`,
    page,
    totalPages
  });
};

export const entityTitle = ({
  data,
  state
}: {
  data: Data;
  state: State<Yoast>;
}) => {
  const entity = getEntity({ data, state });
  const yoastTitle = entity.yoast_meta && entity.yoast_meta.yoast_wpseo_title;
  const defaultTitle = hasName(entity) ? entity.name : entity.title.rendered;

  const title = yoastTitle || `${defaultTitle} - ${state.frontity.title}`;

  if (data.isArchive) {
    const page = getPage(state.router.link);
    const { totalPages } = data;
    return appendPage({ title, page, totalPages });
  }

  return title;
};

export const postArchiveTitle = ({ data, state }) => {
  const title = `${humanize(data.type)} archive - ${state.frontity.title}`;

  if (data.isArchive) {
    const page = getPage(state.router.link);
    const { totalPages } = data;
    return appendPage({ title, page, totalPages });
  }

  return title;
};

export const homeTitle = ({
  data,
  state
}: {
  data: Data;
  state: State<Yoast>;
}) => {
  const title = `${state.frontity.title} - ${state.frontity.description}`;

  if (data.isArchive) {
    const page = getPage(state.router.link);
    const { totalPages } = data;
    return appendPage({ title, page, totalPages });
  }

  return title;
};

export const notFoundTitle = ({ state }: { state: State<Yoast> }) =>
  `Page not found - ${state.frontity.title}`;

export const authorTitle = ({
  data,
  state
}: {
  data: Data;
  state: State<Yoast>;
}) => {
  // Do nothing if data is not an Author object
  if (!data.isAuthor) return;

  const entity = getEntity({ data, state }) as Author;
  const { name } = entity;

  const title = `${name}, Author at ${state.frontity.title}`;

  const page = getPage(state.router.link);
  const { totalPages } = data;
  return appendPage({ title, page, totalPages });
};
