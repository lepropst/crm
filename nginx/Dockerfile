FROM nginx:1.21-alpine

WORKDIR /usr/share/nginx/

RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir ./html/static
COPY ./nginx.conf /etc/nginx/conf.d
COPY ./frontend/frontend/* ./html
COPY ./frontend/static ./html

