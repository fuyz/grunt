/*
 * lucifer
 * https://github.com/zhihe/lucifer
 *
 * Copyright (c) 2017 fuyz
 * Licensed under the MIT license.
 */

(function(exports) {

  'use strict';

    var a = 1231;
    function fn() {
        var a = 3;
    }

  exports.awesome = function() {
    return 'awesome';

  };

}(typeof exports === 'object' && exports || this));

