export { css, Global, keyframes } from "@emotion/core";
export { default as styled } from "@emotion/styled";
export { Helmet as Head, HelmetProvider } from "react-helmet-async";
export { default as loadable } from "@loadable/component";
export { observe, batch } from "@frontity/connect";

import { ConnectFunction, CreateStore } from "@frontity/types/src/connect";
import originalConnect, {
  createStore as originalCreateStore
} from "@frontity/connect";

export const connect = originalConnect as ConnectFunction;
export const createStore = originalCreateStore as CreateStore;

import nodeFetch from "node-fetch";
export const fetch = (nodeFetch as any) as GlobalFetch["fetch"];

export { URL } from "url";
