/* jshint -W053 */

'use strict';

var valuesMap = {
    Arguments: [
        (function () {
            return arguments;
        }())
    ],
    Array: [
        []
    ],
    Boolean: [
        false,
        true
    ],
    Date: [
        new Date()
    ],
    Error: [
        new Error(),
        new EvalError(),
        new RangeError(),
        new ReferenceError(),
        new SyntaxError(),
        new TypeError(),
        new URIError()
    ],
    Function: [
        function () {}
    ],
    Null: [
        null
    ],
    Number: [
        NaN,
        Infinity,
        Number.MIN_VALUE,
        Number.MAX_VALUE
    ],
    Object: [
        {}
    ],
    RegExp: [
        /(?:)/
    ],
    String: [
        ''
    ],
    Undefined: [
        undefined
    ],
    Misc: [
        global,
        JSON,
        Math,
        new Boolean(),
        new Number(),
        new String()
    ]
};

exports.generateAllValues = function (types) {
    return types.reduce(function (values, type) {
        return values.concat(valuesMap[type]);
    }, []);
};

exports.generateAllValuesExcept = function (typesToExclude) {
    return Object.keys(valuesMap).filter(function (type) {
        return typesToExclude.every(function (typeToExclude) {
            return type !== typeToExclude;
        });
    }).reduce(function (values, type) {
        return values.concat(valuesMap[type]);
    }, []);
};
