import { info as infoCommand } from "../commands";
import { writeSync } from "clipboardy";

/**
 * The info CLI command, usually run with `npx frontity info`.
 *
 * It retrieves information about the system and writes it in the console so it
 * can be copied and pasted in an issue.
 */
const info = async () => {
  const information = await infoCommand();
  console.log(`${information}
  
  System info copied in the clipboard!
  You can now paste it in the Frontity Community or GitHub issue.
  
  `);
  writeSync(information);
};

export default info;
