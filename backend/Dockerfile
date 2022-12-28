FROM strapi/base

COPY ./app/package.json ./

RUN npm install

COPY ./app .

ENV NODE_ENV production

RUN npm run build

EXPOSE 1337

CMD ["npm", "start"]