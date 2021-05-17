import execa from "execa";

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

/**
 * Start a container and return its ID.
 *
 * @returns The ID of the container.
 */
export async function startContainer() {
  // start the container
  const { stdout: containerId } = await execa.command(
    "docker run --rm -i -d frontity-cli node",
    {
      stdio: "pipe",
    }
  );
  return containerId;
}

/**
 * Run an arbitrary command in a container.
 *
 * @param cmd - The command to execute.
 * @param containerId - The ID of the container.
 * @param options - The `options` option of child_process.
 * @returns Stdout returned from the command.
 */
export async function runCommand(
  cmd: string,
  containerId: string,
  options?: {
    /**
     * Stdio option of child_process.exec.
     */
    stdio?: ["ignore", "pipe", "inherit"];
  }
) {
  const { stdout } = await execa(
    "docker",
    ["exec", "-i", containerId, "sh", "-c", cmd],
    options
  );

  return stdout;
}

/**
 * A helper function to test containers.
 *
 * @param callback - The callback function.
 * @returns - A function ready to be passed to a jest test.
 */
export const testContainer = async (
  callback: (callback: TestContainerCallbackOptions) => any
) => {
  let containerId: string;
  try {
    containerId = await startContainer();
    await callback({
      containerId,
      runCommand: (cmd, options) => runCommand(cmd, containerId, options),
    });
  } finally {
    await execa.command(`docker rm --force ${containerId}`, {
      stdio: "ignore",
    });
  }
};
