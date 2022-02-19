import { resolve } from "path";
import omit from "lodash.omit";

import create from "../create";
import { EventPromised } from "../../utils/eventPromised";
import * as createCmd from "../../commands/create";
import * as inquirer from "inquirer";
import * as utils from "../../utils";

jest.mock("../../commands/create");
jest.mock("inquirer");

const mockedCreateCmd = createCmd as jest.Mocked<typeof createCmd>;
const mockedInquirer = inquirer as jest.Mocked<typeof inquirer>;
const mockedUtils = utils as any;

describe("CLI create", () => {
  beforeEach(() => {
    mockedCreateCmd.default.mockReset();
    mockedCreateCmd.default.mockReturnValue(
      new EventPromised((resolve) => resolve())
    );
    mockedInquirer.prompt.mockReset();
    mockedUtils.errorLogger = jest.fn((error) => {
      throw error;
    });

    delete process.env.FRONTITY_CREATE_TYPESCRIPT;
    delete process.env.FRONTITY_CREATE_NO_GIT;
  });

  const options = {
    name: undefined,
    typescript: undefined,
    noGit: undefined,
    useCwd: undefined,
    theme: undefined,
    prompt: true,
  };

  test("frontity create", async () => {
    mockedInquirer.prompt
      .mockResolvedValueOnce({
        name: "test-project",
      })
      .mockResolvedValueOnce({
        theme: "test-theme",
      })
      .mockResolvedValueOnce("n");

    await create(options);

    expect(mockedInquirer.prompt).toHaveBeenCalledTimes(2);
    expect(mockedInquirer.prompt.mock.calls[0][0]).toMatchObject([
      { message: "Enter a name for the project:" },
    ]);
    expect(mockedInquirer.prompt.mock.calls[1][0]).toMatchObject([
      { message: "Pick a starter theme to clone:" },
    ]);

    // expect(mockedInquirer.prompt.mock.calls[2][0]).toMatchObject([
    //   { message: "Do you want to receive framework updates by email?" },
    //   { message: "Please, enter your email:" },
    // ]);
    expect(mockedInquirer.prompt.mock.calls).toMatchSnapshot();
  });

  test("frontity create 'test-project'", async () => {
    mockedInquirer.prompt
      .mockResolvedValueOnce({
        theme: "test-theme",
      })
      .mockResolvedValueOnce("n");

    const name = "test-project";
    await create({ ...options, name });

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // omit path because it can vary depending on environment
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name: "test-project",
      theme: "test-theme",
      typescript: false,
      noGit: false,
      path: resolve(process.cwd(), name),
    });
  });

  test("frontity create 'test-project' --typescript", async () => {
    mockedInquirer.prompt.mockResolvedValueOnce("Y");

    const name = "test-project";
    const typescript = true;

    await create({ ...options, name, typescript });

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // omit path because it can vary depending on environment
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name: name,
      theme: "@frontity/mars-theme-typescript",
      typescript,
      noGit: false,
      path: resolve(process.cwd(), name),
    });
  });

  test("frontity create 'test-project' --no-git", async () => {
    mockedInquirer.prompt
      .mockResolvedValueOnce({
        theme: "test-theme",
      })
      .mockResolvedValueOnce("Y");

    const name = "test-project";
    const noGit = true;

    await create({ ...options, name, noGit });

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // omit path because it can vary depending on environment
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name: name,
      theme: "test-theme",
      typescript: false,
      noGit: true,
      path: resolve(process.cwd(), name),
    });
  });

  test("frontity create --no-prompt", async () => {
    await expect(
      create({ ...options, typescript: true, prompt: false })
    ).rejects.toThrow("You need to provide the name for the project.");
  });

  test("FRONTITY_CREATE__NAME='test-project'; frontity create --no-prompt", async () => {
    const name = "test-project";
    process.env.FRONTITY_CREATE_NAME = name;

    await create({ ...options, prompt: false });

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // Omit path because it can vary depending on environment.
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name,
      theme: "@frontity/mars-theme",
      typescript: false,
      noGit: false,
      path: resolve(process.cwd(), name),
    });
  });

  test("FRONTITY_CREATE_TYPESCRIPT='true'; frontity create 'test-project' --no-prompt", async () => {
    const name = "test-project";
    process.env.FRONTITY_CREATE_TYPESCRIPT = "true";

    await create({ ...options, name, prompt: false });

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // omit path because it can vary depending on environment
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name,
      theme: "@frontity/mars-theme-typescript",
      typescript: true,
      noGit: false,
      path: resolve(process.cwd(), name),
    });
  });

  test("FRONTITY_CREATE_NO_GIT='true'; frontity create 'test-project' --no-prompt", async () => {
    const name = "test-project";
    process.env.FRONTITY_CREATE_NO_GIT = "true";

    await create({ ...options, name, prompt: false });

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // omit path because it can vary depending on environment
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name,
      theme: "@frontity/mars-theme",
      noGit: true,
      typescript: false,
      path: resolve(process.cwd(), name),
    });
  });

  test("frontity create 'test-project' --theme 'test-theme'", async () => {
    mockedInquirer.prompt.mockResolvedValueOnce("n");

    const name = "test-project";
    const theme = "test-theme";
    await create({ ...options, name, theme });

    const params = mockedCreateCmd.default.mock.calls[0][0];
    // omit path because it can vary depending on environment
    expect(omit(params, "path")).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name,
      theme,
      typescript: false,
      noGit: false,
      path: resolve(process.cwd(), name),
    });
  });
});
