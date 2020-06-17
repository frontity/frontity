import createPackage from "../create-package";
import * as steps from "../../steps/";
import * as stepsCmd from "../../steps/create-package";

jest.mock("../../steps/");
jest.mock("../../steps/create-package");

const mockedSteps = steps as jest.Mocked<typeof steps>;
const mockedStepsCmd = stepsCmd as jest.Mocked<typeof stepsCmd>;

describe("create-package", () => {
  beforeEach(() => {
    mockedStepsCmd.createPackageJson.mockReset();
    mockedStepsCmd.createSrcIndexJs.mockReset();
    mockedStepsCmd.installPackage.mockReset();
    mockedSteps.ensureProjectDir.mockReset();
    mockedSteps.revertProgress.mockReset();
  });

  test("goes through all steps", async () => {
    await createPackage({
      name: "my-package",
      namespace: "myPackage",
      projectPath: "/User/Frontity/Code/my-frontity-project",
      packagePath: "./packages",
    });

    expect(mockedSteps.ensureProjectDir.mock.calls).toMatchSnapshot();
    expect(mockedStepsCmd.createPackageJson.mock.calls).toMatchSnapshot();
    expect(mockedStepsCmd.createSrcIndexJs.mock.calls).toMatchSnapshot();
    expect(mockedStepsCmd.installPackage.mock.calls).toMatchSnapshot();
    expect(mockedSteps.revertProgress).not.toHaveBeenCalled();
  });

  test("should revert changes if something fail and files have been created", async () => {
    // Project directory exist.
    mockedSteps.ensureProjectDir.mockResolvedValue(true);

    // It fails while creating `package.json` file.
    mockedStepsCmd.createPackageJson.mockRejectedValue(
      new Error("Random error")
    );

    try {
      await createPackage({
        name: "my-package",
        namespace: "myPackage",
        projectPath: "/User/Frontity/Code/my-frontity-project",
        packagePath: "./packages",
      });
    } catch (error) {
      // Error is thrown again after being catched by `createPackage`.
    }

    // Other steps are not called.
    expect(mockedStepsCmd.createSrcIndexJs).not.toHaveBeenCalled();
    expect(mockedStepsCmd.installPackage).not.toHaveBeenCalled();

    // Changes are reverted.
    expect(mockedSteps.revertProgress.mock.calls).toMatchSnapshot();
  });
});
