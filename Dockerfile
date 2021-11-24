FROM node:16.13.0

WORKDIR /opt/frontend

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]