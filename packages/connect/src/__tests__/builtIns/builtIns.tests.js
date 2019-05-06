import { observable, isObservable } from "../..";

describe("none observable built-ins", () => {
  it("objects with global constructors should not be converted to observables", () => {
    window.MyClass = class MyClass {};
    const obj = new window.MyClass();
    const obs = observable(obj);
    expect(obs).toEqual(obj);
    expect(isObservable(obs)).toEqual(false);
  });

  it("objects with local constructors should be converted to observables", () => {
    class MyClass {}
    const obj = new MyClass();
    const obs = observable(obj);
    expect(obs).not.toBe(obj);
    expect(isObservable(obs)).toEqual(true);
  });

  it("global objects should be converted to observables", () => {
    window.obj = {};
    const obs = observable(window.obj);
    expect(obs).not.toBe(window.obj);
    expect(isObservable(obs)).toEqual(true);
  });

  it("Date should not be converted to observable", () => {
    const date = new Date();
    const obsDate = observable(date);
    expect(obsDate).toEqual(date);
    expect(isObservable(obsDate)).toEqual(false);
  });

  it("RegExp should not be converted to observable", () => {
    const regex = new RegExp();
    const obsRegex = observable(regex);
    expect(obsRegex).toEqual(regex);
    expect(isObservable(obsRegex)).toEqual(false);
  });

  it("Node should not be converted to observable", () => {
    const node = document;
    const obsNode = observable(node);
    expect(obsNode).toEqual(node);
    expect(isObservable(obsNode)).toEqual(false);
  });
});
