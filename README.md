## 🧱 Clay UI

A modern skeuomorphic, cross-framework component library.

Supports React with a simple Copy & Paste workflow.

![Clay UI Preview](./docs/assets/preview.png)

---

## ✨ Features

- **Skeuomorphic aesthetics**: Built-in tactile light, shadow, and embossing
- **Copy & Paste friendly**: No heavy dependencies; transparent source code
- **Modern theming**: CSS Variables and Tailwind-ready
- **Accessible by default**: Keyboard navigation and ARIA attributes

---

## 🚀 Quick Start

Clay UI requires no installation. Visit the docs site and copy the component code directly. The API is consistent across frameworks.

### React
```tsx
import { ClayButton } from "@/components/clay/button"

export default function App() {
  return <ClayButton onClick={() => alert("Hello Clay!")}>Click Me</ClayButton>
}
```

---

## 🧩 Components (MVP)

| Component   | Description                    | Status |
|-------------|--------------------------------|--------|
| ClayButton  | Embossed tactile button        | ✅     |
| ClayInput   | Skeuomorphic input             | ✅     |
| ClaySwitch  | Skeuomorphic toggle switch     | ✅     |
| ClayCard    | Card container                 | ✅     |
| ClayDialog  | Modal dialog                   | ✅     |
| ClayTooltip | Tooltip bubble                  | 🚧     |
| ClayTabs    | Tabs                            | 🚧     |

More components to come: forms, lists, sliders, date pickers, and more.

---

## 🎨 Theming

Clay UI uses CSS Variables to power themes. Adjust light, shadow, color, and radii easily:

```css
:root {
  --clay-bg: #e0e0e0;
  --clay-shadow-light: #ffffff;
  --clay-shadow-dark: #a3a3a3;
  --clay-radius: 12px;
}
```

---

## 📖 Docs & Demo

Docs and live examples: `https://clay-ui.vercel.app`

---

## 🌟 Why Clay UI?

- If AntD / MUI feel too uniform
- If you want something retro yet modern
- If you prefer cross-framework, Copy & Paste components

Clay UI is for you. 🧱✨

---

## 🛠 Development

```bash
# Clone the project
git clone https://github.com/yourname/clay-ui
cd clay-ui

# Install dependencies
pnpm install

# Start the docs site
pnpm dev
```

---