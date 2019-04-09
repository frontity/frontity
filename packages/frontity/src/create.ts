type Options = {
  name?: string;
  typescript?: boolean;
  packages?: string[];
};

export default (options: Options) => {
  console.log("name:", options.name);
  console.log("cwd:", process.cwd());
};
