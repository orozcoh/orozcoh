# Specify the base image with the desired Node.js version
FROM node:alpine

# Set the working directory inside the Docker image
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the Docker image
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the entire application code to the Docker image
COPY . .

# Expose the port on which the server will listen
EXPOSE 3000

# Define the command to start the Express server
CMD ["npm", "start"]
