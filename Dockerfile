FROM node:alpine3.14

WORKDIR /tetris

COPY . .

EXPOSE 3000

RUN npm install

CMD ["npm","start"]