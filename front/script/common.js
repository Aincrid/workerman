define(function(){
    var pack = function(){

    };

    var unpack = function(data){
        data = JSON.parse(data);
        console.log(data);
    };

    var key = 'ceshiworkerman';




    return {
        'pack':pack,
        'idx': key
    }
});