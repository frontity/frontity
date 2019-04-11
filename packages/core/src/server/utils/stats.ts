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
  // Get array of assets. This is an non-documented public API but I am going to open
  // an issue to see if they want to export a function that returns the
  // assets in an array.
  const publicPath = (extractor as any).publicPath;
  const assets = (extractor as any)
    .getMainAssets("script")
    .map(chunk => chunk.chunk) as string[];

  const moduleTags = assets.map(
    chunk =>
      `<script async type="module" data-chunk="${chunk}" src="${publicPath}/${
        moduleStats.assetsByChunkName[chunk]
      }"></script>`
  );
  const es5Tags = assets.map(
    chunk =>
      `<script async nomodule data-chunk="${chunk}" src="${publicPath}/${
        es5Stats.assetsByChunkName[chunk]
      }"></script>`
  );

  // Get the tag of a application/json script for loadable. It is a non-public API
  // so I am going to open an issue to see if they want to export a function for this.
  const requiredChunksTag = (extractor as any).getRequiredChunksScriptTag({});

  debugger;

  return [requiredChunksTag, ...moduleTags, ...es5Tags].join("\n        ");
};
