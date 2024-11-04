import Cache from "node-cache";

const cache = new Cache({
  stdTTL: 60 * 60, // ttl 1 hour
  checkperiod: 10 * 60, // check every ten minutes
  deleteOnExpire: false,
});

const fetchers: Record<string, <T>() => Promise<T>> = {};

cache.on("expired", async function (key) {
  if (key in fetchers) {
    cache.set(key, await fetchers[key]());
  }
});

export default function addKey<T>(
  key: string,
  fetcher: () => Promise<T>,
  precache = false
) {
  fetchers[key] = fetcher as <T>() => Promise<T>;

  if (precache) {
    Promise.resolve().then(() => {
      cache.emit("expired", key);
    });
  }

  return async function (): Promise<T> {
    if (cache.has(key)) {
      return cache.get(key) as T;
    } else {
      const result = await fetcher();

      cache.set(key, result);

      return result;
    }
  };
}
