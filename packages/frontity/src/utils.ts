import { readdirSync } from "fs";

// This function checks if the path passed is an empty directory
// or an empty GitHub repository.
export const isEmptyDir = (path: string = process.cwd()): boolean => {
  try {
    // Get the content of the path.
    const dirContent = readdirSync(path);

    // Return true if the path is empty.
    if (!dirContent.length) return true;

    // Define a list of files/dirs allowed in an empty GitHub repo.
    const allowedContent = ["readme.md", "license", ".gitignore", ".git"];

    // Return true if all the content in path is allowed.
    if (
      !dirContent.filter(
        content => !allowedContent.includes(content.toLowerCase())
      ).length
    )
      return true;
  } catch (error) {
    // Throw if the path does not exist.
    if (error.code === "ENOENT")
      throw new Error("The path provided to `isEmptyDir` does not exist.");
  }

  // Return false if the path is not empty or does not contain an
  // empty GitHub repo.
  return false;
};

// This functions checks if the path passed is a Git repository.
export const isGitRepository = (path: string = process.cwd()): boolean => {
  try {
    // Gets the content of the path.
    const dirContent = readdirSync(path);

    // Returns true if the dir contains a `.git` folder.
    if (dirContent.includes(".git")) return true;
  } catch (error) {
    if (error.code === "ENOENT")
      throw new Error("The path provided to `isGitRepository` does not exist.");
  }

  // Returns false if the dir does not contain a `.git` folder.
  return false;
};
