"use strict";

module.exports = throw_;
var autoParserError = /@error\s+(?:'|")([^'"]+)/g;
var uniq = require("lodash.uniq");

function throw_() {
  return {
    name: "throw",

    parse: function parse(text) {
      return text.trim();
    },

    autofill: function autofill(item) {
      var match = undefined;
      var throwing = item.throws || [];

      while (match = autoParserError.exec(item.context.code)) {
        throwing.push(match[1]);
      }

      if (throwing.length > 0) {
        return uniq(throwing);
      }
    },

    alias: ["throws", "exception"],

    allowedOn: ["function", "mixin", "placeholder"] };
}