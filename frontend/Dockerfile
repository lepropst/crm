FROM node:alpine

# create & set working directory

WORKDIR /usr/src

# copy source files
COPY ./unendlich /usr/src

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD exec "$@"
