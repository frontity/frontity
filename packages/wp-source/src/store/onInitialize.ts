// import { OnInitialize } from "../types";

const onInitialize = async ({
  state,
  effects
}) => {
  // get API default values from settins
  // TODO - change this to match the settings API 
  const { apiUrl, isCom } = state.settings.packages.source;
  effects.source.api.init({ apiUrl, isCom });

  // TODO - add default handlers for URLs

};

export default onInitialize;