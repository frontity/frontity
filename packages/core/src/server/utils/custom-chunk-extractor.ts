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
    // eslint-disable-next-line @typescript-eslint/ban-types
    const assets = (ChunkExtractor as Function).prototype.getPreAssets.call(
      this
    );
    return assets.map((asset) => {
      if (asset.filename.indexOf(".module.") !== -1) {
        asset.linkType = "modulepreload";
      }

      return asset;
    });
  }
}
