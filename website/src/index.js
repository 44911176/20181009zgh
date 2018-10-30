/**
 * Created by xqing on 2016/11/9.
 */
;(function (w, $) {
    function scrollItem(opts) {
        var defaultOpts = {
            node: null
        };
        /**
         * 参数合并
         */
        this.opts = $.extend(defaultOpts, opts);
        this.liNum = 3;//滑动margin

        this._init();
    }
    $.extend(scrollItem.prototype, {
        /**
         * 初始化入口
         * @private
         */
        _init: function () {

            var winWide = w.screen.width;
            if(winWide <= 750){
                this.liNum = 2;

            }

            this._layoutInit();
            this._bind();




        },
        /**
         * banner布局初始化
         * @private
         */
        _layoutInit: function () {
            var self = this;
            var eachWidth = parseInt($(this.opts.node).find('.item').css('width')) + parseInt($(this.opts.node).find('.item').css('margin-right'));
            var totalWidth = $(this.opts.node).find('.item').length * eachWidth +10;
            $(this.opts.node).css('width', totalWidth);
        },
        /**
         * 轮播图初始化
         * @private
         */
        _bind: function () {
            var self = this;
            var sliderWrap = $(this.opts.node);



            var flag = true; //是否可以点击左按钮
            var turnLeft = false; //是否到了最左边
            var eachWidth = parseInt($(this.opts.node).find('.item').css('width')) + parseInt($(this.opts.node).find('.item').css('margin-right'));
            var wrapperWith = eachWidth * self.liNum;
            var totalWidth = $(this.opts.node).find('.item').length * eachWidth;

            var leftBtn = sliderWrap.parents('.scroll-card-wrapper').find('.j_left');
            var rightBtn = sliderWrap.parents('.scroll-card-wrapper').find('.j_right');

            leftBtn.on('click',function () {
                var nowLeft = parseInt($(this).siblings('.item-wrapper').find('.scroll-box').css('left'));

                var thisLeft = nowLeft - eachWidth;
                // console.log((parseInt(wrapperWith) + Math.abs(parseInt(thisLeft)) >= parseInt(totalWidth))+' now');

                if(flag){
                    sliderWrap.css('left',thisLeft);
                }
                if(parseInt(thisLeft) < 0 && parseInt(wrapperWith) + Math.abs(parseInt(thisLeft)) >= parseInt(totalWidth)){
                    flag = false;
                    // turnLeft = true;
                }
                console.log(flag + 'flag');
                console.log(turnLeft + 'turn');

            });
            rightBtn.on('click',function () {
                var nowLeft = parseInt($(this).siblings('.item-wrapper').find('.scroll-box').css('left'));
                var thisLeft = nowLeft + eachWidth;

                if(nowLeft < 0){
                    sliderWrap.css('left',thisLeft);
                    flag = true;
                }

                if(thisLeft == 0){
                    turnLeft = false;
                }
                console.log(flag + 'flag');
                console.log(turnLeft + 'turn');

            });
            // w.setInterval(function () {
            //     if(flag && !turnLeft){
            //         leftBtn.trigger('click');
            //     }
            //     if(turnLeft && !flag){
            //         rightBtn.trigger('click');
            //     }
            // },1500)





        },


        /**
         * 自动滚
         * @private
         */
        _autoScroll: function (flag) {
            var self = this;

        },
        /**
         * 重新加载
         */
        reload: function () {
            this._init();
        }
    });

    /**
     * 暴露全局变量
     */
    if (!w.scrollItem) {
        w.scrollItem = function () {
            $('.j_scroll').each(function () {

                new scrollItem({
                    node: this
                });

            });
        };
    }

    /**
     * banner入口
     */
    $(function () {

            w.scrollItem();

    });

})(window, jQuery);