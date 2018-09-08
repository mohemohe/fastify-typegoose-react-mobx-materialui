#!/bin/sh
set -xe

rm -rf /server
cp -r /tmp/server /
cd /server
rm -rf src typings package.json
ln -nfs /tmp/server/src ./
ln -nfs /tmp/server/typings ./
ln -nfs /tmp/server/package.json ./
ln -nfs /tmp/server/webpack.config.js ./
yarn
npm rebuild --build-from-source
yarn watch &
yarn develop
