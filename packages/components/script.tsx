import { useEffect } from "react";
import * as React from "react";

/**
 * Props passed to the {@link Script} component.
 */
interface ScriptProps {
  /**
   * Specifies the URI of an external script. Same as the `src` attribute of the
   * HTML <script> element.
   *
   * @example
   * ```
   * <Script src="https://my.site.org/static/some-script.js" />
   * ```
   */
  src?: string;

  /**
   * Script code in string format. If this prop is used, the code is evaluated
   * once React has ended the hydration.
   *
   * @remarks If this prop is used, `src` is ignored.
   *
   * @example
   * ```
   * <Script code={"alert('hi!')"} />
   * ```
   */
  code?: string;

  /**
   * The `id` attribute of any HTML element.
   *
   * @example
   * ```
   * <Script id="hi-script" code={"alert('hi!')"} />
   * ```
   */
  id?: string;
}

/**
 * Simple component for running the content of `<script>` tags.
 *
 * @param props - Object of type {@link ScriptProps}.
 * - `src`: Specifies the URI of an external script.
 * - `code`: Script code in string format (overrides the `src` prop).
 * - `id`: The `id` attribute of any HTML element.
 *
 * @returns React element.
 */
const Script: React.FC<ScriptProps> = ({ src, code, id }) => {
  useEffect(() => {
    if (code) {
      // Just evaluate the code if passed.
      eval(code);
    } else if (src) {
      // Creates an HTML <script> element.
      const script = window.document.createElement("script");
      script.src = src;
      script.async = true;

      // Add the ID if specified.
      if (id) script.id = id;

      // Append the script at the end of `<body>`.
      window.document.body.appendChild(script);

      return () => {
        if (script) window.document.body.removeChild(script);
      };
    }
  }, []);

  return null;
};

export default Script;
