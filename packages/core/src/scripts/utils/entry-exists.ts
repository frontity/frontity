import { resolve } from "path";
import { pathExists } from "fs-extra";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

// Check if the entry point exists using all the possible extensions.
export default async (path: string): Promise<string | false> => {
  const allExist = await Promise.all(
    extensions.map(async (extension) => {
      const exists = await pathExists(
        resolve(process.cwd(), "node_modules", `${path}${extension}`)
      );
      if (exists) return extension;
      return false;
    })
  );
  return allExist.reduce((prev, curr) => prev || curr, false);
};
