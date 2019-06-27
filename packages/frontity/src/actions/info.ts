import envinfo from "envinfo";
import { writeSync } from "clipboardy";

export default async () => {
  const info = await envinfo.run(
    {
      System: ["OS", "CPU", "Memory", "Shell"],
      Binaries: ["Node", "npm"],
      Browsers: ["Chrome", "Edge", "Internet Explorer", "Firefox", "Safari"],
      npmPackages: true,
      npmGlobalPackages: ["frontity"]
    },
    { markdown: true, showNotFound: true, duplicates: true }
  );
  console.log(`${info}
  
  System info copied in the clipboard!
  You can now paste it in the Frontity Community or GitHub issue.
  
  `);
  writeSync(info);
};
