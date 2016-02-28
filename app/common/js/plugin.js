/**
 * Created by dongweizhao on 16-2-28.
 */
(function ($) {
    const shade = "#556b2f";
    $.fn.greenify = function() {
        this.css( "color", shade );
        return this;
    };
}(jQuery));