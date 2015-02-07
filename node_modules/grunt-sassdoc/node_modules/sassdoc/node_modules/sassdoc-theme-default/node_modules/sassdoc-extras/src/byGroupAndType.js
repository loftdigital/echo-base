'use strict';

module.exports = function byGroupAndType(data) {
  var byGroupAndType = {};

  data.forEach(function (item) {
    var group = item.group[0];
    var type = item.context.type;

    if (!(group in byGroupAndType)) {
      byGroupAndType[group] = {};
    }

    if (!(type in byGroupAndType[group])) {
      byGroupAndType[group][type] = [];
    }

    byGroupAndType[group][type].push(item);
  });

  return byGroupAndType;
};
