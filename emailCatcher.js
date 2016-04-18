var Firebase = require('Firebase');
var querystring = require('querystring');
var http = require('http');


var ref = new Firebase('https://blazing-inferno-1723.firebaseio.com/');
ref.authWithCustomToken('os7EDde2KIs8ymV1gjodaQPzaPG0UmEziqlMCOmN',function(success){
  console.log(success);
  readEmails();
},function(error){
  console.log(error);
});

function readEmails()
{
  ref.child('Website/Messages').on('child_added',function(snapshot)
  {
    console.log(snapshot.val());
    var post_data = querystring.stringify(snapshot.val());
    var options = {
        host: 'localhost',
        port: 8888,
        path: '/vendor/emailSender.php',
        method: 'POST',
        headers: {
             'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };

    console.log("Start");
    var x = http.request(options,function(res){
        console.log("Connected");
        res.on('data',function(data){
            console.log(data.toString());
        });
    });
    x.write(post_data);
    x.end();
    ref.child('Website/Messages').child(snapshot.key()).set(null);
  });

}
