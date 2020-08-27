import ora from "ora";
import chalk from "chalk";
import { normalize } from "path";
import { prompt, Question } from "inquirer";
import createPackageCommand from "../commands/create-package";
import {
  errorLogger,
  isFrontityProjectRoot,
  isThemeNameValid,
  log,
} from "../utils";
import { Options } from "../steps/create-package";

/**
 * Options for the create-package command.
 */
interface CreatePackageOptions {
  /**
   * The name of your Frontity package. The create-package command will
   * create a folder with this name, under `/packages`. It will also add the
   * proper dependency in the package.json of your Frontity project.
   *
   * It can be also configured using the `FRONTITY_CREATE_PACKAGE_NAME` env
   * variable.
   *
   * It will be prompted if both the CLI arg and the env variables is missing
   * and the `prompt` is false.
   *
   * @example "my-frontity-package"
   */
  name: string;

  /**
   * The namespace that should be used to create this package.
   *
   * It can be also configured using the `FRONTITY_CREATE_PACKAGE_NAMESPACE`
   * env variable.
   *
   * It will be prompted if both the CLI arg and the env variables is missing
   * and the `prompt` is false.
   *
   * @example "analytics"
   *
   * @defaultValue "theme"
   */
  namespace?: string;

  /**
   * Whether to prompt the user in the CLI or to run the command silently,
   * using only the CLI args and environment variables found.
   *
   * @defaultValue true
   */
  prompt?: boolean;
}

/**
 * The create CLI command, usually run with `npx frontity create-package`.
 *
 * It takes args from the CLI and checks for the presence of environment
 * variables. Then, it runs the create command programatically.
 *
 * @param options - Defined in {@link CreatePackageOptions}.
 */
const createPackage = async ({
  name,
  namespace,
  prompt: promptUser,
}: CreatePackageOptions) => {
  name = name || process.env.FRONTITY_CREATE_PACKAGE_NAME;
  namespace = namespace || process.env.FRONTITY_CREATE_PACKAGE_NAMESPACE;

  if (!promptUser && !name) {
    errorLogger(new Error("You need to provide the name for the package."));
  }

  // Init options.
  const options: Options = {};

  // Validate project location.
  options.projectPath = process.cwd();
  if (!(await isFrontityProjectRoot(options.projectPath))) {
    errorLogger(
      new Error(
        "You must execute this command in the root folder of a Frontity project."
      )
    );
  }

  if (name) {
    // Name was passed as arg or env variable.
    options.name = name;
  } else if (promptUser) {
    // Name was missing, but we can prompt.
    const questions: Question[] = [
      {
        name: "name",
        type: "input",
        message: "Enter the name of the package:",
        default: "my-frontity-package",
      },
    ];
    const answers = await prompt(questions);
    options.name = answers.name;
  } else {
    // Name is missing and we can't prompt. Stop.
    errorLogger(new Error("You need to provide the name of the package."));
  }

  if (namespace) {
    // Namespace was passed as arg or env variable.
    options.namespace = namespace;
  } else if (promptUser) {
    // Namespace was missing, but we can prompt.
    const questions: Question[] = [
      {
        name: "namespace",
        type: "input",
        message: "Enter the namespace of the package:",
        default: "theme",
      },
    ];
    const answers = await prompt(questions);
    options.namespace = answers.namespace;
  } else {
    // Add the default option.
    options.namespace = "theme";
  }

  if (!isThemeNameValid(options.name)) {
    errorLogger(
      new Error(
        "The name of the package is not a valid npm package name. Please start again."
      )
    );
  }

  // Set the package path.
  options.packagePath = normalize(
    `packages/${options.name.replace(/(?:@.+\/)/i, "")}`
  );

  try {
    // Get the emitter for `create-package`.
    const emitter = createPackageCommand(options);

    emitter.on("message", (message, action) => {
      if (action) ora.promise(action, message);
      else log(message);
    });

    // Actually create the package.
    await emitter;
  } catch (error) {
    errorLogger(error);
  }

  log(chalk.bold(`\nNew package "${options.name}" created.\n`));
};

export default createPackage;
