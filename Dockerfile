# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies early for cache efficiency
COPY package*.json ./
RUN npm install

# Install development tools (e.g., nodemon)
RUN npm install -g nodemon

# Copy the app source code
COPY . .

# Expose the application port
EXPOSE 8000

# Default command
CMD ["npm", "start"]
