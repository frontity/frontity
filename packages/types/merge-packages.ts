import Package from "./package";

/**
 * Merge the the given {@link Package} definitions (up to 10 packages).
 *
 * @typeparam P1 - First package.
 * @typeparam P2 - Second package.
 * @typeparam Px - Other optional packages.
 */
type MergePackages<
  P1 extends Package,
  P2 extends Package,
  P3 extends Package = null,
  P4 extends Package = null,
  P5 extends Package = null,
  P6 extends Package = null,
  P7 extends Package = null,
  P8 extends Package = null,
  P9 extends Package = null,
  P10 extends Package = null
> = Omit<P1, "name"> &
  Omit<P2, "name"> &
  Omit<P3, "name"> &
  Omit<P4, "name"> &
  Omit<P5, "name"> &
  Omit<P6, "name"> &
  Omit<P7, "name"> &
  Omit<P8, "name"> &
  Omit<P9, "name"> &
  Omit<P10, "name">;

export default MergePackages;
