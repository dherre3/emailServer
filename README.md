# EmailServer
Create you own secure e-mail server using Typescript NodeJS and Firebase. Firebase provides security in two ways, via SSL and using the Firebase rules.
# Installation
Clone the repository and use
```
$npm install
```
# Getting Started
Make sure gulp, and pm2 are installed in your system. 

## Dependencies:

1. Use an email server such as the Google account shown in the code or any other e-mail server for that matter. For configuration check [nodemailer](https://nodemailer.com/smtp/).
2. Sign up for Firebase and link it in the emailCatcher.ts authentication function. To do that, replace the credentials.url, credentials.token. They stand for the firebase url and firebase secret respectively. An example of the rules used:
```
"messages":{
        ".write":true,
        ".read":"auth!==null",
        ".validate": "newData.hasChildren(['email', 'name', 'date', 'message'])"
}
```
3. pm2 works as a global deamon for the NodeJS script, basically in provides some redundancy and makes sure your script is running on the background at all times. For more information look up: [PM2](https://github.com/Unitech/pm2).

## Running
1. To re-compile Typescript code use
    ```
    $gulp default 
    ```
2. To test use 
    ```
    $node dist/emailCatcher.js
    ````
3. For production and once your code is ready use 
    ```
    $pm2 start dist/emailCatcher.js 
    ```



