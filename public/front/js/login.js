$(function(){

    $('.btn_login').on('click',function(){
        //判断用户是否输入用户名和密码
        var username = $("input[type='username']").val();
        var password = $("input[type='password']").val();
        
        if(!username){
            mui.toast('请输入用户名');
            return;
        }
        if(!password){
            mui.toast('请输入密码');
            return;
        }

        // 发送请求验证用户是否存在
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            success:function(info){
                if(info.error == 403){
                    mui.toast(info.message);
                    return;
                }

                // 登录成功如果是从前一个页面跳到登陆页，就返回上一页
                // 否则跳转到会员中心
                // console.log(getKey('retUrl')) 不能使用封装过的，因为是以等号截取数据，如果有多个等号就会有参数的值获取不了。
                if(location.search.indexOf("retUrl") != -1){
                    //说明有，跳转到上一页,调回到retUrl指定的地址
                    //history.go(-1);   
                    location.href = location.search.replace("?retUrl=", "");
                }else{
                    location.href='user.html';
                }
            }
        });
    }); 
}); 