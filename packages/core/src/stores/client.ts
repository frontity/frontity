import { createOvermind } from "overmind";
import { Namespace } from "@frontity/types/namespace";
import getConfig from "./config";
import settings from "./settings/client";

export default ({
  namespaces
}: {
  namespaces: { [key: string]: Namespace };
}) => {
  const config = getConfig({ namespaces, settings });
  return createOvermind(config, { name: "Frontity" });
};
