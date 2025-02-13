# jerry-base

[![NPM version](https://img.shields.io/npm/v/jerry-base.svg?style=flat)](https://npmjs.org/package/jerry-base)
[![NPM downloads](http://img.shields.io/npm/dm/jerry-base.svg?style=flat)](https://npmjs.org/package/jerry-base)

jerry base lib

## Usage

```ts
import { IntensitySegments } from 'jerry-base';

// ...
const intensitySegments = new IntensitySegments();
intensitySegments.add(0, 5, 10);
```

## 文件结构

```bash
.
├── docs // 文档
├── src // 源码
├── __tests__ // 测试文件
├── .dumirc.ts // dumi 配置
├── .husky // husky 配置
├── .npmrc // npm 配置
├── .prettierrc // prettier 配置
├── .vscode // vscode 配置
├── README.md // 说明
├── package.json // 包配置
├── pnpm-lock.yaml // pnpm 锁文件
├── tsconfig.json // ts 配置
└── .gitignore // git 忽略文件
```

## Development

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm start

# run tests
$ pnpm test

# build library source code
$ pnpm run build

# build library source code in watch mode
$ pnpm run build:watch

# build docs
$ pnpm run docs:build

# Locally preview the production build.
$ pnpm run docs:preview

# check your project for potential problems
$ pnpm run doctor
```

## LICENSE

MIT
