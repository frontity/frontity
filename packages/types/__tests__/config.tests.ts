import {
  BabelCustomizer,
  WebpackCustomizer,
  FrontityCustomizer,
} from "../config";

const webpack: WebpackCustomizer = ({ config, target, mode }) => {
  config.mode = "development";
  config.output = {
    filename: "output",
  };
  target = "es5";
  mode = "production";
};

const babel: BabelCustomizer = ({ config, target, mode }) => {
  config.plugins.push("some-babel-plugin");
  config.plugins.push(["some-babel-plugin", { option1: "value1" }]);
  target = "module";
  mode = "development";
};

const frontity: FrontityCustomizer = ({ config, mode }) => {
  config.outDir = "dist";
  mode = "production";
};

test("Types are fine!", () => {});
