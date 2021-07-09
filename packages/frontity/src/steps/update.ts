import execa from "execa";
import ncu from "npm-check-updates";

/**
 * The options of the {@link update} function.
 */
interface UpdateOptions {
  /**
   * The path of the package.json file.
   */
  path: string;
}

/**
 * Update the dependencies of the specificed folder.
 *
 * @param options - Defined in {@link UpdateOptions}.
 * @returns The dependencies that were updated.
 */
const update = async ({ path }: UpdateOptions) => {
  return await ncu.run({
    packageFile: path,
    upgrade: true,
    target: "minor",
  });
};

/**
 * Update the dependencies of the root project.
 */
export const updateProject = async () => {
  // return await update({ path: "./package.json" });
  await execa.command("npx npm-check-updates -u -t minor", {
    stdio: "inherit",
  });
};
