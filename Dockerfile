FROM node:20.10-alpine3.18@sha256:d016f19a31ac259d78dc870b4c78132cf9e52e89339ff319bdd9999912818f4a

RUN apk -U upgrade

#  Set non-root built in user "node"
USER node

# ceating app directory using node user
RUN mkdir -p /home/node/app

# setting default directory
WORKDIR /home/node/app

COPY --chown=node package*.json ./

RUN npm ci --omit=dev --silent --progress=false && npm cache clean --force


COPY --chown=node . .

ENV HOST=0.0.0.0 PORT=3000

EXPOSE ${PORT}

CMD ["/home/node/app/npmbuild.sh","run"]
