FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

ENV PORT=3001
EXPOSE 3001
CMD ["npm", "start"]
