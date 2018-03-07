$(function(){
     var key = getKey('key');
    // 地址栏中的参数填充到搜索框
    $('.lt_search input').val(key);
    
    // 渲染一次页面
    function render(){
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:{
                proName:key,
                page:1,
                pageSize:100,
            },
            success:function(info){
                console.log(info);
            }
        });
    }
    render();
    
}); 