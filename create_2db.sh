#!/bin/bash
set -e

POSTGRES="psql --username ${POSTGRES_USER}"

echo "Creating database: ${DB_NAME}"

$POSTGRES <<EOSQL
CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};
CREATE DATABASE ${DB_NAME2} OWNER ${DB_USER};
EOSQL