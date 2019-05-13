import WpSource from "../../../../";

type Populate = WpSource["libraries"]["source"]["populate"];

export default jest.fn<Populate, Parameters<Populate>>();
