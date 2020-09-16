import { AsyncAction, Action, State, Derived } from "frontity/types";
import Source, { EntityData } from "@frontity/source/types";
import { Api } from "./src/libraries";

/**
 * A Frontity source package for the REST API of self-hosted WordPress and
 * WordPress.com sites.
 */
interface WpSource extends Source {
  /**
   * The name of this package.
   */
  name: "@frontity/wp-source";

  /**
   * The state exposed by this package.
   */
  state: {
    /**
     * Source namespace.
     *
     * It also contains the state defined in the main source package.
     */
    source: Source<WpSource>["state"]["source"] & {
      /**
       * The URL of the REST API.
       *
       * It can be from a self-hosted WordPress or from a WordPress.com site.
       *
       * @example "https://your-site.com/wp-json"
       * @example "https://public-api.wordpress.com/wp/v2/sites/your-site.wordpress.com"
       */
      api: string;

      /**
       * True when the REST API belongs to a WordPress.com site.
       */
      isWpCom: Derived<WpSource, boolean>;

      /**
       * The name or path indicating the subdirectory of the domain where the
       * Frontity site lives.
       *
       * For example, if your site is at https://mysite.com/blog, you have to
       * use it with the value of /blog.
       *
       * It is also used to transform links of the entities that come from the
       * REST API by prefixing them with this value.
       *
       * @example "/blog"
       */
      subdirectory: string;

      /**
       * Set a specific page as the homepage of the site.
       *
       * For example, if you set this value to `/about-us` then that page will
       * be shown when you access `/`.
       *
       * @remarks
       * - This option overrides the `/` route so it should be used in
       * combination with `state.source.postsPage` to be able to access the
       * posts archive with a different route.
       * - You will need to configure WordPress with the same setting.
       *
       * @example "/about-us"
       */
      homepage: string;

      /**
       * Show the posts archive when accessing a specific URL of your site,
       * instead of the homepage.
       *
       * For example, if you set this value to `/blog`, then the posts archive
       * will be shown if you access `/blog` instead of `/`.
       *
       * @remarks
       * - It is useful when used in combination with
       * `state.source.homepage`.
       * - You will need to configure WordPress with the same setting.
       *
       * @example "/blog"
       */
      postsPage: string;

      /**
       * Change the base prefix of the URLs for category pages.
       *
       * @remarks
       * Configure WordPress with the same setting.
       *
       * @example "categorias"
       */
      categoryBase: string;

      /**
       * Change the base prefix of the URLs for tag pages.
       *
       * @remarks
       * Configure WordPress with the same setting.
       *
       * @example "etiquetas"
       */
      tagBase: string;

      /**
       * Change the base prefix of the URLs for author pages.
       *
       * @remarks
       * Configure WordPress with the same setting.
       *
       * @example "autores"
       */
      authorBase: string;

      /**
       * Set the endpoint against which calls to the REST API are made when
       * posts are requested when fetching a single post, the post archive, date
       * archives, categories, tags, authors, and so on. This is useful when
       * you want to use another post type as your default.
       *
       * @example "products"
       *
       * @defaultValue "posts"
       */
      postEndpoint: string;

      /**
       * An object that will be used in each call to the REST API when
       * using `actions.source.fetch` with the default handlers.
       *
       * This is useful to filter fields from the REST API, change the default
       * `per_page` value and so on.
       *
       * @example
       * ```js
       * {
       *    per_page: 5,
       *    _fields: ["title", "id", "content", "link"]
       *  }
       * ```
       */
      params: Record<string, any>;

      /**
       * The value that should be used to authenticate with the server.
       *
       * Typically, this would be used to store the JWT needed for WordPress
       * preview functionality or the password used for Basic Buthentication.
       */
      auth: string;

      /**
       * An array of objects that define the custom post types present in the
       * site.
       *
       * @example
       * ```js
       * [
       *   {
       *     type: "movie",
       *     endpoint: "movies",
       *     archive: "/movies-archive"
       *   }
       * ]
       * ```
       */
      postTypes: {
        /**
         * The slug of the custom post type as configured in WordPress.
         *
         * @example "movie"
         */
        type: string;

        /**
         * The REST API endpoint from where this post type can be fetched.
         *
         * @example "movies"
         */
        endpoint: string;

        /**
         * The URL of the archive for the custom post type.
         *
         * @example "/movies-archive"
         */
        archive?: string;
      }[];
      /**
       * An array of objects that define the custom taxonomies present in the
       * site.
       *
       * @example
       * ```js
       * [
       *    {
       *      taxonomy: "actors",
       *      endpoint: "actor",
       *      postTypeEndpoint: "movies",
       *      params: {
       *        per_page: 5,
       *        _embed: true
       *      }
       *    }
       * ]
       * ```
       */
      taxonomies: {
        /**
         * The slug of the custom taxonomy as configured in WordPress.
         *
         * @example "actors"
         */
        taxonomy: string;

        /**
         * The REST API endpoint from where this taxonomy can be fetched.
         *
         * @example "actor"
         */
        endpoint: string;

        /**
         * The REST API endpoint of the custom post type that should be
         * fetched for this taxonomy.
         *
         * @example "movies"
         */
        postTypeEndpoint?: string;

        /**
         * The params that should be used in the REST API when fetching this
         * taxonomy.
         *
         * @example
         * ```js
         * {
         *   per_page: 5,
         *   _embed: true
         * }
         * ```
         *
         * @defaultValue
         * ```js
         * {
         *   _embed: true
         * }
         * ```
         */
        params?: Record<string, any>;
      }[];
    };
  };

