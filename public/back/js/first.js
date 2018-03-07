$(function(){
    var page = 1;
    var pageSize = 5;

    // 显示添加分类模态框
    $('.addBtn').click(function(){
        $('#addModal').modal('show');
    });

    $('.btn_add').click(function(){
        $('#addModal').modal('hide');
        var categoryName = $('.categoryName').val();
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:{
                categoryName:categoryName
            },
            success:function(info){
                if(info.success){
                    render();
                    $('.categoryName').val(" ");
                }
            }
        });
   });


    // 分类列表
    function render(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(info){
                console.log(info);
               $('tbody').html(template('tpl',info));
               // 分类页
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    numberOfPages: 5, //设置控件显示的页码数
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,p){
                        page=p;
                        render();
                    },
                    itemTexts:function(type, page, current){ //修改显示文字
                        switch (type) {
                        case "first":
                            return "第一页";
                        case "prev":
                            return "上一页";
                        case "next":
                            return "下一页";
                        case "last":
                            return "最后一页";
                        case "page":
                            return page;
                        }
                    }
                });
            }
         });
    }
    render();

    
});