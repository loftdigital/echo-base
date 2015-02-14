es6-denodeify
=============

> Convert callbacks to promises.

Why?
----

There's already a lot of modules in npm registry to convert callbacks to
promises. Why another?

All the modules I found for this purpuse were either depending on some
specific promise implementation, or expecting a global `Promise`
constructor. I needed a module that allowed me to inject the promise
implementation I'm using. And I found it, it is called
[promise-denodeify](https://github.com/clebert/promise-denodeify), but
since a few weeks it's marked as deprecated, without any recommended
alternative solution, and it displays a warning during npm installs when
you depend on it, which makes people freak out.

I already [tweeted](https://twitter.com/valeriangalliat/status/558209548390240256)
a really simple `denodeify` implementation, leveraging ES6 arrow
functions, and I like it in its brevity. I'm now publishing it as a npm
package.

Usage
-----

```js
const denodeify = require('es6-denodeify')(Promise)
const fs = require('fs')
const readFile = denodeify(fs.readFile)

readFile('package.json', 'utf8').then(console.log)
```

If you have a global `Promise` constructor and you want es6-denodeify to
use it, you can ommit the explicit `Promise` injection.

```js
const denodeify = require('es6-denodeify')()
```
