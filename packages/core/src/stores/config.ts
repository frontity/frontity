import { Namespace } from "@frontity/types/namespace";
import { namespaced } from "overmind/config";
import { Settings } from "./settings/types";

export default ({
  namespaces,
  settings
}: {
  namespaces: { [key: string]: Namespace };
  settings: Settings;
}) =>
  namespaced(
    Object.entries(namespaces).reduce(
      (config, [namespace, module]) => {
        if (module.Store) config[namespace] = module.Store;
        return config;
      },
      { settings }
    )
  );
