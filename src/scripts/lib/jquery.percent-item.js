(function ($) {
    'use strict';
    $.fn.percentize = function (opts) {
        return this.each(function () {
            var $item = $(this);
            var percent = $item.data('percentage');
            $item.css('width', +percent * 100 + '%');
        });
    };

})(window.jQuery);
