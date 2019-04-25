import { createOvermind } from "overmind";
import { Namespace } from "@frontity/types/namespace";
import getConfig from "./utils/config";

export default ({
  namespaces
}: {
  namespaces: { [key: string]: Namespace };
}) => {
  const config = getConfig({ namespaces });
  return createOvermind(config);
};
