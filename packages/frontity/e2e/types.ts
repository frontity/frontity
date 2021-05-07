import { runCommand } from "./utils";

/**
 * Options for the {@link testContainer} function.
 */
export interface TestContainerCallbackOptions {
  /**
   * The ID of the docker container.
   */
  containerId: string;

  /**
   * The function used to actually run the command inside the container.
   */
  runCommand: (
    cmd: string,
    options?: Record<string, any>
  ) => ReturnType<typeof runCommand>;
}
