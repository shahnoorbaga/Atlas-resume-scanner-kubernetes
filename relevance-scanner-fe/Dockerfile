# Use the official Node.js image as the base image
FROM node:alpine

# Set the working directory
WORKDIR /src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Expose the port the app runs on
EXPOSE 4200

# Start the Angular application
CMD ["ng", "serve", "--host", "0.0.0.0"]
