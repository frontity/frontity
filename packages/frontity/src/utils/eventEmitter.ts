import { EventEmitter } from "events";
import TypedEmitter from "typed-emitter";

interface MessageEvents {
  "cli:create": (msg: string, action: Promise<any>) => void;
  "cli:create:error": (error: Error) => void;
  "cli:create:subscribe": (msg: string, action: Promise<any>) => void;
  "cli:create:message": (msg: string, step: Promise<any>) => void;

  "cli:subscribe": (msg: string, action: Promise<any>) => void;
  "cli:subscribe:error": (error: Error) => void;
}

const emitter = new EventEmitter() as TypedEmitter<MessageEvents>;

export { emitter };
