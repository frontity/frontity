import { Head } from "frontity";
import { AmpAdProps } from "../../types";

/**
 * Turn prop names from camelCase into kebab-case, prefixing `data-`. Also,
 * filter out those props with value `undefined`.
 *
 * @param props - Component props.
 * @returns Filtered props.
 */
export const getDataProps = (props: Record<string, any>): Record<string, any> =>
  Object.entries(props)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => [toKebabCase(key, { prefix: "data-" }), value])
    .reduce((output, [key, value]) => ((output[key] = value), output), {});

/**
 * Convert string from camelCase to kebab-case.
 *
 * @param camelCase - String in camelCase format.
 * @param options - Options object.
 * @returns String in kebab-case, with the specified prefix.
 */
export const toKebabCase = (camelCase: string, { prefix = "" } = {}) =>
  prefix + camelCase.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);

/**
 * AMP ad tag for Google Ad Manager.
 *
 * @param props - Props of type {@link AmpAdProps}.
 * @returns React element representing a <amp-ad> tag.
 */
const AmpAd: React.FC<AmpAdProps> = ({
  width,
  height,
  layout,
  json = {},
  children,
  ...otherProps
}) => (
  <>
    <Head>
      <script
        async
        custom-element="amp-ad"
        src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
      />
    </Head>
    <amp-ad
      type="doubleclick"
      width={width}
      height={height}
      layout={layout}
      json={JSON.stringify(json)}
      {...getDataProps(otherProps)}
    />
  </>
);

export default AmpAd;
