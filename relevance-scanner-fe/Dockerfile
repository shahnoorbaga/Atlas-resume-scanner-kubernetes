# Build the application
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install @rollup/plugin-dynamic-import-vars --save-dev

COPY . .

# Copy application files
COPY public /app/public
COPY src /app/src

CMD ["npm", "run", "serve:ssr:relevance-scanner-fe"]
