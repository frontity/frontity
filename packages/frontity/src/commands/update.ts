import { EventPromised } from "../utils/eventPromised";
import { updateProject } from "../steps/update";

/**
 * The type of events that the EventPromised instance accepts.
 */
type EventTypes = "error" | "message";

/**
 * The update command, exported to be used programatically.
 *
 * @returns An instance of {@link EventPromised}, which is a promise that can
 * also send events using an EventEmitter.
 */
const update = () =>
  new EventPromised<EventTypes>((resolve, reject, emit) => {
    (async () => {
      {
        try {
          // Small hack so the first `emit` message is skipped.
          await new Promise((resolve) => setTimeout(resolve));

          emit("message", "\nUpdating Frontity root project\n");
          await updateProject();

          // Update the root project.
          // let step = updateProject();
          // emit("message", "Updating the root project", step);
          // await step;
          // const packages = await step;
          // Object.entries(packages).forEach(([pkg, version]) => {
          //   emit("message", `Updated ${pkg} to ${version}.`);
          // });

          // Update the local packages.
          // step = updatePackages();
          // emit("message", "Updating the root project", step);
          // await step;
        } catch (error) {
          reject(error);
        }
      }
    })().then(resolve);
  });

export default update;
