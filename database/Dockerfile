FROM mysql:8.0

# Initialization scripts copied into the image so the database schema
# and seed data are created automatically on first startup.
COPY init.sql /docker-entrypoint-initdb.d/init.sql

