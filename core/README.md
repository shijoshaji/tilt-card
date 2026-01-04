# @jojovms/tilt-card-core

A premium 3D tilt effect library for your UI.

## Installation
```bash
npm install @jojovms/tilt-card-core
```

## Usage
```javascript
import { Tiltō } from '@jojovms/tilt-card-core';

new Tiltō('#my-card', {
  max: 15,
  scale: 1.05,
  glare: true
});
```

## Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `max` | number | 15 | Max tilt rotation (deg) |
| `perspective` | number | 1000 | Transform perspective |
| `scale` | number | 1.05 | Element scale on hover |
| `glare` | boolean | false | Enable glare effect |
| `glareMaxOpacity` | number | 0.5 | Max opacity of glare |
