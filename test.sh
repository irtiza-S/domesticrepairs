#!/bin/bash

type=${CODIO_TYPE:-assignment}
echo type

if [ $type = "lab" ];
then
	echo "YOU ARE TRYING TO RUN THIS IN A CODIO LAB"
	echo "script should only be run in your assignment box"
	exit 1
fi

#this hook is responsible for asking the developer if they would like to push their code to github. 

set -e 
echo "POST COMMIT"

#getting user's decision on wanted to push their code
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)

read -p 'would you like to push your code? ' PUSH_DECISION
echo ${PUSH_DECISION}

if (($PUSH_DECISION=='yes'))
then
    echo $(git push -u origin "${CURRENT_BRANCH}")
    exit 0
else
    exit 1
fi




# echo "script running"
