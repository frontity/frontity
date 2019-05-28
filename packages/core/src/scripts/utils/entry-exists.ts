import { resolve } from "path";
import { pathExists } from "fs-extra";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

// Check if the entry point exists using all the possible extensions.
export default async (path: string) => {
  const allExist = await Promise.all(
    extensions.map(async extension => {
      return await pathExists(
        resolve(process.cwd(), "node_modules", `${path}${extension}`)
      );
    })
  );
  return allExist.reduce((prev, curr) => prev || curr, false);
};
