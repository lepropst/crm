FROM node:16-alpine 
WORKDIR /usr/src

ENV NODE_ENV development

COPY  ./package*.json ./
RUN npm install

EXPOSE 3000

ENV PORT 3000

CMD ["npm" ,"run", "dev"]
