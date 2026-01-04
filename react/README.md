# @jojovms/react-tilt-card

React wrapper for the Tilt Card library.

## Installation
```bash
npm install @jojovms/react-tilt-card
```

## Usage
```jsx
import { Tilt } from '@jojovms/react-tilt-card';

const MyCard = () => (
  <Tilt 
    max={25} 
    glare={true} 
    style={{ width: 300, height: 200, background: 'blue' }}
  >
    <h1>Hover Me</h1>
  </Tilt>
);
```
