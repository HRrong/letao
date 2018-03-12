
mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
});

// 把地址栏所有的参数封装成一个对象
function getKey(key){
    // 1-获取地址栏？后的参数
    var search = decodeURI(location.search);
    // 2-去掉？
    var search =search.slice(1);
    // 3-把字符串根据&切割成数组
    var arr = search.split("&");
    // 准备一个对象，存数据的值
    var obj = {};
    arr.forEach(function(ele,value){
        // 把数组中的字符串用 ‘=’ 分割成字符串
        var k = ele.split('=')[0];
        var v = ele.split('=')[1];
        obj[k]=v;
    }); 
    // 通过传进的参数直接获取到地址栏中的值。
    return obj[key];
}

