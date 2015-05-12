(function () {
    'use strict';

    var path = require('path'),
        truesass = require('sass-true');

    var sassFile = path.join(__dirname, 'test.scss');

    console.log(sassFile);

    truesass.runSass({file: sassFile}, describe, it);

})();
