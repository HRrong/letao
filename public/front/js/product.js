$(function(){
    var id = getKey('productId');
    console.log(id);

    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:id,
        success:function(info){
            console.log(info);
        }
    });
});