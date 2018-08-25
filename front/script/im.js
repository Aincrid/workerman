/**
 *  im初始化
 */
define(function(){

    // 聊天界面初始化
    var imInit = function(){
        layui.use('layim', function (layim) {
            layim.config({
                brief: true //是否简约模式（如果true则不显示主面板）
            }).chat({
                name: '客服姐姐'
                , type: 'friend'
                , avatar: 'http://tp1.sinaimg.cn/5619439268/180/40030060651/1'
                , id: -2
            });
        });

        // 创建websocket
        var ws = new WebSocket('ws://192.168.17.128:2000');

        ws.onOpen = function(){
            console.log('连接上了');
        };

        ws.onMessage = function(data){
            console.log(data);
        };
    };

    // 创建websocket
    var socketInit = function(){

    };

    return {
        imInit : imInit
    }
});