var http = require('http'),
    url = require('url'),
    notify = require('./notification'),
    cronJob = require('./lib/cron.js').CronJob;
    port = 8888;
var cron = function(cronTime, fn) {
    var job = new cronJob({
        cronTime: cronTime,
        onTick: function() {
            fn(); 
        },
        onComplete: function () {
        },
        start: false,
        timeZone: 'Asia/Tokyo',
    });
    job.start();
};
var notification = function(options, res) {
    if (new Date(options.sendAt).getTime() < (new Date()).getTime()) {
        notify.sendNotify(options);
    } else {
        cron(options.sendAt, function() {
            notify.sendNotify(options);
        });
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('');
    res.end();
};
http.createServer (function (req, res) {
    var path = req.url.split("?")[0], options;
    if (req.method === 'POST') {
        req.on('data', function(chunk) {
            options = url.parse('/?' + chunk.toString(), true).query;
            if (path === '/notification') {
                notification(options, res);
            }
        });
    }
}).listen(port);
console.log('Server running at port:' + port);