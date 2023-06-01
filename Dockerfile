FROM node:latest
ADD . /app
WORKDIR /app
COPY package.json .
RUN npm i
EXPOSE 5000
CMD ["npm", "start"]