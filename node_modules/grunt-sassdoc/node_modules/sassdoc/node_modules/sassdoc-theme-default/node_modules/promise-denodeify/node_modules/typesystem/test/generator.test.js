/* global describe, it */

'use strict';

var assert    = require('extended-assert');
var generator = require('./generator');

var serialize = function (values) {
    return values.map(function (value) {
        var type = typeof value;

        switch (type) {
            case 'number': {
                if (value === Number.MIN_VALUE) {
                    return 'number:MIN_VALUE';
                }

                if (value === Number.MAX_VALUE) {
                    return 'number:MAX_VALUE';
                }

                return 'number:' + value;
            }
            case 'boolean':
            case 'string': {
                return type + ':' + value;
            }
            default: {
                return Object.prototype.toString.call(value);
            }
        }
    });
};

describe('generator', function () {
    describe('.generateAllValues()', function () {
        it('returns an array of all values of the given types', function () {
            assert.deepEqual(serialize(generator.generateAllValues([
                'Arguments'
            ])), [
                '[object Arguments]'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'Array'
            ])), [
                '[object Array]'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'Boolean'
            ])), [
                'boolean:false',
                'boolean:true'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'Date'
            ])), [
                '[object Date]'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'Error'
            ])), [
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'Function'
            ])), [
                '[object Function]'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'Null'
            ])), [
                '[object Null]'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'Number'
            ])), [
                'number:NaN',
                'number:Infinity',
                'number:MIN_VALUE',
                'number:MAX_VALUE'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'Object'
            ])), [
                '[object Object]'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'RegExp'
            ])), [
                '[object RegExp]'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'String'
            ])), [
                'string:'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'Undefined'
            ])), [
                '[object Undefined]'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'Misc'
            ])), [
                '[object global]',
                '[object JSON]',
                '[object Math]',
                '[object Boolean]',
                '[object Number]',
                '[object String]'
            ]);

            assert.deepEqual(serialize(generator.generateAllValues([
                'Null',
                'Undefined',
                'Error'
            ])), [
                '[object Null]',
                '[object Undefined]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]'
            ]);
        });
    });

    describe('.generateAllValuesExcept()', function () {
        it('returns an array of all values not of the given types', function () {
            assert.deepEqual(serialize(generator.generateAllValuesExcept([
                'Boolean',
                'Number',
                'String'
            ])), [
                '[object Arguments]',
                '[object Array]',
                '[object Date]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Error]',
                '[object Function]',
                '[object Null]',
                '[object Object]',
                '[object RegExp]',
                '[object Undefined]',
                '[object global]',
                '[object JSON]',
                '[object Math]',
                '[object Boolean]',
                '[object Number]',
                '[object String]'
            ]);
        });
    });
});
