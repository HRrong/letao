$(function(){
  // 一级分类
    $.ajax({
        type:'GET',
        url:'/category/queryTopCategory',
        success:function (info) {
          $('.top').html(template('navTpl',info));
          console.log(info.rows[0].id);

          // 渲染二级分类
          randerSecond(info.rows[0].id);
        }
      });

  $('.top').on('click','li',function(){
    $(this).addClass('now').siblings().removeClass('now');
    id = $(this).data('id');
    randerSecond(id)
  });

  // 二级分类
  function randerSecond(id){
    $.ajax({
      type:'get',
      url:"/category/querySecondCategory",
      data:{
        id: id 
      },
      success:function(info){
        console.log(info)
        $('.second').html(template('secondTpl',info));
      }
    });
  }
});