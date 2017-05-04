FROM node:latest



ENV PORT=3000

RUN mkdir -p /var/www/config/

COPY ./Backend/package.json  /var/www/
#COPY ./Backend/pm2.config.json /var/www/config/

WORKDIR /var/www

RUN yarn global add pm2

RUN yarn install


EXPOSE $PORT

CMD ["pm2-dev","start","pm2.config.json"]