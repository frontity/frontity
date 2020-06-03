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

export const connect = originalConnect as ConnectFunction;
export const createStore = originalCreateStore as CreateStore;

import nodeFetch from "node-fetch";
export const fetch = (nodeFetch as any) as WindowOrWorkerGlobalScope["fetch"];

import decodeClient from "./utils/decode/client";
import decodeServer from "./utils/decode/server";

export const decode =
  typeof window !== "undefined" ? decodeClient : decodeServer;

export { URL } from "url";

export { default as useFills } from "./utils/slot-and-fill/use-fills";
