#!/bin/bash

EB_APP="mywebapp-api"
EB_ENV="OnlineShoppingStoreApi-env"

if [[ $TRAVIS_BRANCH == deployment ]]; then
  echo "Deploying to $EB_ENV"
else
  # Don't want to deploy if it's not on master branch
  echo "Not deploying"
  exit
fi

# Install the AWS CLI so we csn deploy to our eb environment
pip install --user --upgrade awsebcli

# Deploy application to the appropriate ElasticBeanstalk env
eb deploy $EB_ENV