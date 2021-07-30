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

### 图标 Icon解决方案
- 上古时期 雪碧图（css sprite）
- 近代 Font Icon
- 现代 SVG

SVG优势：
- 完全可控
- SVG 即取即用，Font Icon 要下载全部字体文件
- Font Icon 有很多奇怪的 bug

##### 使用开源的图标库
https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react

安装
```bash
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
```

使用
```tsx
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const element = <FontAwesomeIcon icon={faCoffee} />

ReactDOM.render(element, document.body)
```


