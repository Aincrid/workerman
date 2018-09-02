/**
 *  im初始化
 */

define(['base', 'md5'], function (base, md5) {

    // 聊天界面初始化
    var imInit = function () {
        layui.use('layim', function (layim) {
            layim.config({
                init:
                    {
                        "url":
                        "code": 0, //0表示成功，其它表示失败
                        "msg": "",  //失败信息
                        "data": {

                            //我的信息
                            "mine": {
                                "username": "纸飞机" //我的昵称
                                , "id": "100000" //我的ID
                                , "status": "online" //在线状态 online：在线、hide：隐身
                                , "sign": "在深邃的编码世界，做一枚轻盈的纸飞机" //我的签名
                                , "avatar": "a.jpg" //我的头像
                            },

                            //好友列表
                            "friend": [{
                                "groupname": "前端码屌" //好友分组名
                                , "id": 1 //分组ID
                                , "list": [{ //分组下的好友列表
                                    "username": "贤心" //好友昵称
                                    , "id": "100001" //好友ID
                                    , "avatar": "a.jpg" //好友头像
                                    , "sign": "这些都是测试数据，实际使用请严格按照该格式返回" //好友签名
                                    , "status": "online" //若值为offline代表离线，online或者不填为在线
                                }]
                            }],

                            //群组列表
                            "group": [{
                                "groupname": "前端群" //群组名
                                , "id": "101" //群组ID
                                , "avatar": "a.jpg" //群组头像
                            }]

                        }
                    }
            });
        });


            // 创建websocket
            var ws = new WebSocket('ws://192.168.17.128:2000');

            ws.onopen = function (event) {
                console.log(event);
                timer;
            };

            // 0001{"number":1234, "data":"{a:b}", "sign":"abcded"}

            ws.onmessage = function (res) {
                console.log(res.data);

                data = res.data.slice(4);


                data = JSON.parse(data); // {"action":1234, "data":"{a:b}", "sign":"abcded"}
                var number = data.action;
                // 验签
                var dataSign = data.sign;
                if (checkSign(data.data, dataSign)) {
                    data = JSON.parse(data.data);
                    console.log(data);
                } else {
                    socketSend(number, {"msg": "验签失败"});
                }
            };

            ws.onerror = function (event) {
                console.log(event + '错误了');
            };
            ws.onclose = function (event) {
                clearInterval(timer);
            };

            // 心跳
            var timer = setInterval(function () {
                socketSend(0, "1010", ws);
            }, 50000);

        };

        /**
         * 发送消息
         * @param number  Int 协议号
         * @param data String "{a:b,c:d}"
         */
        var socketSend = function (number, data, ws) {
            var sendData = {};
            sendData.action = number;
            sendData.data = data;

            var sign = hex_md5(data + base.key);

            sendData.sign = sign;
            sendData = JSON.stringify(sendData);

            ws.send(sendData + '_^+^_');

        };


        /**
         * 验签
         * @param data 数据
         * @param dataSign 传过来的签名
         */
        var checkSign = function (data, dataSign) {
            var sign = hex_md5(data + base.idx);
            if (sign === dataSign) {
                return true;
            } else {
                return false;
            }
        }


        return {
            "imInit": imInit
        }

    }
);