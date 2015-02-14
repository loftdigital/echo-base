"use strict";

module.exports = content;
function content() {
  return {
    name: "content",

    parse: function parse(text) {
      return text.trim();
    },

    autofill: function autofill(item) {
      if (item.context.code.indexOf("@content") > -1) {
        return "";
      }
    },

    allowedOn: ["mixin"],

    multiple: false };
}