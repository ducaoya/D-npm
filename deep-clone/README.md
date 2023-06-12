# js 深克隆

js 深克隆，支持基本类型，对象，循环引用

## 使用方式

### 安装

```shell
npm i d-deep-clone
```

### 使用样例

```js
import deepClone from "d-deep-clone";

const obj = {};

obj.a = 1;
obj.b = "xxx";
obj.c = {
  d: "xxx",
};
obj.e = obj;
obj.f = [1, "xxx", obj];

const newObj = deepClone(obj);

console.log(obj.a, obj.b, obj.c); // 1 xxx {d:'xxx'}
console.log(obj === newObj); // false
console.log(obj.c === newObj.c); // false
console.log(obj.e === newObj.e); // false
console.log(newObj === newObj.e); // true
console.log(newObj === newObj.f[2]); // true
```
