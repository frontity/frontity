import * as React from "react";
import { AmpConfigProps } from "../../types/amp";

/**
 * Render a `<script type="application/json">` containing the configuration for
 * an `<amp-analytics>` tag.
 *
 * @param props - Object of type {@link AmpConfigProps}.
 * @returns React element.
 */
const AmpConfig: React.FC<AmpConfigProps> = (props) => (
  <script type="application/json">{JSON.stringify(props)}</script>
);

export default AmpConfig;
