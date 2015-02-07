"use strict";

module.exports = deprecated;
function deprecated() {
  return {
    name: "deprecated",

    parse: function parse(text) {
      return text.trim();
    },

    multiple: false };
}