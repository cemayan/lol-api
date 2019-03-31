FROM node:10-alpine

WORKDIR /

COPY package.json ./

RUN npm install

COPY . ./

RUN npm test

EXPOSE 3000

CMD [ "npm", "start" ]