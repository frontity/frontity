import { EventEmitter } from "events";

export class EventPromised<Events> extends Promise<any> {
  private emitter: EventEmitter;

  constructor(
    executor: (
      resolve: (value?: any | PromiseLike<any>) => void,
      reject: (reason?: any) => void,
      emit: (event: Events, ...args: any[]) => void
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

  public on(
    eventName: Events extends string ? Events : string | symbol,
    onData: (...data: any[]) => void
  ): this {
    this.emitter.on(eventName, onData);
    return this;
  }

  public once(
    eventName: Events extends string ? Events : string | symbol,
    onData: (...data: any[]) => void
  ): this {
    this.emitter.once(eventName, onData);
    return this;
  }
}
