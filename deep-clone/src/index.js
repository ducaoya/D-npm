/**
 * @param {any} value
 * @description js深克隆，基本类型，对象，循环引用
 */
export default function deepClone(value) {
  const cache = new WeakMap();

  function _deepClone(value) {
    if (value === null || typeof value !== "object") {
      return value;
    }
    if (cache.has(value)) {
      return cache.get(value);
    }
    const result = Array.isArray(value) ? [] : {};
    cache.set(value, result);
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = _deepClone(value[key]);
      }
    }
    return result;
  }

  return _deepClone(value);
}