  /**
   * The actions exposed by this package.
   */
  actions: {
    /**
     * Source namespace.
     */
    source: {
      /**
       * An action that fetches all the information and entities related to a link.
       *
       * It populates the state with both:
       * - An entry in `state.source.data` with information about that link.
       * - Normalized entities in relevant part of the state, like
       * `state.source.post`, `state.source.category`
       * or `state.source.author` and so on.
       *
       * @param link - The link that should be fetched. It can be a URL or a
       * custom link created to fetch additional entities from the REST API.
       * - URLs start with `/`.
       * - Non URLs start with `@`.
       * @example `actions.source.fetch("/some-post");`
       * @example `actions.source.fetch("@comments/135");`
       *
       * @param options - Optional options.
       *
       * @returns A promise that resolves when the data fetching has finished.
       */
      fetch:
        | AsyncAction<WpSource, string>
        | AsyncAction<
            WpSource,
            string,
            {
              /**
               * Whether the fetch should be done again if data for that link
               * already exists.
               */
              force?: boolean;
            }
          >;

      /**
       * An internal action that bootstraps the initialization.
       *
       * @remarks
       * This action is not meant to be run by the user, but by the Frontity
       * framework.
       */
      init: Action<WpSource>;
    };
  };

  /**
   * The libraries exposed by this package.
   */
  libraries: {
    /**
     * Source namespace.
     */
    source: Source["libraries"]["source"] & {
      /**
       * A library helper to fetch the REST API.
       *
       * It has two methods, `api.init` and `api.get`:
       * - `api.init`: Used internally to initialize the class.
       * - `api.get`: Used to fetch the entities from the REST API.
       *
       * Types defined in {@link Api}.
       *
       * @example
       * `api.get({ endpoint: "pages", params: { _embed: true, include: '14' } });`
       * @example
       * `api.get({ endpoint: "posts", params: { _embed: true, categories: '2,3,4' } });`
       */
      api: Api;

      /**
       * A library helper to add entities to the Frontity state.
       *
       * @remarks
       * Entities are not overwritten. If an entity already exists in the state
       * and a new one is fetched, the one in the state will prevail. If you
       * want to overwrite them, use the `force` option.
       *
       * @example
       * ```js
       * const response = await libraries.source.api.get({ endpoint: "posts" });
       * const entities = await libraries.source.populate({ response, state });
       * ```
       */
      populate: (args: {
        /**
         * The Frontity state.
         */
        state: State<WpSource>;

        /**
         * The Response object.
         *
         * Usually returned from `api.get`, but can also be the one returned
         * by `window.fetch`.
         */
        response: Response;

        /**
         * The subdirectory of the Frontity site. When this options is passed,
         * this subdirectory is added to the entities' links.
         *
         * @example "/blog"
         *
         * @defaultValue `state.source.subdirectory`
         */
        subdirectory?: string;

        /**
         * A boolean that indicates if the entities should be overwritten.
         *
         * @defaultValue false
         */
        force?: boolean;
      }) => /**
       * Returns a promise that resolves with an array of objects with
       * attributes `type`, `id` and `link` representing the added entities.
       *
       * @example
       * ```js
       * const entities = await libraries.source.populate({ response, state });
       * data.entities = entities.map(entity => ({
       *  type: entity.type,
       *  id: entity.id,
       *  link: entity.link,
       * }))
       * ```
       */
      Promise<EntityData[]>;

      /**
       * Handlers are objects that associate a link pattern with a function
       * that fetches all the entities that belong to that WordPress link.
       *
       * Types defined in {@link Pattern}.
       */
      handlers: Pattern<Handler>[];

      /**
       * Redirections are objects that associate a link pattern with a function
       * that returns a new link.
       *
       * These redirections are used when `actions.source.fetch` is executed,
       * before the handlers.
       */
      redirections: Pattern<Redirection>[];

      /**
       * Extracts the total number of entities of an archive from its REST API
       * Response object.
       *
       * @param response - The Response object. Usually returned from
       * `api.get`, but can also be the one returned by `window.fetch`.
       * @param valueIfHeaderMissing - The value that must be returned if the
       * header containing the information is not found in the Response object.
       *
       * @returns - The total number of entities for that archive.
       *
       * @defaultValue 0
       */
      getTotal: (response: Response, valueIfHeaderMissing: number) => number;

      /**
       * Extracts the total number of pages of an archive from its REST API
       * Response object.
       *
       * @param response - The Response object. Usually returned from
       * `api.get`, but can also be the one returned by `window.fetch`.
       * @param valueIfHeaderMissing - The value that must be returned if the
       * header containing the information is not found in the Response object.
       *
       * @returns - The total number of pages for that archive.
       *
       * @defaultValue 0
       */
      getTotalPages: (
        response: Response,
        valueIfHeaderMissing: number
      ) => number;
    };
  };
}

