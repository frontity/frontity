import { normalize } from "normalizr";
import { Fetch, Register, Get, Populate, Entity } from "./types";
import * as schemas from "../schemas";

export const fetch: Fetch = async (ctx, { name, page }) => {
  const { data } = ctx.state.source;
  const { resolver } = ctx.effects.source;

  if (!page && data[name]) return;
  if (page && data[name] && data[name].page[page]) return;

  // init data
  const nameData: any = data[name] || {};
  data[name] = nameData; // asign it back

  nameData.isFetching = true;
  await resolver.match(ctx, { name, page });
  nameData.isFetching = false;
};

export const register: Register = ({ effects }, { pattern, handler }) => {
  const { resolver } = effects.source;
  resolver.add(pattern, handler);
};

export const get: Get = async ({ state, effects }, { endpoint, params }) => {
  const { siteUrl, isWpCom } = state.settings.packages["wp-source"];
  return effects.source.api.get({ endpoint, params, siteUrl, isWpCom });
};

export const populate: Populate = async ({ state, actions }, { response }) => {
  const result = normalize(
    response,
    response instanceof Array ? schemas.list : schemas.entity
  );

  await Promise.all(
    Object.entries(result.entities).map(([, single]) =>
      Promise.all(
        Object.entries(single).map(async ([, entity]) => {
          const { type, id, link } = entity;
          const name = new URL(link).pathname;
          state.source[type][id] = entity;
          await actions.source.fetch({ name });
        })
      )
    )
  );
};
