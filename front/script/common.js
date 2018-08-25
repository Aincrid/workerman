define(function(){
    var pack = function(){

    };

    var unpack = function(data){
        data = JSON.parse(data);
        console.log(data);
    };





    return {
        'pack':pack
    }
});