<h1 align="center"><code>math-exec.js</code></h1>

<p align="center">Evaluate math in strings safely</p>

## ⚙️ Installation

```js
npm i math-exec
```

**CDN Links:**
- https://cdn.jsdelivr.net/npm/math-exec@1.0.0/math-exec.js
- https://www.unpkg.com/math-exec@1.0.0/math-exec.js

## 📖 Usage

#### ● Import

```js
// ES6
import mathExec from "math-exec";

// commonjs
const mathExec = require("math-exec");
```

#### ● Evaluate

```js
mathExec("1 + 2 * 3 / 1");
mathExec("sin(45) ^ 2");
mathExec("2 + 3 % 2");
mathExec("log(10, 100) * 2");
```

Make sure to `console.log()` the values!

| Operator names | Operator names | Operator names |
| --- | --- | --- |
| ** | + | - |
| * | / | % |
| ^ | // | log |
| log10 | min | max |
| random | sqrt | abs |
| round | ceil | floor |
| sin | cos | tan |
| asin | acos | atan |
| exp | floorDiv | mod |
| roundTo | cbrt | expm1 |
| hypot | sign | trunc |

---

[Support me on Patreon](https://www.patreon.com/axorax) — 
[Check out my socials](https://github.com/axorax/socials)