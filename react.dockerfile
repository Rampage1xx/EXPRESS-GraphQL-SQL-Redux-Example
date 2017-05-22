FROM node:latest
ENV PORT=3000

CMD mkdir -p /var/www/react/

COPY ./Client/package.json  /var/www/

WORKDIR /var/www

RUN yarn install

EXPOSE $PORT
