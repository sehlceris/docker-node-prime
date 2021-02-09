FROM node:14-alpine

WORKDIR /app

COPY package.json ./
COPY app.js ./

EXPOSE 3000

CMD ["npm", "start"]