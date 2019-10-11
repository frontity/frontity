export const contexts = new WeakMap();

export const proxyToRaw = new WeakMap();

export const rawToProxy = {
  get: function(raw, context) {
    const proxies = contexts.get(context);
    if (!proxies) return undefined;
    return proxies.get(raw);
  },
  set: function(raw, context, proxy) {
    let proxies;
    proxies = contexts.get(context);
    if (!proxies) {
      proxies = new WeakMap();
      contexts.set(context, proxies);
    }
    proxies.set(raw, proxy);
    return true;
  }
};
