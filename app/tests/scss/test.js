//  @copyright 2016, Loft Digital, www.weareloft.com
//  Licensed under MIT (https://github.com/loftdigital/echo-base/blob/develop/LICENSE)

import path from 'path';
import truesass from 'sass-true';

(() => {
  const sassFile = path.join(__dirname, 'test.scss');

  truesass.runSass({ file: sassFile }, describe, it);
})();
