<?php
use Workerman\Worker;
require_once __DIR__ . '/../Autoloader.php';


$wsWorker = new Worker('websocket://0.0.0.0:2000');

$wsWorker -> count = 4;

$wsWorker -> onMessage = function($connection, $data){
    var_dump($connection);
    var_dump($data);
    $connection -> send('hello'.$data);
};

Worker::runAll();