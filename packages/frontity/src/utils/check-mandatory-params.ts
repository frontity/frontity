import stackTrace from "stack-trace";

// This functions throws an error if a mandatory parameter is undefined.
export default (params: { [key: string]: any }): void => {
  const functionNameMatch = /[\w-]+$/;

  // Throws if no params are passed to this function.
  if (!params || !Object.keys(params).length)
    throw new Error(
      `The parameter \`params\` is mandatory in \`checkMandatoryParams\`.`
    );

  // Gets the caller function name from the stack.
  const callerFunctionName = stackTrace
    .get()[1]
    .getFunctionName()
    .match(functionNameMatch)[0];

  // Filter the undefined params.
  const undefinedParams = Object.keys(params).filter(
    param => typeof params[param] === "undefined"
  );

  // Throws error if there are undefined params.
  if (undefinedParams.length)
    throw new Error(
      `The parameter${
        undefinedParams.length > 1 ? "s" : ""
      } ${undefinedParams.map(param => `\`${param}\``).join(", ")} ${
        undefinedParams.length > 1 ? "are" : "is"
      } mandatory in \`${callerFunctionName}\`.`
    );
};
