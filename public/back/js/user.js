$(function(){
    var page=1;
    var pageSize = 5;
    // 获取用户数据渲染到页面上
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page , 
                pageSize:pageSize
            },
            dataType:'json',
            success:function (info) {
                $('.table tbody').html(template('tpl',info));
                
                // 渲染分页
                //6. 渲染分页
            $("#paginator").bootstrapPaginator({
                bootstrapMajorVersion:3,//boostrap使用版本 2使用div元素，3使用ul
                currentPage:page, //设置当前页
                numberOfPages: 5, //设置控件显示的页码数
                totalPages:Math.ceil(info.total / info.size),
                onPageClicked:function(a,b,c,p){
                //绑定clck事件
                page = p;
                render();
                }
            });
            }
        })
    }
    render();

    // 启用禁用用户
    $('tbody').on('click','.btn',function(){
        // 显示模态框
        $("#UserModal").modal("show");

        //获取到点击的按钮所在的用户的id
        var id = $(this).parent().data('id');
        var isDelete = $(this).hasClass('btn-success') ? 1 : 0;

        $('.btn_confim').off().on('click',function(){
            $.ajax({
                type:"POST",
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(info){
                    if(info.success) {
                        // 关闭模态框
                        $("#UserModal").modal("hide");
                        // 重新渲染
                        render();
                    }
                }
            });
        })
    });


}); 