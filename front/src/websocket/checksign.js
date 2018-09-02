import Md5 from 'md5';
import global_ from '../globalConfig'
const checkSign = function (data, dataSign) {
    let sign = Md5(data + global_.key);
    if (sign === dataSign) {
        return true;
    } else {
        return false;
    }
}

export default checkSign;