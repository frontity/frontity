import { runAsReaction } from "./reactionRunner";
import { releaseReaction } from "./store";

const IS_REACTION = Symbol("is reaction");

export function observe(fn, options = {}) {
  // wrap the passed function in a reaction, if it is not already one
  const reaction = fn[IS_REACTION]
    ? fn
    : function reaction() {
        return runAsReaction(reaction, fn, this, arguments);
      };
  // save the scheduler and debugger on the reaction
  reaction.scheduler = options.scheduler;
  reaction.debugger = options.debugger;
  // save the fact that this is a reaction
  reaction[IS_REACTION] = true;
  // run the reaction once if it is not a lazy one
  if (!options.lazy) {
    reaction();
  }
  return reaction;
}

export function unobserve(reaction) {
  // do nothing, if the reaction is already unobserved
  if (!reaction.unobserved) {
    // indicate that the reaction should not be triggered any more
    reaction.unobserved = true;
    // release (obj -> key -> reaction) connections
    releaseReaction(reaction);
  }
  // unschedule the reaction, if it is scheduled
  if (typeof reaction.scheduler === "object") {
    reaction.scheduler.delete(reaction);
  }
}
