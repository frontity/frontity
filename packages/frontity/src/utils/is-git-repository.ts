import { readdirSync } from "fs-extra";
import checkMandatoryParams from "./check-mandatory-params";

// This functions checks if the path passed is a Git repository.
export default (path: string): boolean => {
  checkMandatoryParams({ path });

  try {
    // Gets the content of the path.
    const dirContent = readdirSync(path);

    // Returns true if the dir contains a `.git` folder.
    if (dirContent.includes(".git")) return true;
  } catch (error) {
    // Throw if path does not exist.
    if (error.code === "ENOENT")
      throw new Error("The path provided to `isGitRepository` does not exist.");
  }

  // Returns false if the dir does not contain a `.git` folder.
  return false;
};
