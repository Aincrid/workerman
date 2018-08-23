<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit479474abb6d8f69500076d9382e7d41e
{
    public static $prefixLengthsPsr4 = array (
        'W' => 
        array (
            'Workerman\\MySQL\\' => 16,
            'Workerman\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Workerman\\MySQL\\' => 
        array (
            0 => __DIR__ . '/..' . '/workerman/mysql/src',
        ),
        'Workerman\\' => 
        array (
            0 => __DIR__ . '/../..' . '/',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit479474abb6d8f69500076d9382e7d41e::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit479474abb6d8f69500076d9382e7d41e::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
