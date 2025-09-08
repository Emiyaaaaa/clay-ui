## Kopi UI

一个基于 React + TypeScript 的拟物风格现代化组件库（Monorepo）。内置 Tailwind CSS v4 主题体系、Vite 构建、ESLint/Prettier 规范、Storybook 文档与 Vitest 测试，开箱即用。

### 主要特性
- **拟物风设计（Skeuomorphic）**：柔和阴影、层次与触感反馈，现代而不失质感。
- **TypeScript 完整类型**：为每个组件提供清晰的 props 定义。
- **Tailwind v4 定制**：支持主题变量、暗黑模式与设计令牌自定义。
- **Storybook 文档**：组件示例、交互演示与文档自动化。
- **单元测试完善**：Vitest + Testing Library，内置覆盖率报告。
- **无障碍可访问（a11y）**：遵循 WAI-ARIA 规范与键盘操作友好。
- **Monorepo 架构**：多包管理，易于扩展与发布。

---

## 技术栈
- React 18 + TypeScript 5
- Tailwind CSS v4
- Vite 5（库模式构建）
- ESLint 9 + Prettier 3
- Storybook 8（Vite Builder）
- Vitest 2 + @testing-library/react

---

## 环境要求
- Node.js 18+
- pnpm 9（推荐）

---

## 快速开始

### 安装依赖
```bash
pnpm install
```

### 启动文档（Storybook）
```bash
pnpm storybook
```

### 运行单元测试
```bash
pnpm test
```

### 构建所有包
```bash
pnpm build
```

### 构建核心包
```bash
pnpm -F @kopi-ui/core build
```

---

## 项目结构
```text
my-component-library/
├── packages/
│   └── core/
│       ├── src/
│       │   ├── components/
│       │   │   └── Button/
│       │   │       ├── Button.tsx
│       │   │       ├── Button.test.tsx
│       │   │       ├── Button.stories.tsx
│       │   │       └── index.ts
│       │   └── styles/
│       │       └── tailwind.css
│       ├── tsconfig.json
│       └── package.json
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── tailwind.config.ts
├── vite.config.ts
├── vitest.config.ts
├── package.json
└── README.md
```

---

## 使用示例

### 安装（发布后）
```bash
pnpm add @kopi-ui/core
```

### 导入与使用
```tsx
import { Button } from '@kopi-ui/core';

export function App() {
  return <Button label="点击我" variant="primary" />;
}
```

---

## 设计与可访问性约定
- **单一职责**：每个组件只做一件事，避免隐式副作用。
- **类型先行**：props 必须定义明确、友好默认值与智能提示。
- **可访问性**：正确的语义标签与 `aria-*` 属性；键盘可聚焦与操作。
- **主题定制**：通过 Tailwind v4 设计令牌与类工具实现主题切换与暗黑模式。

---

## Tailwind v4 主题与样式
- 根主题文件：`packages/core/src/styles/tailwind.css`
- 自定义设计令牌：阴影、圆角、主色、表面色等（拟物风）
- 在应用中引入方式（如 Storybook `preview.ts` 已内置）：
```ts
import '@kopi-ui/core/dist/style.css'; // 若发布后提供打包样式
// 或在文档/示例中直接：
import '../packages/core/src/styles/tailwind.css';
```

---

## Storybook 文档
- 入口配置：`.storybook/main.ts`、`.storybook/preview.ts`
- 示例文件：`*.stories.tsx`
- 常用脚本：
```bash
pnpm storybook           # 启动文档
pnpm build-storybook     # 构建静态文档
```

---

## 测试与覆盖率
- 测试框架：Vitest（jsdom 环境）
- 断言与渲染：Testing Library + jest-dom
- 配置文件：`vitest.config.ts`
```bash
pnpm test                # 运行测试
```

---

## 代码规范
- ESLint（含 React、Hooks、a11y、TS 规则）
- Prettier（统一格式化）
```bash
pnpm lint
pnpm format
```

---

## 版本与发布（建议）
- 推荐接入 Changesets 或 semantic-release，自动化版本号、变更日志与发布流程。
- 打包产物：ES/CJS/types 三合一（库模式构建）。

---

## 贡献指南
1. Fork & Clone 本仓库
2. 新建分支进行开发：`feat/*`、`fix/*`
3. 提交信息清晰，关联 Issue（若有）
4. 提交 Pull Request，说明改动背景与影响范围

---

## 许可证
本项目采用 MIT 许可证。


