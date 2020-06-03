export interface Stats {
  assetsByChunkName: { [key: string]: string };
  publicPath?: string;
}

export interface Extractor {
  publicPath: string;
  getMainAssets: (type: string) => { filename: string }[];
  getRequiredChunksScriptTag: (obj: {}) => string;
}

export const getStats = async ({
  target,
}: {
  target: "module" | "es5";
}): Promise<Stats | false> => {
  try {
    const json = (await import(
      `build/bundling/chunks.${target}.json`
    )) as Stats;
    return json;
  } catch (e) {
    return false;
  }
};

export const hasEntryPoint = ({
  site,
  stats,
}: {
  site: string;
  stats: Stats;
}): boolean => !!stats.assetsByChunkName[site];

// Get our script tags using non public APIs from extractor. Trying to change that in:
// https://github.com/smooth-code/loadable-components/pull/239#issuecomment-482501467
export const getBothScriptTags = ({
  extractor,
  moduleStats,
  es5Stats,
}: {
  extractor: Extractor;
  moduleStats: Stats;
  es5Stats: Stats;
}): string => {
  // Ensure publicPath ends with a slash.
  const publicPath = extractor.publicPath.replace(/\/?$/, "/");

  const chunkNames = extractor
    .getMainAssets("script")
    .map((chunk) => /(.+)\.module/.exec(chunk.filename)[1]) as string[];

  const moduleTags = chunkNames.map(
    (chunk) =>
      `<script async type="module" data-chunk="${chunk}" src="${publicPath}${moduleStats.assetsByChunkName[chunk]}"></script>`
  );
  const es5Tags = chunkNames.map(
    (chunk) =>
      `<script async nomodule data-chunk="${chunk}" src="${publicPath}${es5Stats.assetsByChunkName[chunk]}"></script>`
  );

  const requiredChunksTag = extractor.getRequiredChunksScriptTag({});

  return [requiredChunksTag, ...moduleTags, ...es5Tags].join("\n        ");
};
