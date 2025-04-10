# Use the official node image as the base image
FROM node:18 AS build-stage

# Set the working directory
WORKDIR /JoelleSite

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vue.js application for production
RUN npm run build


# Expose port for site
EXPOSE 3000

EXPOSE 5432

# Install serv
RUN npm install serv

# Run build server
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]



