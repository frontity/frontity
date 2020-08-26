import { resolve } from "path";
import ora from "ora";
import chalk from "chalk";
import { prompt, Question, ListQuestion } from "inquirer";
import createCommand from "../commands/create";
import { subscribe } from "../steps";
import { errorLogger, log } from "../utils";
import { Options } from "../steps/types";

/**
 * Options for the {@link create} command.
 */
interface CreateOptions {
  /**
   * The name of your Frontity project. It will also be the name of the folder
   * that this command will create for you with the files of your Frontity
   * project inside.
   */
  name: string;

  /**
   * The theme that will be installed. It can be a npm package.
   *
   * @defaultValue `@frontity/mars-theme`
   */
  theme?: string;

  /**
   * Whether to bootstrap the project with TypeScript files.
   *
   * @defaultValue false
   */
  typescript?: boolean;

  /**
   * Whether to create the files inside the current working directory instead
   * of a new folder.
   *
   * @defaultValue false
   */
  useCwd?: boolean;

  /**
   * Whether to prompt the user in the CLI or to run the command silently,
   * using only the CLI args and environment variables found.
   *
   * @defaultValue true
   */
  prompt?: boolean;
}

/**
 * The create CLI command, usually run with `npx frontity create`.
 *
 * It takes args from the CLI and checks for the presence of environment
 * variables. Then, it runs the create command programatically.
 *
 * @param options - Defined in {@link CreateOptions}.
 */
const create = async ({
  name,
  theme,
  typescript,
  useCwd,
  prompt: promptUser,
}: CreateOptions) => {
  name = name || process.env.FRONTITY_CREATE_NAME;
  theme = theme || process.env.FRONTITY_CREATE_THEME;
  typescript = typescript || !!process.env.FRONTITY_CREATE_TYPESCRIPT;
  useCwd = useCwd || !!process.env.FRONTITY_CREATE_USE_CWD;

  const options: Options = {};

  if (name) {
    // Name was passed as arg or env variable.
    options.name = name;
  } else if (promptUser) {
    // Name was missing, but we can prompt.
    const questions: Question[] = [
      {
        name: "name",
        type: "input",
        message: "Enter a name for the project:",
        default: "my-frontity-project",
      },
    ];
    const answers = await prompt(questions);
    options.name = answers.name;
  } else {
    // Name is missing and we can't prompt. Stop.
    errorLogger(new Error("You need to provide the name for the project."));
  }

  // Theme was passed as arg or env variable.
  if (theme) {
    options.theme = theme;
  } else if (promptUser) {
    // Theme was missing, but we can prompt.
    const questions: ListQuestion[] = [
      {
        name: "theme",
        type: "list",
        message: "Pick a starter theme to clone:",
        default: "@frontity/mars-theme",
        choices: [
          {
            name: "@frontity/mars-theme (recommended)",
            value: "@frontity/mars-theme",
          },
          {
            name: "@frontity/twentytwenty-theme",
            value: "@frontity/twentytwenty-theme",
          },
        ],
      },
    ];
    const answers = await prompt(questions);
    options.theme = answers.theme;
  } else {
    // Add the default option.
    options.theme = "@frontity/mars-theme";
  }

  options.typescript = typescript;
  options.path = useCwd ? process.cwd() : resolve(process.cwd(), options.name);

  try {
    // Get the emitter for `create`
    const emitter = createCommand(options);
    emitter.on("message", (message, action) => {
      if (action) ora.promise(action, message);
      else log(message);
    });

    await emitter;

    log(chalk.bold("\nFrontity project created.\n"));

    if (promptUser) {
      const subscribeQuestions: Question[] = [
        {
          name: "subscribe",
          type: "confirm",
          message: "Do you want to receive framework updates by email?",
          default: false,
        },
        {
          name: "email",
          type: "input",
          message: "Please, enter your email:",
          when: (answers) => answers.subscribe,
        },
      ];
      const answers = await prompt(subscribeQuestions);

      if (answers.subscribe) {
        emitter.on("subscribe", (message, action) => {
          if (action) ora.promise(action, message);
          else log(message);
        });

        await subscribe(answers.email);

        log("\nThanks for subscribing! 😃");
      } else {
        log(
          `\nOk, that's fine! 😉\nYou can subscribe at any point with ${chalk.bold.green(
            "npx frontity subscribe <email>"
          )}.`
        );
      }
    }

    log(
      `\nRun ${chalk.bold.green(
        `cd ${options.name} && npx frontity dev`
      )} and have fun! 🎉\n\nYou can find docs at ${chalk.underline.magenta(
        "https://docs.frontity.org/"
      )}.\nFor technical support and assistance please join our community at ${chalk.underline.magenta(
        "https://community.frontity.org/"
      )}.\n`
    );
  } catch (error) {
    errorLogger(error);
  }
};

export default create;
