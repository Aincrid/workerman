/**
 *  im初始化
 */

define(['base', 'md5'], function(base, md5){

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

        ws.onopen = function(event){
            console.log(event);
            timer;
        };

        // 0001{"number":1234, "data":"{a:b}", "sign":"abcded"}

        ws.onmessage = function(data){
            console.log(data.data);
            // data = data.slice(0, 5);
            // data = JSON.parse(data); // {"action":1234, "data":"{a:b}", "sign":"abcded"}
            // var number = data.action;
            // // 验签
            // var dataSign = data.sign;
            // if(checkSign(data.data, dataSign)){
            //     data = JSON.parse(data.data);
            //     console.log(data);
            // }else{
            //     socketSend(number, {"msg":"验签失败"});
            // }
        };

        ws.onerror = function(event){
            console.log(event+'错误了');
        };
        ws.onclose = function(event){
            console.log(event);
        };

        // 心跳
        var timer = setInterval(function(){
            console.log(1);
            socketSend(0, "1", ws);
        }, 40000);

    };

    /**
     * 发送消息
     * @param number  Int 协议号
     * @param data String "{a:b,c:d}"
     */
    var socketSend = function(number, data, ws){
        var sendData = {};
        sendData.action = number;
        sendData.data = data;

        var sign = hex_md5(data+base.key);

        sendData.sign = sign;
        sendData = JSON.stringify(sendData);

       ws.send(sendData+'_^+^_');

    };



    /**
     * 验签
     * @param data 数据
     * @param dataSign 传过来的签名
     */
    var checkSign = function(data, dataSign){
        var sign = hex_md5(data+common.idx);
        if (sign === dataSign){
            return true;
        }else{
            return false;
        }
    }


    return {
        "imInit":imInit
    }

});