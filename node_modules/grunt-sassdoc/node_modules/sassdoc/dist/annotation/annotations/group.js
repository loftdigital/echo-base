"use strict";

module.exports = group;
function group() {
  return {
    name: "group",

    parse: function parse(text) {
      return [text.trim().toLowerCase()];
    },

    "default": function _default() {
      return ["undefined"];
    },

    multiple: false };
}