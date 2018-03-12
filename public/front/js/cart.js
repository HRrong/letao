$(function () {


    
    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                auto: true, //可选,默认false.首次加载自动上拉刷新一次
                callback: function () {
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    $.ajax({
                        type: 'get',
                        url: '/cart/queryCart',
                        success: function (info) {
                            setTimeout(function () {
                                // 没有登录跳转到登陆页，登录成功需要跳
                                if (info.error == 400) {
                                    location.href = 'login.html?retUrl=' + location.href;
                                }
                                console.log(info);

                                // 获取购物车数据，渲染到页面 数据是数组的格式
                                $('.media').html(template('tpl', {
                                    list: info
                                }));



                                // 结束下拉刷新
                                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
                                // console.log()
                            }, 1000);
                        }
                    });
                }
            }
        }
    });

    // 删除商品
    $('.media').on('tap', '.btn_delete', function () {
        var id = $(this).data('id');

        mui.confirm('你确定要删除这个商品吗？', '温馨提示', ["否", '是'], function (e) {
            if (e.index == 1) {
                // 发送请求删除商品
                $.ajax({
                    type: 'get',
                    url: '/cart/deleteCart',
                    data: {
                        id: [id]
                    },
                    success: function (info) {
                        if (info.success) {
                             //删除成功，重新下拉
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
        })
    });


    // 修改商品信息
    $('.media').on('tap','.btn_edit',function(){

        // 获取存在a 标签的数据
        var data = this.dataset;
        console.log(data);
        var html = (template('tpl2',data));
        // html 中有很多换行，把字符串的\n 替换成 ‘’；
        html = html.replace(/\n/g,'');

        mui.confirm(html,'编辑商品',['确定','取消'],function(e){
            if(e.index === 0) {
                // 获取参数 id 和 尺码
                var id =  data.id;
                var num = $(".mui-numbox-input").val();
                var size = $(".lt_edit_size span.now").text();
                console.log(num);

                $.ajax({
                    type:'post',
                    url:"/cart/updateCart",
                    data:{
                        id:id,
                        num:num,
                        size:size
                      },
                      success:function (info) {
                        if(info.success) {
                          //下拉刷新一次
                          mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
        });

        // 尺码注册点击事件
        $('.lt_edit_size span').on('tap',function(){
            $(this).addClass('now').siblings().removeClass('now');
        })
        //numbox也需要重新初始化
        mui(".mui-numbox").numbox();    
    });


    //计算金额
  $('body').on('change','.ck',function(){
        var total = 0;
        // 表单选择器
        $(':checked').each(function(){
            var num = $(this).data('num');
            var price = $(this).data('price');
            total += num*price;
        });

        $('.lt_total .total').text(total.toFixed(2));
  });
  
});