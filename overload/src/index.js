/**
 * Creates a function that supports method overloading.
 * @returns {Function} The overloaded function.
 */
export default function createOverload() {
  // 重载的函数存放位置
  const callMap = new Map();

  /**
   * 调用函数
   * @param  {...any} args
   * @returns
   */
  function overload(...args) {
    const key = args.map((arg) => typeof arg).join(",");
    const fn = callMap.get(key);
    if (fn) {
      return fn.apply(this, args);
    }

    throw new Error(`no match function for ${key}`);
  }

  /**
   * 添加实现方法
   * @param  {...any} args
   */
  overload.addImplement = function (...args) {
    const fn = args.pop();
    if (typeof fn !== "function") {
      throw new Error("function overload must be a function");
    }
    const types = args.join(",");
    callMap.set(types, fn);
  };

  return overload;
}
