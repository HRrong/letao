$(function(){
    var productId = getKey('productId');
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{id:productId},
        success:function(info){
            console.log(info);
            $('.product_detail').html(template('tpl',info));

            // 数量组件初始化
            mui($('.mui-numbox')).numbox();

            // 自动播放轮播图
            //获得slider插件对象
            mui('.mui-slider').slider({
                interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
            });

            // 选择尺码添加类名
            $('.lt_size span').on('click',function(){
                $(this).addClass("now").siblings().removeClass("now");
            });
        }
    });

    

    // 加入购物车
    $('.btn_add_cart').on('click',function(){
        // 获取尺码 数量
        var size = $('.lt_size span.now').text();
        var num = $('.mui-numbox-input').val();
        
        // 如果没有选择尺码和数量，显示提示框
        if( !size) {
            mui.toast('请选择尺码');
            return;
        }

        if( num == 0) {
            mui.toast('请选择数量');
            return;
        }

        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId: productId,
                num:num,
                size:size
            },
            success:function(info){
                // 需要判断用户是否登录
                if(info.error == 400){
                    location.href = 'login.html';
                }else {
                    location.href = 'cart.html';
                }
            }
        })
    });

    
});