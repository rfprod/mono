#!/bin/bash

##
# Colors.
##
source tools/shell/colors.sh ''
##
# Project aliases.
##
source tools/shell/module-aliases.sh ''
##
# Printing utility functions.
##
source tools/shell/print-utils.sh ''

##
# Reports usage error.
##
reportUsageError() {
  printInfoTitle "<< USAGE >>"
  printWarningMessage "firebase deploy token must be provided as a first argument"
  printInfoMessage "Portfolio app"
  printUsageTip "bash tools/shell/firebase-deploy.sh FIREBASE_DEPLOY_TOKEN app:portfolio" "CI environment"
  printUsageTip "bash tools/shell/firebase-deploy.sh localhost app:portfolio" "Local environment, firebase authentication required"
  printInfoMessage "API app"
  printUsageTip "bash tools/shell/firebase-deploy.sh FIREBASE_DEPLOY_TOKEN app:api" "CI environment"
  printUsageTip "bash tools/shell/firebase-deploy.sh localhost app:api" "Local environment, firebase authentication required"
  printInfoMessage "All apps"
  printUsageTip "bash tools/shell/firebase-deploy.sh FIREBASE_DEPLOY_TOKEN" "CI environment"
  printUsageTip "bash tools/shell/firebase-deploy.sh localhost" "Local environment, firebase authentication required"
  printGap

  exit 1
}

##
# Project directories
##
declare -A PROJECT_DIRECTORIES=(
  ["api"]=./apps/api/
  ["documentation"]=./apps/documentation/
  ["portfolio"]=./apps/portfolio/
)

##
# Removes junky files from project root.
##
cleanup() {
  ##
  # Remove firebase files from project root which are copied there from project directory.
  ##
  rm -f ./.firebaserc ./firebase.json
  ##
  # Remove .firebase directory with hosting cache
  ##
  rm -rf ./.firebase/
}

##
# Copies firebase config from application root to project root for deployment.
##
config() {
  printInfoTitle "<< CONFIG >>"
  printInfoMessage "project directory" "$1"
  printGap

  ##
  # Copy firebase files to project root for deployment.
  # Later both will be removed.
  ##
  cp "$1".firebaserc ./.firebaserc
  cp "$1"firebase.json ./firebase.json
}

##
# Deploys portfolio application.
##
deployPortfolioApp() {
  config "${PROJECT_DIRECTORIES["portfolio"]}"

  if [ "$1" = "localhost" ]; then
    firebase deploy --only hosting || exit 1
  else
    firebase deploy --only hosting --token "$1" || exit 1
  fi

  cleanup
}

##
# Deploys documentation application.
##
deployDocumentationApp() {
  config "${PROJECT_DIRECTORIES["documentation"]}"

  if [ "$1" = "localhost" ]; then
    firebase deploy --only hosting || exit 1
  else
    firebase deploy --only hosting --token "$1" || exit 1
  fi

  cleanup
}

##
# Deploys api to firebase functions.
##
deployApiApp() {
  config "${PROJECT_DIRECTORIES["api"]}"

  if [ "$1" = "localhost" ]; then
    firebase deploy --only functions || exit 1
  else
    firebase deploy --only functions --token "$1" || exit 1
  fi

  cleanup
}

##
# Deploys both client app, and api.
##
deployAll() {
  deployApiApp "$1"
  deployPortfolioApp "$1"
  deployDocumentationApp "$1"
}

##
# Firebase deployment control flow.
##
if [ $# -lt 1 ]; then
  reportUsageError
elif [ $# -ge 2 ]; then
  if [ "$2" = "portfolio" ]; then
    deployPortfolioApp "$1"
  elif [ "$2" = "documentation" ]; then
    deployDocumentationApp "$1"
  elif [ "$2" = "api" ]; then
    deployApiApp "$1"
  else
    deployAll "$1"
  fi
fi
