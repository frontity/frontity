import { createOvermind } from "overmind";
import { namespaced } from "overmind/config";
import { Namespace } from "@frontity/types/namespace";

export default ({
  namespaces,
  name
}: {
  namespaces: { [key: string]: Namespace };
  name: string;
}) => {
  const config = namespaced(
    Object.entries(namespaces).reduce((config, [namespace, module]) => {
      if (module.Store) config[namespace] = module.Store;
      return config;
    }, {})
  );
  return createOvermind(config, { name });
};
