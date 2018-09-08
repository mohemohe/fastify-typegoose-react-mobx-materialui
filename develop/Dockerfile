FROM node:10-alpine
MAINTAINER mohemohe <mohemohe@ghippos.net>

ADD start.sh /
RUN \
    set -xe; \
    apk add --no-cache tini util-linux; \
    chmod +x /start.sh

EXPOSE 3000
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["/start.sh"]
