$(function(){
    // 判断用户是否登录过，没有退到登陆页


    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        success:function(info){
            console.log(info);
            if(info.error == 400) {
                location.href = 'login.html';
            }else {
                $('.user_msg').html(template('tpl',info));
            }
        }
    });

    // 用户退出
    $('.btn_logout').on('click',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            success:function(info){
                if(info.success){
                    location.href = 'login.html';
                }
            }
        }); 
    });
});