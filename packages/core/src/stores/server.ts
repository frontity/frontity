// TODO: File left out of Typescript until we change it with our state manager.
import { createOvermind } from "overmind";
import { Namespace } from "@frontity/types/namespace";
import getConfig from "./config";

export default ({
  namespaces
}: {
  namespaces: { [key: string]: Namespace };
}) => {
  const config = getConfig({ namespaces });
  const stores = createOvermind(config, {
    name: "Frontity Server",
    devtools: false
  }) as any;
  const mutationTree = stores.proxyStateTree.getMutationTree();
  stores.state = mutationTree.state;
  stores.hydrate = () => {
    return mutationTree.flush().mutations;
  };
  return { stores, mutationTree };
};
