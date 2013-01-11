var apns = require('./index');

/**
 *  @param options {
                       alert: message,
                       token: deviceToken on iPhone,
                       target: dev or release,
                   }
*/
exports.sendNotify = function(options) {
    var apnsOptions = {
            keyFile: '',
            certFile: '',
            gateway: '',
            debug: true,
            errorCallback: function(errorCode, notification) {
                var message = 'none';
                switch(errorCode) {
                    case 0: message = 'noErrorsEncountered'; break;
                    case 1: message = 'processingError'; break;
                    case 2: message = 'missingDeviceToken'; break;
                    case 3: message = 'missingTopic'; break;
                    case 4: message = 'missingPayload'; break;
                    case 5: message = 'invalidTokenSize'; break;
                    case 6: message = 'invalidTopicSize'; break;
                    case 7: message = 'invalidPayloadSize'; break;
                    case 8: message = 'invalidToken'; break;
                }
                console.warn('token:'+ options.token + ' message:' + message);
            },
        },
        notification = new apns.Notification(),
        connection;
    if (options.target === 'dev') { 
        apnsOptions.keyFile = './conf/apns-dev-key-noenc.pem';
        apnsOptions.certFile = './conf/apns-dev.pem';
        apnsOptions.gateway = 'gateway.sandbox.push.apple.com';
    } else if (options.target === 'release') {
        apnsOptions.keyFile = './conf/apns-dis-key-noenc.pem';
        apnsOptions.certFile = './conf/apns-dis.pem';
        apnsOptions.gateway = 'gateway.push.apple.com';
    }
    connection = new apns.Connection(apnsOptions);
    notification.device = new apns.Device(options.token);
    notification.alert = options.alert;
    notification.sound = 'default';
    connection.sendNotification(notification);
};