"use strict";

module.exports = link;
var linkRegex = /\s*([^:]+\:\/\/[^\s]*)?\s*(.*?)$/;

function link() {
  return {
    name: "link",

    parse: function parse(text) {
      var parsed = linkRegex.exec(text.trim());

      return {
        url: parsed[1] || "",
        caption: parsed[2] || "" };
    },

    alias: ["source"] };
}