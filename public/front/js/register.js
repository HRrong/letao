$(function(){
    // 发送验证码
    $('.btn_vcode').on('click',function(e){
        // 阻止默认事件防止表单默认提交
        // e.preventDefault();
        // 禁用按钮 
        // $this.prop("disabled", true).addClass("disabled").text("发送中...");
        $(this).prop('disabled',true).addClass('disabled').text('发送中');
        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function(info){
                console.log(info.vCode);
                //倒计时多少秒后再次发送
                var count=5
                var timer = setInterval(function(){
                    count--
                    $('.btn_vcode').text(count+'秒后再次发送');
                    if(count === 0){
                        clearInterval(timer);
                        // 恢复按钮
                        $('.btn_vcode').prop('disabled',false).removeClass('disabled').text('再次发送');
                    }
                },1000);
            }
        });
    });
    

    // 点击注册校验表单格式
    $(".btn_register").on('click',function(e){
        // 阻止默认提交表单
        e.preventDefault();
        
        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        var repassword = $("#repassword").val();
        var mobile = $("[name=mobile]").val();
        var vCode = $("[name=vCode]").val();


        if(!username) {
            mui.toast("用户名不能为空");
            return;
          }
      
          if(!password) {
            mui.toast("密码不能为空");
            return;
          }
      
          if(repassword != password) {
            mui.toast("确认密码与密码不一致");
            return;
          }
      
          if(!mobile) {
            mui.toast("手机号不能为空");
            return;
          }
      
          if(!/^1[3-9]\d{9}$/.test(mobile)){
            mui.toast("手机号码格式错误");
            return;
          }
      
          if(!vCode) {
            mui.toast("验证码不能为空");
            return;
          }

        //  校验通过发送请求
        $.ajax({
            type:'post',
            url:"/user/register",
            data:$("form").serialize(),
            success:function(info){
                if(!$('#box').is(':checked')){
                    mui.toast('请勾选会员服务协议');
                    return;
               }

               console.log(info);
               if(info.error){
                   mui.toast(info.message);
               }

               

               if(info.success) {
                mui.toast("恭喜你，注册成功了，2秒后自动跳转到登录页");
                setTimeout(function () {
                  location.href = "login.html";
                },2000);
              }
            }
        });
    });

});