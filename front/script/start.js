require.config({
    shim:{
        "layui":{
            exports:'layui'
        },
        "md5":{
            exports:'md5'
        }
    },
    paths:{
        "layui":"../lib/layui/layui",
        "im":"./im",
        "md5":"../lib/md5",
        "common":"./base"
    }
});

require(['base','layui', 'md5', 'im' ], function(base, layui,  md5, im){
    im.imInit();
});