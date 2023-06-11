# rm-plus

对 [rimraf](https://www.npmjs.com/package/rimraf) 的二次封装，简化命令；

## install

```shell
npm i rm-plus -g
```

## use

```
rmp <path> [<path> ...] 
```
递归删除 "path" 中所有文件和文件夹

## options
```
  -h, --help          Display this usage info
  -G, --no-glob       Do not expand glob patterns in arguments
  -g, --glob          Expand glob patterns in arguments (default)
  --preserve-root     Do not remove '/' (default)
  --no-preserve-root  Do not treat '/' specially
  -c, --clear         Clear RecycleBin
  -n, --node_modules  Remove node_modules
  --                  Stop parsing flags
```

## 新增功能

- 清除回收站( v >= v1.0.5)

```shell
rmp --clear
# 或者
rmp -c
```

- 清除node_modules( v >= v1.0.9)

```shell
rmp --clear
# 或者
rmp -c
```
