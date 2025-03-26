# Use the Alpine-based Node.js image
FROM node:18

# Install bash
RUN apt-get update && apt-get install -y bash

# Set the working directory inside the container
WORKDIR /app

# Copy package.json first to leverage Docker cache
COPY package*.json .

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3001 so that it can be accessed externally
EXPOSE 3001

# Define the command to run the app
CMD ["npm", "run", "start"]