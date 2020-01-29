import { resolve } from "path";
import omit from "lodash.omit";

import { EventPromised } from "../utils/eventPromised";
import * as createCmd from "../commands/create";
import create from "../cli/create";
import * as inquirer from "inquirer";
import * as utils from "../utils";

jest.mock("../commands/create");
jest.mock("inquirer");

const mockedCreateCmd = createCmd as jest.Mocked<typeof createCmd>;
const mockedInquirer = inquirer as jest.Mocked<typeof inquirer>;
const mockedUtils = utils as any;

describe("CLI create", () => {
  beforeEach(() => {
    mockedCreateCmd.default.mockReset();
    mockedCreateCmd.default.mockReturnValue(
      new EventPromised(resolve => resolve())
    );
    mockedInquirer.prompt.mockReset();
    mockedInquirer.prompt
      .mockResolvedValueOnce({
        name: "test-project"
      })
      .mockResolvedValueOnce({
        theme: "test-theme"
      });
    mockedUtils.errorLogger = jest.fn();
  });

  const options = {
    name: undefined,
    typescript: undefined,
    useCwd: undefined,
    theme: undefined,
    prompt: true
  };

  test("frontity create", async () => {
    await create(options);

    expect(mockedInquirer.prompt).toHaveBeenCalledTimes(3);
    expect(mockedInquirer.prompt.mock.calls[0][0]).toMatchObject([
      { message: "Enter a name for the project:" }
    ]);
    expect(mockedInquirer.prompt.mock.calls[1][0]).toMatchObject([
      { message: "Pick a starter theme to clone:" }
    ]);

    expect(mockedInquirer.prompt.mock.calls[2][0]).toMatchObject([
      { message: "Do you want to receive framework updates by email?" },
      { message: "Please, enter your email:" }
    ]);
    expect(mockedInquirer.prompt.mock.calls).toMatchSnapshot();
  });

  test("frontity create 'test-project'", async () => {
    mockedInquirer.prompt.mockReset();
    mockedInquirer.prompt.mockResolvedValueOnce({
      theme: "test-theme"
    });

    const name = "test-project";
    await create({ ...options, name });

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // omit path because it can vary depending on environment
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name: "test-project",
      theme: "test-theme",
      typescript: false,
      path: resolve(process.cwd(), name)
    });
  });

  test("frontity create 'test-project' --typescript", async () => {
    const name = "test-project";
    const typescript = true;

    await create({ ...options, name, typescript });

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // omit path because it can vary depending on environment
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name: name,
      theme: undefined,
      typescript,
      path: resolve(process.cwd(), name)
    });
  });

  test("frontity create --no-prompt", async () => {
    try {
      await create({ ...options, typescript: true, prompt: false });
    } catch (err) {
      expect(err.message).toBe("You need to provide the name for the project");
    }
  });

  test("FRONTITY_NAME='test-project'; frontity create --no-prompt", async () => {
    const name = "test-project";
    process.env.FRONTITY_NAME = name;

    await create(options);

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // omit path because it can vary depending on environment
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name,
      theme: undefined,
      typescript: false,
      path: resolve(process.cwd(), name)
    });
  });

  test("FRONTITY_TYPESCRIPT='true'; frontity create 'test-project' --no-prompt", async () => {
    const name = "test-project";
    process.env.FRONTITY_TYPESCRIPT = "true";

    await create({ ...options, name });

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // omit path because it can vary depending on environment
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name,
      theme: undefined,
      typescript: true,
      path: resolve(process.cwd(), name)
    });
  });

  test("frontity create 'test-project' --theme 'test-theme'", async () => {
    const name = "test-project";
    const theme = "test-theme";
    await create({ ...options, name, theme });

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // omit path because it can vary depending on environment
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name,
      theme,
      typescript: true,
      path: resolve(process.cwd(), name)
    });
  });
});
