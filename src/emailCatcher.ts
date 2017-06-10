const Firebase = require('Firebase'),
      querystring = require('querystring'),
      fs = require('fs'),
      http = require('http'),
      colors = require('colors'),
      nodemailer = require('nodemailer');

import {Credentials} from './Credentials';

// import * as Firebase from 'Firebase';
// import * as querystring from 'querystring';
// import * as fs from 'fs';
// import * as http from 'http';


class EmailManager{
    public ref = new Firebase('https://blazing-inferno-1723.firebaseio.com/');
    private error_log_path = '../error-log.txt';
    private log_path = '../log.txt';
    constructor()
    {
        console.log(colors.rainbow("---------------------INITIATED LISTENER----------------------------"));
        this.authenticate().then(()=>
        {
            this.readEmails();
        }).catch((error)=>
        {
            this.logError(error); 
        });
    }
    
    private authenticate()
    {
        return new Promise((resolve,reject)=>{
            this.ref = new Firebase('https://blazing-inferno-1723.firebaseio.com/');
<<<<<<< HEAD
            this.ref.authWithCustomToken(Credentials.getFirebaseCredentials(),(success)=>{
=======
            this.ref.authWithCustomToken('os7EDde2KIs8ymV1gjodaQPzaPG0UmEziqlMCOmN',(success)=>{
>>>>>>> b187be6f1cfac8b1e7545a983cc1ee952570a6df
                return resolve("true");
            },(error)=>{
                this.logError(error);
                return reject("false");
            });
        });
    }
    
    public readEmails()
    {
        console.log(colors.rainbow("---------------------READ EMAILS----------------------------"));
        this.ref.child('Website/Messages').on('child_added',  (snapshot) =>{
            let post_data = snapshot.val();
            if (post_data.message) {
                console.log(colors.magenta("----------Message Received---------"));
                console.log(colors.green(JSON.stringify(post_data)));
                //Log e-mail
                this.logEmail(post_data);
                //Send e-mail
                this.sendEmail(post_data);
                //Delete e-mail from Firebase
                this.ref.child('Website/Messages').child(snapshot.key()).set(null);
            }
        }).catch( (error) =>{
            this.logError(error);
        });
    }
    private sendEmail(post_data)
    {
        //Get Credentials
        const password = Credentials.getCredentials();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'Smtp.gmail.com',
            port: 587,
            secure: false, // secure:true for port 465, secure:false for port 587
            auth: {
                user: 'davidfherrerarhacker@gmail.com',
                pass: password
            }
        });
        let mailOptions = {
            from: `"DS Site" <davidfherrerarhacker@gmail.com>`, // sender address
            to: "davidfherrerar@gmail.com", // list of receivers
            subject: `Message From ${post_data.email} about Data Structures Site`, // Subject line
            //text: 'Hello world ?', // plain text body
            html: `<strong>Name: ${post_data.name} </strong><br><strong>E-mail:${post_data.email} </strong><br><strong>Date:${new Date(post_data.date)}</strong><br><p>Content: ${post_data.message}</p>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
    private logEmail(message:Object)
    {
        const logMessage = `
        ----------Message Received on ${new Date()}---------
            Message:\n
            ${JSON.stringify(message)}
        `;
        fs.appendFileSync(this.log_path,logMessage);
    }
    private logError(error)
    {
        const logMessage = `
        ----------Error Received on ${new Date()}---------
            Message:\n
            ${JSON.stringify(error)}
        `;
        fs.appendFileSync(this.error_log_path,logMessage);
    }
}
const email = new EmailManager();

