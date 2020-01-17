import { EventPromised } from "./eventEmitter";

test("EventPromised works", async () => {
  const EE = new EventPromised((resolve, reject, emit) => {
    console.log("start");
    emit("inside", "message from inside");
    resolve("resolved");
  });

  EE.on("inside", msg => console.log(msg));
  EE.on("outside", msg => console.log(msg));

  EE.emit("outside", "message from inside");

  const result = await EE;
  console.log(result);
});

// I want this output:
//
// > start
// > message from inside
// > message from outside
// > resolved
