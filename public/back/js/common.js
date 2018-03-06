/**
 * Created by HUCC on 2018/3/2.
 */
$(function(){
    // 禁用进度环
    NProgress.configure({
        showSpinner:false
    });

    // ajax发送请求前开启进度条
    $(document).ajaxStart(function(){
        // 进度条加载效果
        NProgress.start();
    });

    // 请求结束进度条结束
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done();
        },500)
    });


    // 二级菜单显示与隐藏
    // 找前一个兄弟元素
    $('.second').prev().on('click',function(){
        // 显示和隐藏状态之间切换
        $(this).next().slideToggle();
    });


    // 侧边栏显示隐藏
    $('.icon_menu').on('click',function(){
        $('.lt_aside').toggleClass('now');
        // margin-left 为0；添加动画
        $('.lt_main').toggleClass('now');
        $('.lt_header').toggleClass('now');
    });


    // 退出登录
    $('.icon_logout').on('click',function(){
        // $('#Mymodal').modal({
        //     keyboard: false
        //   })
        // 让模态框显示
        $('#Mymodal').modal('show');
    });

    // 模态框确定退出
    $('.btn_logout').on('click',function(){
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            success:function(info){
                if(info.success){
                    //退出成功，才跳转到登录页
                    location.href = 'login.html';
                }
            }
        });
    });


    // 不是登陆页，发送ajax请求，查询管理员是否登录
    if(location.href.indexOf('login.html') == -1 ){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            success:function(info){
                // 如果未登录就跳出到登录页
                if(info.error == 400 ) {
                    location.href = 'login.html';
                }
            }
        })
    }
});