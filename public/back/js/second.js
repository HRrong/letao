$(function(){
    var page = 1;
    var pagesize = 5;

    // 分页 渲染数据
    function render(){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:page,
                pageSize:pagesize
            },
            success:function(info){
                $('tbody').html(template('tpl',info));

                // 分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    numberOfPages:5,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,p){
                        page = p;
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
        })
    }
    render();

    // 显示添加分类模态框
    //1. 点击添加分类，显示模态框, 加载一级分类的数据
    $('.addBtn').on('click',function(){
        $("#addModal").modal('show');

        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                paageSize:100
            },
            success:function(info) {
                console.log(info);
            }
        });
    });

    // 

    // 图片预览
    $('#fileupload').fileupload({
        dataType:'json',
        // e：事件对象
        // data:图片上传的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function(e,date){
            $('.img_box img').attr('src',date._response.result.picAddr)
        }
    });

    // 表单校验
    // var $form = $("form"); //不用多次查找元素
    // $form.bootstrapValidator({
    //     // 指定校验时的图标显示，默认是bootstrap风格
    //     feedbackIcons: {
    //         valid: 'glyphicon glyphicon-ok',
    //         invalid: 'glyphicon glyphicon-remove',
    //         validating: 'glyphicon glyphicon-refresh'
    //     },
    //     // 指定校验字段
    //     fields: {
    //         categoryId:{
    //             validators: {
    //                 //不能为空
    //                 notEmpty: {
    //                 message: '用户名不能为空'
    //                 },
    //         }
    //     }
    // });
});