import { info } from "../commands";
import { writeSync } from "clipboardy";

export default async () => {
  const information = await info();
  console.log(`${information}
  
  System info copied in the clipboard!
  You can now paste it in the Frontity Community or GitHub issue.
  
  `);
  writeSync(information);
};
