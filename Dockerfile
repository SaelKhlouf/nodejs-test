FROM node

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=pass

WORKDIR /home/app

RUN mkdir -p ./

COPY . ./

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install

CMD ["npm", "run", "startNoWatch"]