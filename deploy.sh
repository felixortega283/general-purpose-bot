#!/bin/bash

IFS='/'
update_complete=false
read -ra path_array <<< "$PWD"

for item in "${path_array[@]}"; do
    if [ "$item" = "general-purpose-bot" ]; then
        echo "Updating git repository"
        git pull https://github.com/felixortega283/general-purpose-bot.git
        update_complete=true
    fi
done

if [ "$update_complete" = false ]; then
    echo "Installing Discord bot"
    git clone https://github.com/felixortega283/general-purpose-bot.git
    cd "general-purpose-bot"
fi


if [ ! -f ".env" ]; then
    cp ./templates/template.env .
    mv template.env .env
    echo "Error: .env file not filled out."
    echo "Fill out your .env file in the project directory with a prefered text editor"
    echo "EX: VS Code, vim, Notepad, Notepad++"
    echo "Once you're done, run npm run deploy"
    exit 0
fi

npm install
tsc
node ./dist/deploy_commands.js
node ./dist/index.js