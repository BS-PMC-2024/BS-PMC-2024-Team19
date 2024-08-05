# Use an official Node.js runtime as the base image
FROM node:16.20.2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY backend/ .

# Expose the port your app runs on
EXPOSE 6500

# Command to run your application
CMD ["node", "index.js"]
