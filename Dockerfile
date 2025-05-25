FROM node:lts

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN mv .envs/.local_to_cloud.env .env


