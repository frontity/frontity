import { ConnectFunction, CreateStore } from "@frontity/types/src/connect";
export { css, Global, keyframes } from "@emotion/core";
export { default as styled } from "@emotion/styled";
export { Helmet as Head } from "react-helmet";
export { default as loadable } from "@loadable/component";
import originalConnect, {
  createStore as originalCreateStore
} from "@frontity/connect";

export const connect = originalConnect as ConnectFunction;
export const createStore = originalCreateStore as CreateStore;
