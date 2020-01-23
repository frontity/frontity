import createPackage from "../cli/create-package";
import inquirer from "inquirer";
import * as utils from "../utils";
import * as createCmd from "../commands/create-package";
import { EventPromised } from "../utils/eventPromised";

jest.mock("inquirer");
jest.mock("../commands/create-package");

const mockedInquirer = inquirer as jest.Mocked<typeof inquirer>;
const mockedUtils = utils as any;
const mockedExit = jest.spyOn(process, "exit");
const mockedCreate = createCmd as jest.Mocked<typeof createCmd>;

describe("create-package", () => {
  beforeEach(() => {
    mockedInquirer.prompt.mockRestore();
    mockedUtils.isFrontityProjectRoot = jest.fn();
    mockedUtils.errorLogger = jest.fn();
    mockedCreate.default.mockReset();
    mockedCreate.default.mockReturnValue(
      new EventPromised(resolve => resolve())
    );
    mockedExit.mockRestore();
    mockedExit.mockImplementation(() => {
      throw new Error();
    });
  });

  test("should not ask for passed options", async done => {
    const name = "example-theme";
    const namespace = "theme";
    const prompt = true;
    await createPackage({ name, namespace, prompt });
    expect(mockedInquirer.prompt).not.toHaveBeenCalled();
    done();
  });

  test("should ask for missing name", async () => {
    mockedInquirer.prompt.mockResolvedValueOnce({ name: "example-theme" });

    const name = undefined;
    const namespace = "theme";
    const prompt = true;
    await createPackage({ name, namespace, prompt });
    expect(mockedInquirer.prompt).toHaveBeenCalled();
    expect(mockedInquirer.prompt.mock.calls).toMatchSnapshot();
  });

  test("should ask for missing namespace", async () => {
    mockedInquirer.prompt.mockResolvedValueOnce({ namespace: "theme" });

    const name = "example-theme";
    const namespace = undefined;
    const prompt = true;
    await createPackage({ name, namespace, prompt });
    expect(mockedInquirer.prompt).toHaveBeenCalled();
    expect(mockedInquirer.prompt.mock.calls).toMatchSnapshot();
  });

  test("should respect the --no-prompt flag", () => {});

  test.todo("should fail in a invalid directory");
  test.todo("should work in a valid directory");
  test.todo("should fail with an invalid name");
  test.todo("should work with a valid name");
  test.todo("should work with a valid name with scope");
  test.todo("should fail with an invalid namespace");
  test.todo("should work with a valid namespace");
});
