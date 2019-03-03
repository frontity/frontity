import { Mode, Robots } from "../types";

export default ({ mode }: { mode: Mode }): Robots => "User-agent: *\nDisallow:";
