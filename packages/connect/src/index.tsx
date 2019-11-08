/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ComponentType, FunctionComponent } from "react";
import {
  Store,
  State,
  ProxifyOptions,
  Context,
  Actions,
  FilterStore
} from "../types";

export const proxifyState = <StoreType extends Store>(
  rawStore: StoreType,
  context?: Context,
  options?: ProxifyOptions
): State<StoreType> => {
  return rawStore.state as State<StoreType>; // Overwrite type until it's implemented.
};

export const proxifyActions = <StoreType extends Store>(
  rawStore: StoreType,
  context?: Context,
  options?: ProxifyOptions
): Actions<StoreType> => {
  return rawStore.actions as Actions<StoreType>; // Overwrite type until it's implemented.
};

const connect = <Props extends Store>(
  Component: ComponentType<Props>,
  options?: ProxifyOptions
): FunctionComponent<FilterStore<Props>> => {
  return Component as FunctionComponent<FilterStore<Props>>;
};

export const Provider: React.FC<{ value: Store }> = ({ children }) => (
  <>{children}</>
);

export default connect;
