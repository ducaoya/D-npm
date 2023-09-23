# js 函数重载

js 函数重载

## 使用方式

### 安装

```shell
npm i d-deep-clone
```

### 函数解释

#### createOverload

> 创建一个被重载的函数

```js
const overload = createOverload();
```

#### overload.addImplement

> 添加函数实现，前面参数为被重载函数类型，最后为函数实现，函数实现是`必要参数`，不可忽略

```js
// 添加实现函数
overload.addImplement(() => {
  console.log(1);
});

overload.addImplement("string", (str) => {
  console.log(typeof str);
});

overload.addImplement("number", (num) => {
  console.log(typeof num);
});

overload.addImplement("boolean", (bool) => {
  console.log(typeof bool);
});

overload.addImplement("object", "string", "number", (obj, str, num) => {
  console.log(typeof obj, str, num);
});
```

### 使用样例

```js
import createOverload from "d-overload";

const overload = createOverload();

// 添加实现函数
overload.addImplement(() => {
  console.log(1);
});

overload.addImplement("string", (str) => {
  console.log(typeof str);
});

overload.addImplement("number", (num) => {
  console.log(typeof num);
});

overload.addImplement("boolean", (bool) => {
  console.log(typeof bool);
});

overload.addImplement("object", "string", "number", (obj, str, num) => {
  console.log(typeof obj, str, num);
});

overload();
overload("string");
overload(2);
overload(false);
overload({ a: 1, b: 2 }, "xxx", 333);
```
