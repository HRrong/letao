$(function () {
    var page = 1;

    mui.init({
        pullRefresh: {
            container: '.mui-scroll-wrapper', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等

            up: {
                // height: 50, //可选.默认50.触发上拉加载拖动距离
                // auto: false, //可选,默认false.自动上拉加载一次
                // contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () {
                    page++
                    render(function(info){
                        if(info.data.length > 0 ) {
                            $('.lt_product').append(template('tpl',info));
                            mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(false);
                        }else {
                            //结束上拉拉刷新
                            mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh(true);
                        }
                    });
                }
            }
        }
    });


    // 渲染一次页面
    var render = function (callback) {
        if(page ===1 ){
            $('.lt_product').html('<div class="loading"></div>');
        }

        // 存放需要请求的参数
        obj = {};
        obj.proName = $(".lt_search input").val();
        obj.page = page;
        obj.pageSize = 4;

        // lt_sort下有now这个类，就传排序字段，否则不传
        var list = $('.lt_sort li.now');
        if (list.length > 0) {
            // 有now 值
            var sortName = list.data('type');
            var sortNum = list.find('span').hasClass('fa-angle-down') ? 1 : 2;
            obj[sortName] = sortNum;
        } else {
            console.log('没有排序字段');
        }

        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: obj,
            success: function (info) {
                console.log(info);
                setTimeout(function () {
                    callback(info);
                }, 1000);
            }
        });
    };

    // 页面第一次加载
    render(function(info){
        $('.lt_product').html(template('tpl',info));
    });
    


    // 1-地址栏中的参数填充到搜索框
    $('.lt_search input').val(getKey('key'));
    var proName = $(".lt_search input").val();


    // 2-输入框搜索筛选数据
    $('.search_btn').on('click', function () {
        //把所有的li的now全部干掉，并且把箭头全部向下
        $('.lt_sort li').removeClass('now').find('span').removeClass("fa-angle-up").addClass("fa-angle-down");

        var value = $(this).prev().val();
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: {
                proName: value,
                page: 1,
                pageSize: 100,
            },
            success: function (info) {
                $('.lt_product').html(template('tpl', info));
                // 搜索记录存到本地缓存
                var arr = JSON.parse(localStorage.getItem('search_list'));
                // 数据超过十条从后面删除元素
                if (arr.length >= 10) {
                    arr.pop();
                }
                var index = arr.indexOf(value);
                // 如果已经搜索过，就把已有是删除
                if (index != -1) {
                    arr.splice(index, 1);
                }

                // 添加到数组最前面
                arr.unshift(value);
                // 添加到本地缓存
                localStorage.setItem('search_list', JSON.stringify(arr));
            }
        });
    });


    // 3-筛选价格
    $('.lt_sort li').on('click', function () {
        $this = $(this);
        // 判断是否有now类名
        if ($this.hasClass('now')) {
            // 切换上下箭头类名
            $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        } else {
            // 当前点击的li 加上 now 类名
            $this.addClass('now').siblings().removeClass();
            // 其它箭头朝下
            $(".lt_sort li span").removeClass('fa-angle-up').addClass('fa-angle-down');
        }


        render();
    });
});