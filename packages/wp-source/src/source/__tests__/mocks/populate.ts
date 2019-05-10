import { Libraries } from "../../../type";

type Populate = Libraries["source"]["populate"]

export default jest.fn<Populate, Parameters<Populate>>();
