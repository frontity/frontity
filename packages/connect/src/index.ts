import { Store, State, ProxifyOptions, Context, Actions } from "../types";

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
