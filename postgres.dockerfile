FROM postgres:latest
COPY ./create_1user.sh ./create_2db.sh  /docker-entrypoint-initdb.d/
#COPY ./create_db.sh     /docker-entrypoint-initdb.d/20-create_db.sh
#WORKDIR /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/create_1user.sh && chmod +x /docker-entrypoint-initdb.d/create_2db.sh
#RUN chmod +x 20-create_db.sh
