<?php
require_once __DIR__ . '/Autoloader.php';
require_once  __DIR__ .'/vendor/autoload.php';
use Workerman\Worker;
use Workerman\App\HandleMessage;
use Workerman\Config;
use Workerman\Lib\Timer;

$wsWorker = new Worker('websocket://0.0.0.0:2000');

$wsWorker -> count = 4;

$wsWorker -> onWorkerStart = function($wsWorker){
    global $db;
    $db = Config::getDb();
    echo '<pre>';
    var_dump($db);

//    Timer::add(1, function()use($wsWorker){
//        $time_now = time();
//        foreach($wsWorker->connections as $connection) {
//            // 有可能该connection还没收到过消息，则lastMessageTime设置为当前时间
//            if (empty($connection->lastMessageTime)) {
//                $connection->lastMessageTime = $time_now;
//                continue;
//            }
//            // 上次通讯时间间隔大于心跳间隔，则认为客户端已经下线，关闭连接
//            if ($time_now - $connection->lastMessageTime > 3) {
//                $connection->close();
//            }
//        }
//    });
};

$wsWorker -> onConnect = function($connection, $data){

    echo $connection.'登陆';

};

$wsWorker -> onMessage = function($connection, $data){
    $connection->lastMessageTime = time();

    $res = HandleMessage::getData($data);

    $connection -> send($res);
};

$wsWorker -> onClose = function($connection){
    echo '连接已断开';
};

Worker::runAll();