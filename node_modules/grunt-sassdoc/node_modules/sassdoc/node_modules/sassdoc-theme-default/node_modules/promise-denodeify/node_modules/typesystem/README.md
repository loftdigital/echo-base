# typesystem

> Sophisticated Type Checking for JavaScript.

[![license](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://raw.githubusercontent.com/clebert/typesystem/master/LICENSE)
[![npm](http://img.shields.io/npm/v/typesystem.svg?style=flat)](https://www.npmjs.org/package/typesystem)
[![downloads](http://img.shields.io/npm/dm/typesystem.svg?style=flat)](https://www.npmjs.org/package/typesystem)

[![build](http://img.shields.io/travis/clebert/typesystem/master.svg?style=flat)](https://travis-ci.org/clebert/typesystem)
[![coverage](http://img.shields.io/coveralls/clebert/typesystem/master.svg?style=flat)](https://coveralls.io/r/clebert/typesystem)
[![code climate](http://img.shields.io/codeclimate/github/clebert/typesystem.svg?style=flat)](https://codeclimate.com/github/clebert/typesystem)
[![dependencies](http://img.shields.io/david/clebert/typesystem.svg?style=flat)](https://david-dm.org/clebert/typesystem#info=dependencies&view=table)
[![devDependencies](http://img.shields.io/david/dev/clebert/typesystem.svg?style=flat)](https://david-dm.org/clebert/typesystem#info=devDependencies&view=table)

## Getting Started

### Installation

```sh
npm install typesystem --save
```

### Integration

```javascript
var ts = require('typesystem');
```

## API

### Overview

- [ts.MAX_SAFE_INTEGER](#tsmax_safe_integer)
- [ts.checkArgument(value, predicate, [defaultValue])](#tscheckargumentvalue-predicate-defaultvalue)
- [ts.isArguments(value)](#tsisargumentsvalue)
- [ts.isArray(value)](#tsisarrayvalue)
- [ts.isBoolean(value)](#tsisbooleanvalue)
- [ts.isDate(value)](#tsisdatevalue)
- [ts.isDecimal(value)](#tsisdecimalvalue)
- [ts.isError(value)](#tsiserrorvalue)
- [ts.isFunction(value)](#tsisfunctionvalue)
- [ts.isInteger(value)](#tsisintegervalue)
- [ts.isNaN(value)](#tsisnanvalue)
- [ts.isNull(value)](#tsisnullvalue)
- [ts.isNumber(value)](#tsisnumbervalue)
- [ts.isObject(value)](#tsisobjectvalue)
- [ts.isRegExp(value)](#tsisregexpvalue)
- [ts.isString(value)](#tsisstringvalue)
- [ts.isUndefined(value)](#tsisundefinedvalue)
- [ts.isVoid(value)](#tsisvoidvalue)

### ts.MAX_SAFE_INTEGER

This constant represents the [maximum safe integer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) in JavaScript (2^53 - 1).

### ts.checkArgument(value, predicate, [defaultValue])

```javascript
ts.checkArgument('foo', ts.isString);            // returns 'foo'
ts.checkArgument('foo', ts.isString, 'bar');     // returns 'foo'

ts.checkArgument('foo', ts.isInteger);           // throws a type error
ts.checkArgument('foo', ts.isInteger, 123);      // throws a type error

ts.checkArgument(0, ts.isInteger);               // returns 0
ts.checkArgument(0, ts.isInteger, 123);          // returns 0

ts.checkArgument(0, ts.isString);                // throws a type error
ts.checkArgument(0, ts.isString, 'bar');         // throws a type error

ts.checkArgument(null, ts.isVoid);               // returns null
ts.checkArgument(undefined, ts.isVoid);          // returns undefined

ts.checkArgument(null, ts.isString);             // throws a type error
ts.checkArgument(undefined, ts.isString);        // throws a type error

ts.checkArgument(null, ts.isString, 'bar');      // returns 'bar'
ts.checkArgument(undefined, ts.isString, 'bar'); // returns 'bar'
```

### ts.isArguments(value)

```javascript
ts.isArguments(arguments); // returns true
```

### ts.isArray(value)

```javascript
ts.isArray([]); // returns true
```

### ts.isBoolean(value)

```javascript
ts.isBoolean(false); // returns true
ts.isBoolean(true);  // returns true
```

### ts.isDate(value)

```javascript
ts.isDate(new Date()); // returns true
```

### ts.isDecimal(value)

```javascript
ts.isDecimal(Number.MIN_VALUE);     // returns true
ts.isDecimal(-ts.MAX_SAFE_INTEGER); // returns true
ts.isDecimal(+ts.MAX_SAFE_INTEGER); // returns true
```

### ts.isError(value)

```javascript
ts.isError(new Error());          // returns true
ts.isError(new EvalError());      // returns true
ts.isError(new RangeError());     // returns true
ts.isError(new ReferenceError()); // returns true
ts.isError(new SyntaxError());    // returns true
ts.isError(new TypeError());      // returns true
ts.isError(new URIError());       // returns true
```

### ts.isFunction(value)

```javascript
ts.isFunction(function () {}); // returns true
```

### ts.isInteger(value)

```javascript
ts.isInteger(-ts.MAX_SAFE_INTEGER); // returns true
ts.isInteger(+ts.MAX_SAFE_INTEGER); // returns true
```

### ts.isNaN(value)

```javascript
ts.isNaN(NaN); // returns true
```

### ts.isNull(value)

```javascript
ts.isNull(null); // returns true
```

### ts.isNumber(value)

```javascript
ts.isNumber(NaN);              // returns true
ts.isNumber(Infinity);         // returns true
ts.isNumber(Number.MIN_VALUE); // returns true
ts.isNumber(Number.MAX_VALUE); // returns true
```

### ts.isObject(value)

```javascript
ts.isObject({}); // returns true
```

### ts.isRegExp(value)

```javascript
ts.isRegExp(/(?:)/); // returns true
```

### ts.isString(value)

```javascript
ts.isString(''); // returns true
```

### ts.isUndefined(value)

```javascript
ts.isUndefined(undefined); // returns true
```

### ts.isVoid(value)

```javascript
ts.isVoid(null);      // returns true
ts.isVoid(undefined); // returns true
```

## Running Tests

To run the test suite first install the development dependencies:

```sh
npm install
```

then run the tests:

```sh
npm test
```
