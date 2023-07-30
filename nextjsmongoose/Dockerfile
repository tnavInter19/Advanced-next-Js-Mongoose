# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /nextjsmongoose/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the Node.js application will listen on
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
