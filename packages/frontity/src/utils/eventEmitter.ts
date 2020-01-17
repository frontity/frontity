import { EventEmitter } from "events";

export class EventPromised<T> extends Promise<T> {
  private emitter: EventEmitter;

  constructor(
    executor: (
      resolve: (value?: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void,
      emit: (event: string, ...value: any[]) => void
    ) => void,
    emitter: EventEmitter = new EventEmitter()
  ) {
    executor = executor == undefined ? () => undefined : executor;
    super((resolve, reject) =>
      executor(
        result => {
          emitter.removeAllListeners();
          resolve(result);
        },
        error => {
          emitter.removeAllListeners();
          reject(error);
        },
        emitter.emit.bind(emitter)
      )
    );
    this.emitter = emitter;
  }

  public on(eventName: string, onData: (...data: any[]) => void): this {
    this.emitter.on(eventName, onData);
    return this;
  }

  public once(eventName: string, onData: (...data: any[]) => void): this {
    this.emitter.once(eventName, onData);
    return this;
  }

  public emit(event: string | symbol, ...args: any[]): this {
    this.emitter.emit(event, args);
    return this;
  }
}

type IEP = Promise<any> & {
  emit: (event: string, ...value: any[]) => void;
  on: (eventName: string, onData: (...data: any[]) => void) => void;
};

export function EventPromised2<T>(
  executor: (
    resolve: (value?: T | PromiseLike<T>) => void,
    reject: (reason?: any) => void,
    emit: (event: string, ...value: any[]) => void
  ) => void
) {
  // const that = this;
  const emitter: EventEmitter = new EventEmitter();
  const promise = new Promise((resolve, reject) =>
    executor(
      result => {
        emitter.removeAllListeners();
        resolve(result);
      },
      error => {
        emitter.removeAllListeners();
        reject(error);
      },
      emitter.emit.bind(this)
    )
  ) as IEP;

  promise.emit = emitter.emit.bind(this);
  promise.on = emitter.on.bind(this);

  return promise;
}
