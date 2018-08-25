require.config({
    shim:{
        "layui":{
            exports:'layui'
        }
    },
    paths:{
        "layui":"../lib/layui/layui",
        "im":"./im"
    }
});

require(['layui', 'im'], function(layui, im){
    im.imInit();
});