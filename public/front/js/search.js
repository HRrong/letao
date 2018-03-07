$(function(){
    // 约定键值：‘search_list’
    // a = [1,2,3,4,5,6,7,8,9,10]
    // var arr = localStorage.setItem('search_list',JSON.stringify(a));

    // 1-读取本地缓存 并且需要返回数组
    function getHistory(){
        var history  = localStorage.getItem('search_list') || '[]';
        // 取到的值是json 数组，需要转成数组
        var arr = JSON.parse(history);
        return arr;
    }


    // 2-渲染数据
    // 要求只渲染十条数据
    function render(){
        // 获取缓存数据
        var arr = getHistory();

        // 使用模板渲染数据
        $('.lt_history').html(template('tpl',{list:arr}));
    }
    render();


    // 3-删除单条数据
    $('.lt_history').on('click','.btn_delete',function(){
        // 在弹出框里的this 指向是当前的弹出框，要把this负值给一个变量
        var that = this;

        // 弹出框
        mui.confirm('你确定要删除这条记录吗？',"温馨提示",["是","否"],function(e){
            if(e.index === 0){
                //下标
                var index = $(that).data("index");  
                // 获取缓存数据
                var arr = getHistory();
                // splice 根据下标删除对应是数据
                arr.splice(index,1);
                // 再把删除后的数组存到本地
                localStorage.setItem('search_list',JSON.stringify(arr));
                render();
            }
        })
    }); 


    // 4-清空所有数据
    $('.lt_history').on('click','.btn_empty',function(){
        // 弹出一个确认框
        mui.confirm('你确定要清空所有的历史记录吗？',"温馨提示",["是","否"],
        function(e){
            // 1:表示否  0：表示是
            if(e.index === 0) {
                localStorage.removeItem('search_list');
                console.log(localStorage.removeItem('search_list'))
                render();
            }
        });
    });


    
    // 5-添加数据到本地
    // 只能显示十条数据
    $('.search_btn').on('click',function(){
        // 获取输入框的内容，并去掉空白文本
        var value = $(this).prev().val().trim();
        // 清空输入框
        $(this).prev().val('');
        if(value == ''){
            return;
        }

        // 添加数据到本地
        var arr = getHistory();
        
        var index = arr.indexOf(value);
        // 如果数据未搜索,就删除已有的，然后再添加数组前面
        if(index != -1) {
            arr.splice(index,1);
        }

        // 数据只显示十条,如果超出就删除数组中的最后一条
        if(arr.length >= 10){
            arr.pop();
        }

        arr.unshift(value);

        // 重新添加到本地
        localStorage.setItem('search_list',JSON.stringify(arr));
        // 重新渲染
        // render();

        //重新渲染, 需要跳转到searList页面
        location.href = 'searchList.html?key='+value;

    }); 

});