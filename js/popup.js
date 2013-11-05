(function (window) {
    "use strict";

    var console = window.console,
        $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiPopup;

    var Module = function (obj, option) {
        this._init(obj, option);
    }

    Module.prototype = {
        _init: function (obj, option) {
            this.obj = obj;
            this._initOptions(option);
            this._appendPopup();
            this._eventHandler();
        },
        _initOptions: function (option) {
            this.defaults = $.extend({}, $.fn.guiPopup.defaults, option);
        },
        _appendPopup: function () {
            if ($('.gui-popup').length === 0) {
                $('<div class="gui-popup">').appendTo('body');
            }
            this.popup = $('.gui-popup').append('<div class="gui-popup-window">' +
                '<div class="gui-popup-content">' +
                '<b class="gui-popup-closebtn"></b>' +
                '<div class="gui-popup-content-node"></div>' +
                '</div>' +
                '<div class="gui-popup-bg"></div>' +
                '</div>');
        },
        _setAttributes: function () {
            var thatPopup = this.popup;
            var $guiPopupWindow = $(thatPopup).find('.gui-popup-window'),
                $guiPopupContent = $(thatPopup).find('.gui-popup-content'),
                $guiPopupCloseBtn = $(thatPopup).find('.gui-popup-closebtn'),
                $guiPopupWindowBg = $(thatPopup).find('.gui-popup-bg');

            var closeText = this.defaults.closeBtn.text;

            var visibleBody = document.documentElement.clientHeight;
            var bodyHeight = document.body.scrollHeight;//document.body.clientHeight;
            var popWindowHeight = bodyHeight;

            if (visibleBody > bodyHeight) {
                popWindowHeight = visibleBody;
            }

            $guiPopupWindow.css({
                'height': popWindowHeight
            });

            $guiPopupWindowBg.css({
                'height': popWindowHeight
            });

            var thisStyle = this.defaults.style;
            if(typeof thisStyle != 'undefined'){
                $guiPopupContent.css(
                    thisStyle
                );
            }

            $guiPopupCloseBtn.text(closeText);
            if(this.defaults.closeBtn.enable === false) $guiPopupCloseBtn.hide();
        },
        _eventHandler: function () {

            var that = this,
                thatPopup = that.popup;

            var $guiPopupCloseBtn = $(thatPopup).find('.gui-popup-closebtn'),
                $guiPopupWindow = $(thatPopup).find('.gui-popup-window'),
                $guiPopupContent = $(thatPopup).find('.gui-popup-content'),
                $regetGuiPopupCloseBtn = $(thatPopup).find('.gui-popup-closebtn'),
                $guiPopupContentNode = $(thatPopup).find('.gui-popup-content-node');

            $(this.obj).click(function () {
                that._setAttributes();

                $guiPopupWindow.fadeIn(that.defaults.animationDuration);

                $guiPopupContentNode[that.defaults.contentNodes.html ? 'html' : 'text'](that.defaults.contentNodes.contents);

            });
            $regetGuiPopupCloseBtn.on('click.guiPopup.close', function () {
                $guiPopupWindow.fadeOut(that.defaults.animationDuration);
            });
        },
        close: function () {
            $(this.popup).find('.gui-popup-window').fadeOut();
        }
    }

    $.fn.guiPopup = function (option) {
        return this.each(function () {

            var data = $(this).data('guiPopup');
            if (!$(this).data('guiPopup')) {

                $(this).data('guiPopup', data = new Module(this, option));

            }

            if (typeof option == 'string') data[option]();
        });
    }

    $.fn.guiPopup.defaults = {
        animationDuration: 500,
        style:{},
        contentNodes: {
            html: false,
            contents: ''
        },
        closeBtn: {
            enable: true,
            text: 'X'
        }
    };

    $.fn.guiPopup.noConflict = function () {
        $.fn.guiPopup = old;
        return this;
    };

})(window);
