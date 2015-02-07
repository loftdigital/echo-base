"use strict";

module.exports = output;
function output() {
  return {
    name: "output",

    parse: function parse(text) {
      return text.trim();
    },

    alias: ["outputs"],

    allowedOn: ["mixin"],

    multiple: false };
}