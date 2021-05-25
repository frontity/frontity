import { useEffect } from "react";
import * as React from "react";

/**
 * Props passed to the {@link Script} component.
 */
interface ScriptProps extends React.HTMLProps<HTMLScriptElement> {
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

  /**
   * Any other `prop`.
   *
   * @example
   * ```
   * <Script className='className' data-value='3' />
   * ```
   */
  [propName: string]: any;
}

/**
 * Simple component for running the content of `<script>` tags.
 *
 * @param props - Object of type {@link ScriptProps}.
 * - `src`: Specifies the URI of an external script.
 * - `code`: Script code in string format (overrides the `src` prop).
 * - `id`: The `id` attribute of any HTML element.
 * - `props`: Any other `prop` passed to the Script will be added to the internal <script> tag.
 *
 * @returns React element.
 */
const Script: React.FC<ScriptProps> = ({ src, code, id, ...props }) => {
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

      // Add any other props to the internal <script> tag.
      for (let key in props) {
        const value = props[key];

        // If this is an event handler, lowercase the key
        if (/^on/g.test(key)) {
          key = key.toLowerCase();
        }

        // If the current key exists in the `dom` interface
        // we can assign the value.
        if (key in script) {
          if (key !== "children") {
            script[key] = value;
          }
        } else if (typeof value !== "function" && typeof value !== "object") {
          // Otherwise treat it as an attribute if this is not a function or an object.
          script.setAttribute(key, value);
        }
      }

      // Append the script at the end of `<body>`.
      window.document.body.appendChild(script);

      return () => {
        if (script) window.document.body.removeChild(script);
      };
    }
    // Scripts shouldn't be loaded nor executed more than once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default Script;
