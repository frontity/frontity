import { ChunkExtractor } from "@loadable/server";

interface Stats {
  assetsByChunkName: { [key: string]: string };
}

export const getStats = async ({
  target
}: {
  target: "module" | "es5";
}): Promise<Stats | false> => {
  try {
    const json = (await import(`build/bundling/chunks.${target}.json`)) as Stats;
    return json;
  } catch (e) {
    return false;
  }
};

export const hasEntryPoint = ({
  site,
  stats
}: {
  site: string;
  stats: Stats;
}): boolean => !!stats.assetsByChunkName[site];

export const getScriptArray = ({ tags }: { tags: string }) => {
  tags.match(/data-chunk="((.*?))"/g).map(str => /"(.*?)"/.exec(str)[1]);
};

export const getBothScriptTags = ({
  extractor,
  moduleStats,
  es5Stats
}: {
  extractor: ChunkExtractor;
  moduleStats: Stats;
  es5Stats: Stats;
}): string => {
  // Get array of assets. This is an internal API but I am going to open
  // an issue to see if they want to export a function that returns the
  // assets in an array.
  (extractor as any).getMainAssets("script").map(chunk => chunk.chunk);

  // Get module with type="module".

  const moduleTags = extractor
    .getScriptTags()
    .replace(/async/g, 'async type="module"');

  // Get es5 with "nomodule".
  const es5Tags = extractor
    .getScriptTags()
    .replace(/\.module\./g, ".es5.")
    .replace(/async/g, "async nomodule")
    .replace(/<script id.*?<\/script>\n/, "");

  return `${moduleTags}\n${es5Tags}`;
};
