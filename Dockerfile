FROM node:12

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH


COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
WORKDIR /app/

ENV BASE_PATH="/xdd-linking"

ENTRYPOINT ["npm", "start"]