/**
 * Created by dongweizhao on 16-2-28.
 */

var common = require('../../common/js/common');
require('../../common/js/plugin');
require('../../../resource/lib/bootstrap/js/bootstrap');
require('../../../resource/lib/bootstrap/css/bootstrap.css');
require('../css/index.css');
require('../../common/css/common.css');
//require('../../../node_modules/bootstrap/dist/css/bootstrap.css');
document.write('I am Index');

$('p').greenify();

common.say();
