"use strict";

module.exports = todo;
function todo() {
  return {
    name: "todo",

    parse: function parse(text) {
      return text.trim();
    },

    alias: ["todos"] };
}