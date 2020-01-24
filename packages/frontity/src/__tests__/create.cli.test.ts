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

  const options = {
    name: undefined,
    typescript: undefined,
    useCwd: undefined,
    theme: undefined,
    prompt: true
  };

  test("frontity create", async done => {
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
    // Don't need to await because we only check the args
    // that the create command was called with
    const name = "test-project";

    create({ ...options, name });

    // the path will differ depending on whether we run the test locally or on
    expect(mockedCreateCmd.default.mock.calls[0][0].name).toMatchSnapshot();
    expect(
      mockedCreateCmd.default.mock.calls[0][0].typescript
    ).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name: name,
      typescript: false,
      path: resolve(process.cwd(), name)
    });
  });

  test("frontity create 'test-project' --typescript", () => {
    // Don't need to await because we only check the args
    // that the create command was called with
    const name = "test-project";
    const typescript = true;

    create({ ...options, name, typescript });

    // the path will differ depending on whether we run the test locally or on
    expect(mockedCreateCmd.default.mock.calls[0][0].name).toMatchSnapshot();
    expect(
      mockedCreateCmd.default.mock.calls[0][0].typescript
    ).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name: name,
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

  test("FRONTITY_NAME='test-project'; frontity create --no-prompt", () => {
    const name = "test-project";
    process.env.FRONTITY_NAME = name;

    // Don't need to await because we only check the args
    // that the create command was called with
    create(options);

    // the path will differ depending on whether we run the test locally or on
    expect(mockedCreateCmd.default.mock.calls[0][0].name).toMatchSnapshot();
    expect(
      mockedCreateCmd.default.mock.calls[0][0].typescript
    ).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name,
      typescript: false,
      path: resolve(process.cwd(), name)
    });
  });

  test("FRONTITY_TYPESCRIPT='true'; frontity create 'test-project' --no-prompt", () => {
    const name = "test-project";
    process.env.FRONTITY_TYPESCRIPT = "true";

    // Don't need to await because we only check the args
    // that the create command was called with
    create({ ...options, name });

    // the path will differ depending on whether we run the test locally or on
    expect(mockedCreateCmd.default.mock.calls[0][0].name).toMatchSnapshot();
    expect(
      mockedCreateCmd.default.mock.calls[0][0].typescript
    ).toMatchSnapshot();

    expect(mockedCreateCmd.default).toHaveBeenCalledWith({
      name: name,
      typescript: true,
      path: resolve(process.cwd(), name)
    });
  });
});
