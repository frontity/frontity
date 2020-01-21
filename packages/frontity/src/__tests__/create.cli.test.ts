import { resolve } from "path";

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
    mockedInquirer.prompt.mockResolvedValue({
      name: "test-project",
      theme: "test-theme"
    });
    mockedUtils.errorLogger = jest.fn();
  });

  test("frontity create", async done => {
    const options = {
      name: undefined,
      typescript: undefined,
      useCwd: undefined,
      prompt: true
    };
    await create(options);

    expect(mockedInquirer.prompt.mock.calls).toMatchSnapshot();
    expect(mockedInquirer.prompt).toHaveBeenCalledTimes(2);
    expect(mockedInquirer.prompt.mock.calls[0][0]).toMatchObject([
      { message: "Enter a name for the project:" },
      { message: "Enter a starter theme to clone:" }
    ]);

    expect(mockedInquirer.prompt.mock.calls[1][0]).toMatchObject([
      { message: "Do you want to receive framework updates by email?" },
      { message: "Please, enter your email:" }
    ]);
    done();
  });

  test("frontity create 'test-project'", () => {
    const options = {
      name: "test-project",
      typescript: undefined,
      useCwd: undefined,
      prompt: true
    };

    // Don't need to await because we only check the args
    // that the create command was called with
    create(options);
    expect(mockedCreateCmd.default.mock.calls).toMatchSnapshot();
    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name: options.name,
      typescript: false,
      path: resolve(process.cwd(), options.name)
    });
  });

  test("frontity create 'test-project' --typescript", () => {
    const options = {
      name: "test-project",
      typescript: true,
      useCwd: undefined,
      prompt: true
    };

    // Don't need to await because we only check the args
    // that the create command was called with
    create(options);
    expect(mockedCreateCmd.default.mock.calls).toMatchSnapshot();
    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name: options.name,
      typescript: true,
      path: resolve(process.cwd(), options.name)
    });
  });

  test("frontity create --no-prompt", async () => {
    const options = {
      name: undefined,
      typescript: true,
      useCwd: undefined,
      prompt: false
    };

    try {
      await create(options);
    } catch (err) {
      expect(err.message).toBe("You need to provide the name for the project");
    }
  });

  test("FRONTITY_NAME='test-project'; frontity create --no-prompt", () => {
    const name = "test-project";
    process.env.FRONTITY_NAME = name;

    const options = {
      name: undefined,
      typescript: undefined,
      useCwd: undefined,
      prompt: false
    };

    // Don't need to await because we only check the args
    // that the create command was called with
    create(options);
    expect(mockedCreateCmd.default.mock.calls).toMatchSnapshot();
    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name,
      typescript: false,
      path: resolve(process.cwd(), name)
    });
  });

  test("FRONTITY_TYPESCRIPT='true'; frontity create 'test-project' --no-prompt", () => {
    process.env.FRONTITY_TYPESCRIPT = "true";

    const options = {
      name: "test-project",
      typescript: undefined,
      useCwd: undefined,
      prompt: false
    };

    // Don't need to await because we only check the args
    // that the create command was called with
    create(options);
    expect(mockedCreateCmd.default.mock.calls).toMatchSnapshot();
    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name: options.name,
      typescript: true,
      path: resolve(process.cwd(), options.name)
    });
  });
});
