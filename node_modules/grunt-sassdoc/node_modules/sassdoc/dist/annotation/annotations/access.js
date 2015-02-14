"use strict";

module.exports = access;
function access() {
  return {
    name: "access",

    parse: function parse(text) {
      return text.trim();
    },

    "default": function _default() {
      return "public";
    },

    multiple: false };
}