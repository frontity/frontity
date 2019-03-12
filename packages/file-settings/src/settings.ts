type MainSettings = {
  url?: string;
  title?: string;
  timezone?: number;
  language?: string;
};

type Package = {
  name: string;
  active?: boolean;
  namespaces?: string | string[];
  settings?: object;
};

type Settings = {
  name?: string;
  match?: string;
  settings?: MainSettings;
  packages: Package[];
};

export default ({ name, url }: { name: string; url: string }): Settings => {
  const settings = {
    packages: [
      {
        name: "@frontity/frontity"
      }
    ]
  };

  return settings;
};
