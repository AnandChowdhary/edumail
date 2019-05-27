# 🎓 Edumail

[![Travis CI](https://img.shields.io/travis/AnandChowdhary/edumail.svg)](https://travis-ci.org/AnandChowdhary/edumail)
[![GitHub](https://img.shields.io/github/license/anandchowdhary/edumail.svg)](https://github.com/AnandChowdhary/edumail/blob/master/LICENSE)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/AnandChowdhary/edumail.svg)
[![Minzipped size](https://img.shields.io/bundlephobia/minzip/edumail-js.svg)](https://www.npmjs.com/package/edumail-js)
[![NPM version](https://img.shields.io/npm/v/edumail-js.svg)](https://www.npmjs.com/package/edumail-js)
[![Types](https://img.shields.io/npm/types/edumail-js.svg)](https://www.npmjs.com/package/edumail-js)

Edumail helps you identify educational emails for academic discounts.

It relies upon [JetBrains/swot](https://github.com/JetBrains/swot) to get educational email information.

## ⭐ Getting started

Install Edumail as a dependency:

```bash
npm install edumail
```

Then import and use the functions you need:

```js
import { isEducational } from "edumail";

const isEducationalEmail = await isEducational("example@america.edu");
// returns false
```

You can also use promises:

```js
isEducational("example@scu.edu").then(info => {
  console.log(info); // returns true
}).catch(error => {})
```

There are also functions to identify domains:

```js
import { isBlacklisted, isEducationalDomain } from "edumail";

const blacklisted = await isBlacklisted("example@america.edu"); // true
const educational = await isEducationalDomain("example@america.edu"); // true
```

## 📝 License

MIT
