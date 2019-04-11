import { readdirSync } from "fs-extra";
import checkMandatoryParams from "./check-mandatory-params";

// This function checks if the absolute path passed is an empty
// directory or an empty GitHub repository.
export default (path: string): boolean => {
  checkMandatoryParams({ path });

  try {
    // Get the content of the path.
    const dirContent = readdirSync(path);

    // Define a list of files/dirs allowed in an empty GitHub repo.
    const allowedContent = ["readme.md", "license", ".gitignore", ".git"];

    // Return true if the path is empty or if all the content in the
    // path is allowed.
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
