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
}
