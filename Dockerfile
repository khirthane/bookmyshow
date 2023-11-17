FROM node:13.12.0-alpine
RUN mkdir -p /usr/src/app

WORKDIR '/usr/src/app'

ENV PATH /usr/src/app/node_modules/.bin:$PATH


COPY package.json ./
COPY package-lock.json ./

COPY . /usr/src/app

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

# install app dependencies
RUN npm install

# start app
CMD ["npm", "start"]
