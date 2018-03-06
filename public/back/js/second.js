$(function(){
    $('.addBtn').on('click',function(){
        $("#addModal").modal('show');
    });

    $('#fileupload').fileupload({
        dataType:'json',
        // e：事件对象
        // data:图片上传的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function(e,date){
            console.log(date);
        }
    });
});