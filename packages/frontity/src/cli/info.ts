import infoCommand from "../commands/info";
import { writeSync } from "clipboardy";

const info = async () => {
  const information = await infoCommand();
  console.log(`${information}
  
  System info copied in the clipboard!
  You can now paste it in the Frontity Community or GitHub issue.
  
  `);
  writeSync(information);
};

export default info;
