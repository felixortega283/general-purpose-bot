# General Purpose Discord Bot (GPDB)
GPDB is a simple general purpose Discord bot that can, show user, and server information.

## Initial setup:
To setup GPDB, you must have Node.js and npm installed here:
https://nodejs.org/en/download

### Easy Setup

curl -O https://github.com/felixortega283/general-purpose-bot.git | bash

### Advanced Setup

Clone into the repository

    git clone https://github.com/felixortega283/general-purpose-bot/tree/main/src
    
Then you have to install Typescript globally:

    npm install -g typescript
Install dependencies:

    npm install

Now you have to setup your environment variables. You can do this by copying the env template to the project directory, and editing it with your preferred text editor. 

    cp templates/template.env .
    mv template.env .env
    vim .env
Finally you can deploy the bot using this command:

    npm run deploy
Enjoy!
