<?php
/**
 * Created by PhpStorm.
 * User: kirito
 * Date: 2018/8/22
 * Time: 21:51
 */
namespace Workerman;
use Workerman\MySQL\Connection;


class Config
{
    // mysql 配置
    public static $instance = null;

    private static $host = '';
    private static $port = '';
    private static $user = '';
    private static $pass = '';
    private static $db = '';

    public static $key = 'ceshiworkerman';




    /**
     *  mysql实例化
     * @return null|Connection
     */
    public static function getDb()
    {
        if(! self::$instance){
            self::$instance = new Connection(self::$host, self::$port, self::$user, self::$pass, self::$db);
        }

        return self::$instance;
    }


}