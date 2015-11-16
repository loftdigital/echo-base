//  @copyright 2015, Loft Digital, www.weareloft.com
//  Licensed under MIT (https://github.com/loftdigital/echo-base/blob/develop/LICENSE)

(function () {
    'use strict';

    var path = require('path'),
        truesass = require('sass-true');

    var sassFile = path.join(__dirname, 'test.scss');

    truesass.runSass({file: sassFile}, describe, it);

})();
