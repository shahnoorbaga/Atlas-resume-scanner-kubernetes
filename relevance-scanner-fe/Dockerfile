# Build the application
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm cache clean --force
RUN npm install --no-cache
COPY . .
RUN npm run build --no-cache

# Run the application
FROM node:18
WORKDIR /app
# Copy application files
COPY public /app/public
COPY src /app/src

COPY --from=build /app/dist ./dist
CMD ["node", "dist/relevance-scanner-fe/server/server.mjs"]
