<?php
/**
 * Created by PhpStorm.
 * User: kirito
 * Date: 2018/8/25
 * Time: 18:56
 */

namespace Workerman\App;

/**
 * Class Logic
 * @package Workerman\App
 */
class Logic
{
    /**
     * @return string  {"data"=>"asdfc"}
     */
    public static function heartBeat(){
        echo 'heartBeat';
        return json_encode(array('data'=>''));
    }
}