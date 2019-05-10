import Api from "../../../libraries/api";

function mockFn<F extends (...args: any) => any>() {
  return jest.fn<ReturnType<F>, Parameters<F>>();
}

export const mockInit = mockFn<Api["init"]>();
export const mockGetIdBySlug = mockFn<Api["getIdBySlug"]>();
export const mockGet = mockFn<Api["get"]>();

const mock = jest.fn<Api, []>().mockImplementation(() => {
  return {
    apiUrl: "https://test.frontity.io",
    isCom: false,
    init: mockInit,
    get: mockGet,
    getIdBySlug: mockGetIdBySlug,
  };
});

export default mock;
