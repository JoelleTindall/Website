# Use the official node image as the base image
FROM node:18 AS build-stage


# Set the working directory
WORKDIR /JoelleSite

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of your application files
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Start the Express server
CMD ["node", "backend/server.js"]