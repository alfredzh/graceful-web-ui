(function (window) {
    "use strict";

    var console = window.console,
        $ = window.jQuery,
        gui = window.gui,
        old = $.fn.guiPopup;

    //$.fn.guiPopup = function (option) {
        //return this.each(function () {
        //    $.fn.guiPopup.module._init(this, option);
        //});
    //}

    var Module = function(obj ,option) {
    	this._init(obj, option);
    }

    //$.fn.guiPopup.module = {
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

            //}
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
            //alert(document.body.scrollHeight)
            //console.log(visibleBody , bodyHeight , document.body.scrollHeight)

            $guiPopupWindow.css({
                'height': popWindowHeight
            });

            $guiPopupWindowBg.css({
                'height': popWindowHeight
            });

            $guiPopupCloseBtn.text(closeText);
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
                //var dataurl = $guiPopupBtn.attr('data-url');
                $guiPopupWindow.fadeIn(that.defaults.animationDuration);
                //$guiPopupContentNode.html(that.defaults.contentNodes.text);
                $guiPopupContentNode[that.defaults.contentNodes.html ? 'html' : 'text'](that.defaults.contentNodes.contents);

            });
            $regetGuiPopupCloseBtn.on('click.guiPopup.close',function () {
                $guiPopupWindow.fadeOut(that.defaults.animationDuration);
            });
        },
        close:function(){
        	$(this.popup).find('.gui-popup-window').fadeOut();
        }
    }

    $.fn.guiPopup = function (option) {
    	return this.each(function(){

    		var data = $(this).data('guiPopup');
    		if(!$(this).data('guiPopup')) {
    		
    			$(this).data('guiPopup', data = new Module(this,option));

    		}

    		if(typeof option == 'string') data[option]();
    	});
    }

    $.fn.guiPopup.defaults = {
        animationDuration: 500,
        mainWrapperClass: 'gui-popup-window',
        contentWrapperClass: 'gui-popup-content',
        contentNodeClass: 'gui-popup-content-node',
        closeBtnWrapperClass: 'gui-popup-closebtn',
        mainBgClass: 'gui-popup-bg',
        wrapper: 'body',
        contentNodes: {
            html: false,
            contents: 'JavaScript expressions can be evaluated as values inside .less files. We recommend using caution with this feature as the LESS will not be compilable by ports and it makes the LESS harder to maintain. If possible, try to think of a function that can be added to achieve the same purpose and ask for it on github. We have plans to allow expanding the default functions available. However, if you still want to use JavaScript in .less, this is done by wrapping the expression with back-ticks:'
        },
        closeBtn: {
            text: 'X'
        }
    };

    $.fn.guiPopup.noConflict = function () {
        $.fn.guiPopup = old;
        return this;
    };

})(window);
