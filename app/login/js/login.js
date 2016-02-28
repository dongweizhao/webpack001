/**
 * Created by dongweizhao on 16-2-28.
 */

var common = require('../../common/js/common'),tmp=require('../tpl/test.html');
require('../../common/js/plugin');
require('../../common/css/common.css');


$('#mydiv').html('<h1>Jquery MyDiv</h1>');
$('h3').greenify();
common.say();
var tmp_html = _.template(tmp)({message: {
    name: '小明'
}});
$('#test').html(tmp_html);