export default WpSource;

/**
 * Handlers are objects that associate a link pattern with a function
 * that fetches all the entities that belong to that WordPress link.
 *
 * Handlers are used when `actions.source.fetch` is executed.
 */
export interface Pattern<F extends Function = Function> {
  /**
   * A unique name to identify this handler.
   *
   * @example "product"
   */
  name: string;

  /**
   * The priority of this handler.
   *
   * Lower numbers have higher priority.
   *
   * @defaultValue 10
   */
  priority: number;

  /**
   * The pattern used to compare against the link that is being fetched.
   *
   * It uses [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp)
   * under the hood, so please check its documentation to know how to write
   * patterns.
   *
   * @example "/product/:slug"
   */
  pattern: string;

  /**
   * The function that does the actual fetching.
   *
   * Types defined in {@link Handler}.
   */
  func: F;
}

/**
 * The handler function is in charge of fetching all the entities that belong
 * to a link.
 *
 * For example, when we fetch the link of a page, the handler must retrieve the
 * entitiy for that page, but also its author. When we fetch the link of a post,
 * the handler should retrieve the entity of the post, its author, its
 * categories, its tags, its featured image and so on.
 *
 * @example
 * ```js
 * libraries.source.handlers.push({
 *    name: "product",
 *    priority: 10,
 *    pattern: "/product/:slug",
 *    func: async ({ link, params, state, libraries, force }) => {
 *      // 1. Get the product entities from the REST API.
 *      const response = await libraries.source.api.get({
 *        endpoint: "products",
 *        params: { slug: params.slug }
 *      });
 *
 *      // 2. Add the product to the state.
 *      const [product] = await libraries.source.populate({ response, state, force });
 *
 *      // 3. Add the data object for this link.
 *      Object.assign(state.source.data[link], {
 *        id: product.id,
 *        type: product.type,
 *        isPostType: true,
 *        isProduct: true
 *      });
 *    }
 *  });
 * ```
 *
 * @param args - The arguments object.
 *
 * @returns - Returns a promise that is resolved when the handler has finished.
 */
export interface Handler<Pkg extends Source = WpSource> {
  (args: {
    /**
     * The link that is being fetched.
     *
     * @example "/some-post"
     */
    link: string;

    /**
     * The link that is being fetched.
     *
     * @deprecated
     * Use `link` instead.
     */
    route: string;

    /**
     * The values extracted from the pattern.
     *
     * For example, if the pattern is `"/category/:slug"` and it is called for
     * the link `"/category/nature"`, it will receive `{ slug: "nature" }`.
     *
     * @example
     * ```js
     * {
     *  slug: "nature"
     * }
     * ```
     */
    params: { [param: string]: any };

    /**
     * The Frontity state.
     */
    state: State<Pkg>;

    /**
     * The Frontity libraries.
     */
    libraries: Pkg["libraries"];

    /**
     * Whether `actions.source.fetch` was called with the `force` option.
     */
    force?: boolean;
  }): Promise<void>;
}

/**
 * Redirections are objects that associate a link pattern with a function
 * that returns a new link.
 *
 * These redirections are used when `actions.source.fetch` is executed,
 * before the handlers.
 *
 * @example
 * ```js
 * libraries.source.redirections.push({
 *   name: "tags-to-labels",
 *   priority: 5,
 *   pattern: "/tag/:slug/",
 *   func: ({ slug }) => "/label/" + slug
 * });
 * ```
 *
 * @param params - An object that contains the values extracted from the
 * pattern.
 *
 * For example, if the pattern is `"/category/:slug"` and it is called for
 * the link `"/category/nature"`, it will receive `{ slug: "nature" }`.
 *
 * @example
 * ```js
 * {
 *  slug: "nature"
 * }
 * ```
 *
 * @returns The new link.
 */
export interface Redirection {
  (params?: Record<string, string>): string;
}
