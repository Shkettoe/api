FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
RUN npm run migration:run
CMD ["npm", "run", "start:dev"]