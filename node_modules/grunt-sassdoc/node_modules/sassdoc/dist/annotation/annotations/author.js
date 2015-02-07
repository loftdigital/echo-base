"use strict";

module.exports = author;
function author() {
  return {
    name: "author",

    parse: function parse(text) {
      return text.trim();
    } };
}