<?php
/**
 * Created by PhpStorm.
 * User: kirito
 * Date: 2018/8/22
 * Time: 21:54
 */

namespace Workerman\App;
use Workerman\Config;
class HandleMessage
{
    private static $number = array(
        0 => 'Logic/heartBeat',
        1 => 'Logic/login'
    );

    /**
     * @param $data|String {"action":"1000", "data":"abcdefg","sign":"assdsfewfdsgs"}._^+^_
     */
    public static function getData($data){
        $data = explode('_^+^_', $data);
        foreach($data as $val){
            if(!$val){
                continue;
            }
            return self::handleMessage($val);
        }
    }


    /**
     * @param $data|String {"action":"1000", "data":"abcdefg","sign":"assdsfewfdsgs"}
     * @return bool|string
     */
    public static function handleMessage($data)
    {
        $namespace = 'workerman\App';


        $newData = json_decode($data, true);
        $actionNumber = $newData['action']; // 协议号

        $sign = $newData['sign'];

        // 验签
        if (self::verifySign($sign, $data)) {
            return self::packData(array('action'=>$actionNumber, 'data'=>'验签失败'));
        }
        $actionData = (self::$number)[$actionNumber];

        $actionData = explode('/', $actionData);
        if(! isset($actionData)){
            return self::packData(array('action'=>$actionNumber, 'data'=>'协议号错误'));
        }
        $class = $actionData[0];
        $action = $actionData[1];

        $data = $newData['data']; // 数据

        $class = $namespace.'\\'.$class;
        $data = $class::$action($data); // {"data"=>"asdfc"}

        return self::packData($actionNumber, $data);

    }

    /**
     *  验签方式
     * @param $sign String 签名
     * @param $data String 收到的数据
     * @return bool
     */
    private static function verifySign($sign, $data)
    {
        $key = Config::$key;
        $dbSign = md5($data.$key);
        if($dbSign == $sign){
            return true;
        }else{
            return false;
        }
    }

    /**
     * @param $number|int 协议号
     * @param array $resData
     * @return bool|string
     */
    private static function packData($number, $recData = ''){
        $resData = array();

        // 加签
        $key = Config::$key;
        $sign = md5($recData.$key);

        $resData['sign'] = $sign;
        $resData['action'] = $number;
        $resData['data'] = $recData;

        $resData = json_encode($resData);
        // 包头
        $length = strlen($resData);

        if($length >=0 && $length <  10){
            $head = '000'.$length;
        }else if($length < 100 && $length >= 10){
            $head = '00'.$length;
        }else if($length >= 100 && $length < 1000){
            $head = '0'.$length;
        }else if($length < 10000 && $length >= 1000){
            $head = $length;
        }else{
            return false;
        }

        return $head.$resData;
    }
}