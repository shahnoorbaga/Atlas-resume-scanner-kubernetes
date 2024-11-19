# Build the application
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Run the application
FROM node:18
WORKDIR /app
# Copy application files
COPY public /app/public
COPY src /app/src

COPY --from=build /app/dist ./dist
#CMD ["node", "dist/relevance-scanner-fe/server/server.mjs"]
CMD ["npm", "start"]