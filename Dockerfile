FROM node:12

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH


COPY package*.json ./

RUN npm install

COPY . .

ENV BASE_PATH=/xdd-linking

RUN npm run build
WORKDIR /app/


ENTRYPOINT ["npm", "start"]