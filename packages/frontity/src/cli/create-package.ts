import ora from "ora";
import chalk from "chalk";
import { normalize } from "path";
import { prompt, Question } from "inquirer";
import createPackageCommand from "../commands/create-package";
import {
  errorLogger,
  isFrontityProjectRoot,
  isThemeNameValid,
  isNamespaceValid,
  log,
  toCamelCase,
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
   * The Frontity CLI will prompt to provide a value if both this CLI argument and
   * the `FRONTITY_CREATE_PACKAGE_NAME` env variable are missing and `prompt` is false.
   *
   * @example "my-frontity-package"
   */
  name: string;

  /**
   * The namespace that should be used to create this package.
   *
   * It can also be configured using the `FRONTITY_CREATE_PACKAGE_NAMESPACE`
   * env variable.
   *
   * The Frontity CLI will prompt to provide a value if both this CLI argument and the
   * `FRONTITY_CREATE_PACKAGE_NAMESPACE` env variable are missing and `prompt` is false.
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
 * Ensures a valid namespace format is kept, based on the input value.
 * @param value {string} Namespace value
 * @returns {string}
 */
const ensureValidNamespaceFormat = (value: string): string => {
  if (!isNamespaceValid(value)) {
    const parsedNamespace = toCamelCase(value);
    log(
      chalk.yellow(
        `The provided namespace value, "${value}", contains invalid characters. It'll be converted to a valid format: "${parsedNamespace}"`
      )
    );
    return parsedNamespace;
  }

  return value;
};

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
    options.namespace = ensureValidNamespaceFormat(namespace);
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
    options.namespace = ensureValidNamespaceFormat(answers.namespace);
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
