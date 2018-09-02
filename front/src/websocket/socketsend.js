import Md5 from 'md5'
import global_ from '../globalConfig'
const socketsend = function (number, data) {

    let sendData = {};
    sendData.action = number;
    sendData.data = data;


    let sign = Md5(data + global_.key);

    sendData.sign = sign;
    sendData = JSON.stringify(sendData);
    global_.ws.send(sendData + '_^+^_');

};
export default socketsend;