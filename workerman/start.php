<?php
require_once __DIR__ . '/Autoloader.php';
require_once  __DIR__ .'/vendor/autoload.php';
require_once 'Common.php';
use Workerman\Worker;
use Workerman\App\HandleMessage;
use Workerman\Config;
use Workerman\Lib\Timer;

$wsWorker = new Worker('websocket://0.0.0.0:2000');

$wsWorker -> count = 4;

$wsWorker -> onWorkerStart = function($wsWorker){
    global $db;
    $db = Config::getDb();


    Timer::add(1, function()use($wsWorker){
        $time_now = time();
        foreach($wsWorker->connections as $connection) {
            // 有可能该connection还没收到过消息，则lastMessageTime设置为当前时间
            if (empty($connection->lastMessageTime)) {
                $connection->lastMessageTime = $time_now;
                continue;
            }
            // 上次通讯时间间隔大于心跳间隔，则认为客户端已经下线，关闭连接
            if ($time_now - $connection->lastMessageTime > 55) {
                $connection->close();
            }
        }
    });
};

$wsWorker -> onConnect = function($connection){

    echo '登陆';

};


$wsWorker -> onMessage = function($connection, $data){
    $connection->lastMessageTime = time();
    echo 'client:'.$data."\n";
    $res = HandleMessage::getData($data);
    echo 'server:'.$res."\n";
    $connection -> send($res);
};

$wsWorker -> onError = function($connection, $code, $msg){
    echo 'errorCode:'.$code.$msg;
};

$wsWorker -> onClose = function($connection){
    echo '链接已断开';
};

Worker::runAll();