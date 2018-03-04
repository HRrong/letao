// 页面加载完再执行里面的代码
// 防止全局污染
$(function(){
    $('form').bootstrapValidator({
      // 制定表单验证的字段
      fields:{
        //校验用户名，对应name表单的name属性
        username:{
        // 给username对应校验规则
          validators:{
             // 不能为空
            notEmpty:{
              message:'用户名不能为空'
            },
            // 长度校验
            stringLength:{
              min:2,
              max:8,
              message:'用户长度必须再2到8之间'
            },
            callback: {
              message:'用户名不存在'
            }
          }
        },

        //验证秘密
        password:{
          // 校验规则
          validators:{
            // 不能为空
            notEmpty:{
              message:'密码不能为空'  
            },
            // 长度校验
            stringLength:{
              min:6,
              max:12,
              message:'密码长度必须时6-12位'
            },
            callback:{
              message:'密码错误'
            }
          }
        }
      },

      // 配置小图标：成功 失败 校验中
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      }
    });

  $("form").on('success.form.bv',function(e){
    // 阻止表单自动提交
    e.preventDefault();
    

    // 发送ajax请求登录
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('form').serialize(),
      dataType:'json',
      success:function(info){
        console.log(info);
        
        if(info.error === 1000) {
           //把username这个字段改成校验失败,INVALID校验失败的图标
           $('form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
        }

        // 密码错误
        if(info.error === 1001) {
          $('form').data('boostrapValidator').updateStatus('password','INVALID','callback');
        }

        // 登录成功跳转页面
        if(info.success){
          location.href = 'index.html';
        }
      }
    })
  });

  // 3.重置表单
  $("[type='reset']").on("click", function () {
    
        $("form").data("bootstrapValidator").resetForm(true);
    
      });

});