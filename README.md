# Tilt Card (Tiltō) 🧊

**Tiltō** is a premium 3D tilt interaction effect for your cards. It adds a smooth, realistic 3D tilt to elements on hover, bringing depth and interactivity to your user interface. Whether you are using vanilla JavaScript, React, or Angular, Tiltō helps you create immersive experiences.

## 📦 Packages

This repository houses the following packages:

| Package | Description |
| :--- | :--- |
| **[`@jojovms/tilt-card-core`](./core)** | The core logic for the 3D tilt interaction. |
| **[`@jojovms/react-tilt-card`](./react)** | A React wrapper (component) for easy integration. |
| **[`@jojovms/angular-tilt-card`](./angular)** | An Angular wrapper (module & directive) for seamless usage. |

## 🚀 Installation

Choose the package that fits your technology stack:

### Core (Vanilla JS)
```bash
npm install @jojovms/tilt-card-core
```

### React
```bash
npm install @jojovms/react-tilt-card
```

### Angular
```bash
npm install @jojovms/angular-tilt-card
```

## 🛠️ Usage

### Core (Vanilla JS)
```javascript
import { TiltCard } from '@jojovms/tilt-card-core';

const element = document.querySelector('.my-card');
const tilt = new TiltCard(element, {
    max: 25,
    speed: 400,
    glare: true
});
```

### React
```jsx
import { TiltCard } from '@jojovms/react-tilt-card';

function App() {
  return (
    <TiltCard options={{ max: 25, speed: 400 }}>
      {/* Your card content here */}
      <div className="card">
        <h2>Hover me!</h2>
      </div>
    </TiltCard>
  );
}
```

### Angular
Import the module in your `app.module.ts`:

```typescript
import { TiltCardModule } from '@jojovms/angular-tilt-card';

@NgModule({
  imports: [
    TiltCardModule
  ],
  // ...
})
export class AppModule { }
```

Use the directive in your component:
```html
<div tilt-card [options]="{ max: 25, speed: 400 }">
  <h2>Hover me!</h2>
</div>
```

## 👨‍💻 Author

**Shijo Shaji**
- 🌐 Website: [shijoshaji.in](https://shijoshaji.in)
- 🐙 GitHub: [shijoshaji](https://github.com/shijoshaji)

## 📄 License

MIT
