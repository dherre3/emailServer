"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Firebase = require('Firebase'), querystring = require('querystring'), fs = require('fs'), http = require('http'), colors = require('colors'), nodemailer = require('nodemailer');
var Credentials_1 = require("./Credentials");
var EmailManager = (function () {
    function EmailManager() {
        var _this = this;
        this.ref = new Firebase('https://blazing-inferno-1723.firebaseio.com/');
        this.error_log_path = '../error-log.txt';
        this.log_path = '../log.txt';
        console.log(colors.rainbow("---------------------INITIATED LISTENER----------------------------"));
        this.authenticate().then(function () {
            _this.readEmails();
        }).catch(function (error) {
            _this.logError(error);
        });
    }
    EmailManager.prototype.authenticate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.ref = new Firebase('https://blazing-inferno-1723.firebaseio.com/');
            _this.ref.authWithCustomToken(Credentials_1.Credentials.getFirebaseCredentials(), function (success) {
                return resolve("true");
            }, function (error) {
                _this.logError(error);
                return reject("false");
            });
        });
    };
    EmailManager.prototype.readEmails = function () {
        var _this = this;
        console.log(colors.rainbow("---------------------READ EMAILS----------------------------"));
        this.ref.child('Website/Messages').on('child_added', function (snapshot) {
            var post_data = snapshot.val();
            if (post_data.message) {
                console.log(colors.magenta("----------Message Received---------"));
                console.log(colors.green(JSON.stringify(post_data)));
                //Log e-mail
                _this.logEmail(post_data);
                //Send e-mail
                _this.sendEmail(post_data);
                //Delete e-mail from Firebase
                _this.ref.child('Website/Messages').child(snapshot.key()).set(null);
            }
        }).catch(function (error) {
            _this.logError(error);
        });
    };
    EmailManager.prototype.sendEmail = function (post_data) {
        //Get Credentials
        var password = Credentials_1.Credentials.getCredentials();
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            host: 'Smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'davidfherrerarhacker@gmail.com',
                pass: password
            }
        });
        var mailOptions = {
            from: "\"DS Site\" <davidfherrerarhacker@gmail.com>",
            to: "davidfherrerar@gmail.com",
            subject: "Message From " + post_data.email + " about Data Structures Site",
            //text: 'Hello world ?', // plain text body
            html: "<strong>Name: " + post_data.name + " </strong><br><strong>E-mail:" + post_data.email + " </strong><br><strong>Date:" + new Date(post_data.date) + "</strong><br><p>Content: " + post_data.message + "</p>"
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    };
    EmailManager.prototype.logEmail = function (message) {
        var logMessage = "\n        ----------Message Received on " + new Date() + "---------\n            Message:\n\n            " + JSON.stringify(message) + "\n        ";
        fs.appendFileSync(this.log_path, logMessage);
    };
    EmailManager.prototype.logError = function (error) {
        var logMessage = "\n        ----------Error Received on " + new Date() + "---------\n            Message:\n\n            " + JSON.stringify(error) + "\n        ";
        fs.appendFileSync(this.error_log_path, logMessage);
    };
    return EmailManager;
}());
var email = new EmailManager();
