import React from "react";
import { add as addL } from "lodash";
import { add as addR } from "ramda";

const Dynamic = () => <div>I am dynamic {addL(1, 1) + addR(1, 1)}</div>;

export default Dynamic;
