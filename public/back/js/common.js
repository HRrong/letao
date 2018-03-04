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
    })
    
});