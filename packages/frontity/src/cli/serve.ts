import serve from "../commands/serve";
import { errorLogger } from "../utils";

export default async ({
  port = process.env.FRONTITY_PORT || "3000",
  https = !!process.env.FRONTITY_HTTPS,
}: {
  port?: string;
  https?: boolean;
}) => {
  // Check `port` parameter.
  if (port && Number.isNaN(parseInt(port, 10))) {
    errorLogger(
      new Error(`The port number specified is not valid: "${port}".`)
    );
  }

  // Execute `serve` command.
  serve({ port: parseInt(port, 10), https });
};
