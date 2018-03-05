$(function(){
    $.ajax({
        type:'GET',
        url:'/category/queryTopCategory',
        success:function (info) {
          console.log(info);
        }
      });
});