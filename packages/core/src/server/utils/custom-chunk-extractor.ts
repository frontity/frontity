import { ChunkExtractor } from "@loadable/server";

/**
 * Custom ChunkExtractor class to override `preload` with `modulepreload` based
 * on asset filename.
 */
export class CustomChunkExtractor extends ChunkExtractor {
  /**
   * The `getPreAssets` method.
   *
   * @returns A list of assets.
   */
  getPreAssets() {
    const assets = super.getPreAssets();
    return assets.map((asset) => {
      if (asset.filename.indexOf(".module.") !== -1) {
        asset.linkType = "modulepreload";
      }

      return asset;
    });
  }
}
