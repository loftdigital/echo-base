"use strict";

module.exports = type;
function type() {
  return {
    name: "type",

    parse: function parse(text) {
      return text.trim();
    },

    allowedOn: ["variable"],

    multiple: false };
}