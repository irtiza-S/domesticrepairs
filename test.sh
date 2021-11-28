#!/bin/bash

type=${CODIO_TYPE:-assignment}
echo type

if [ $type = "lab" ];
then
	echo "YOU ARE TRYING TO RUN THIS IN A CODIO LAB"
	echo "script should only be run in your assignment box"
	exit 1
fi

# CURRENT_BRANCH=`git rev-parse --abbrev-ref HEAD`
# echo "current branch: ${CURRENT_BRANCH}"

# clear  #1. clear the terminal

# deno run --allow-all --unstable index.js #run the web server and launch the website


# Get the commit message from file, which just contains the message
read -p 'enter your commit: ' commitMessage


#check the length of the message - if it's less than 10, send a warning to rewrite the commit msg since it's not detailed enough




# echo "script running"
