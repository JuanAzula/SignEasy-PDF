FROM node:22

WORKDIR /home/app

COPY . .

RUN npm i -g nodemon
# RUN npm install -g typescript

# RUN tsc

EXPOSE 3333

CMD ["nodemon", "src/index.ts"]