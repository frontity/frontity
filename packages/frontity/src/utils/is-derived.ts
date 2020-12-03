/**
 * Util to know if a property from the state is "derived". Useful for those
 * properties of the state that are defined as "derived", but can be overwritten
 * by the user.
 *
 * @example isDerived(state.wpSource, "isWpCom");
 *
 * @param obj - The object from the state that contains the property.
 * @param propName - The property name.
 * @returns True if derived, false if not derived or overwritten.
 */
const isDerived = (obj, propName) =>
  typeof Object.getOwnPropertyDescriptor(obj, propName).value === "function";

export default isDerived;
