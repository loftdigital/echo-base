'use strict';

module.exports = function byType(data) {
  var byType = {};

  data.forEach(function (item) {
    var type = item.context.type;

    if (!(type in byType)) {
      byType[type] = [];
    }

    byType[type].push(item);
  });

  return byType;
};
