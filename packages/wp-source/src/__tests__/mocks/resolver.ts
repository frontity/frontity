import Resolver from "../../libraries/resolver";

export const mockInit = jest.fn();
export const mockAdd = jest.fn();
export const mockMatch = jest.fn();

const mock = jest.fn<Resolver, []>().mockImplementation(() => {
  return {
    registered: [],
    init: mockInit,
    add: mockAdd,
    match: mockMatch
  };
});

export default mock;
