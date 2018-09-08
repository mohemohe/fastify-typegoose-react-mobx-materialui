FROM node:10-alpine
MAINTAINER mohemohe <mohemohe@ghippos.net>

ADD . /server
WORKDIR /server
RUN \
    set -xe; \
    apk add --no-cache tini util-linux; \
    yarn

EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["yarn", "start"]
