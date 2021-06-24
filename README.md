# 搭建一套组件库
## 创建项目
```bash
npx create-react-app ts-with-react --template typescript
```

## 编辑器配置 eslint

## 安装依赖
```bash
npm install node-sass --save
```

- 基础色彩系统
- 字体系统 
- 表单
- 按钮
- 边框和阴影
- 可配置开关

normalize.css 默认样式文件
https://github.com/necolas/normalize.css

### Button 组件分析
不同的 Button Type

不同的 Button Size

Disabled 状态

### 组件测试
测试金字塔（从大到小）：单元测试（unit）、功能测试（service）、ui(模拟用户点击等)

通用测试框架： [jest](https://jestjs.io/zh-Hans/)

测试运行
```bash
npx jest jest.test.js
npx jest jest.test.js --watch
```

#### React 测试工具
[react-testing-library](https://www.html.cn/create-react-app/docs/running-tests/)
测试运行
```bash
npm run test
```

```ts
import {render} from '@testing-library/react';
import Button from "./Button";

test('测试按钮组件', () => {
   const wrapper = render(<Button>Nice</Button>);
   const element = wrapper.queryByText('Nice');
   expect(element).toBeTruthy();
});
```