#!/bin/bash

echo "Updating repository"
git pull https://github.com/felixortega283/general-purpose-bot.git

if [ ! -f ".env" ]; then
    cp ./templates/template.env .
    mv template.env .env
    echo "Error: .env file not filled out."
    exit 0
fi

npm install
tsc
node ./dist/deploy_commands.js
node ./dist/index.js