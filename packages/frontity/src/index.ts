import "@frontity/type-declarations";

export { css, Global, keyframes } from "@emotion/core";
export { default as styled } from "@emotion/styled";
export { Helmet as Head, HelmetProvider } from "react-helmet-async";
export { default as loadable } from "@loadable/component";
export { observe, batch, useConnect } from "@frontity/connect";
export { error, warn } from "@frontity/error";

import { ConnectFunction, CreateStore } from "@frontity/types/src/connect";
import originalConnect, {
  createStore as originalCreateStore,
} from "@frontity/connect";

/**
 * Connect a React component to the Frontity state manager.
 *
 * This function returns the same component it receives but passing
 * `state`, `actions` and `libraries` as properties, and making it reactive
 * to changes on the state.
 *
 * @param Comp React component
 * @param options Options object (see {@link connect})
 *
 * @return Input component connected to Frontity state
 */
export const connect = originalConnect as ConnectFunction;
export const createStore = originalCreateStore as CreateStore;

import nodeFetch from "node-fetch";
export const fetch = (nodeFetch as any) as WindowOrWorkerGlobalScope["fetch"];

import decodeClient from "./utils/decode/client";
import decodeServer from "./utils/decode/server";

export const decode =
  typeof window !== "undefined" ? decodeClient : decodeServer;

export { URL } from "url";
