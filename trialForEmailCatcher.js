var http = require('http');
var options = {
    host: 'localhost',
    port: 8888,
    path: '/vendor/trial.php?David=herrera&min=1'
  }
    var x = http.request(options,function(res){
        res.on('data',function(data){
            console.log(data.toString());
        });
    }).end();
