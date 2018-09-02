import socketSend from './socketsend'
import checkSign from './checksign'
import global_ from '../globalConfig'
const Websocket = function(){
    let ws = global_.ws;
    // console.log(ws);
    // return;
    ws.onopen = function (event) {
        console.log(event);
        timer;
    };

// 0001{"number":1234, "data":"{a:b}", "sign":"abcded"}

    ws.onmessage = function (res) {

        let data = res.data.slice(4);


        data = JSON.parse(data); // {"action":1234, "data":"{a:b}", "sign":"abcded"}
        let number = data.action;
        // 验签
        let dataSign = data.sign;
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
    ws.onclose = function () {
        clearInterval(timer);
    };

// 心跳
    let timer = setInterval(function () {
        socketSend(0, "1010", ws);
    }, 50000);

};

export default Websocket;

