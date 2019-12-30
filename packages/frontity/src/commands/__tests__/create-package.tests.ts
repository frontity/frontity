import createPackage from "../create-package";
import inquirer from "inquirer";
import * as utils from "../../utils";

jest.mock("../../steps/create-package");
jest.mock("inquirer");
jest.mock("events");
jest.mock("../../utils");

const mockedInquirer = inquirer as jest.Mocked<typeof inquirer>;
const mockedUtils = utils as jest.Mocked<typeof utils>;
const mockedExit = jest.spyOn(process, "exit");

beforeEach(() => {
  mockedInquirer.prompt.mockRestore();
  mockedUtils.isFrontityProjectRoot.mockRestore();
  mockedExit.mockRestore();
  mockedExit.mockImplementation(() => {
    throw new Error();
  });
});

describe("create-package", () => {
  test("should not ask for passed options", async () => {
    const name = "example-theme";
    const namespace = "theme";
    await createPackage(name, { namespace });
    expect(mockedInquirer.prompt).not.toHaveBeenCalled();
  });

  test("should ask for missing name", async () => {
    mockedInquirer.prompt.mockResolvedValueOnce({ name: "example-theme" });

    const name = undefined;
    const namespace = "theme";
    await createPackage(name, { namespace });
    expect(mockedInquirer.prompt).toHaveBeenCalled();
    expect(mockedInquirer.prompt.mock.calls).toMatchSnapshot();
  });

  test("should ask for missing namespace", async () => {
    mockedInquirer.prompt.mockResolvedValueOnce({ namespace: "theme" });

    const name = "example-theme";
    const namespace = undefined;
    await createPackage(name, { namespace });
    expect(mockedInquirer.prompt).toHaveBeenCalled();
    expect(mockedInquirer.prompt.mock.calls).toMatchSnapshot();
  });

  test.todo("should fail in a invalid directory");
  test.todo("should work in a valid directory");
  test.todo("should fail with an invalid name");
  test.todo("should work with a valid name");
  test.todo("should work with a valid name with scope");
  test.todo("should fail with an invalid namespace");
  test.todo("should work with a valid namespace");
});
