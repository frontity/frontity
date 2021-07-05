import { Head } from "frontity";
import { AmpAdProps } from "../../types";

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
  json,
  slot,
  overrideWidth,
  overrideHeight,
  multiSize,
  multiSizeValidation,
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
      json={json && JSON.stringify(json)}
      data-slot={slot}
      data-override-width={overrideWidth}
      data-override-height={overrideHeight}
      data-multi-size={multiSize}
      data-multi-size-validation={multiSizeValidation}
    />
  </>
);

export default AmpAd;
