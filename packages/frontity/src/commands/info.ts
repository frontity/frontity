import envinfo from "envinfo";

export default async () => {
  const info = await envinfo.run(
    {
      System: ["OS", "CPU", "Memory", "Shell"],
      Binaries: ["Node", "npm"],
      Browsers: ["Chrome", "Edge", "Internet Explorer", "Firefox", "Safari"],
      npmPackages: true,
      npmGlobalPackages: ["frontity", "npx"],
    },
    { markdown: true, showNotFound: true, duplicates: true }
  );
  return info;
};
