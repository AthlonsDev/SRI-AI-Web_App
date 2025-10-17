# Use an official Node image
FROM node:20

# Set working directory
WORKDIR /app

# Copy dependency files first (for caching)
COPY package*.json ./

# Clean install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Expose the default port
EXPOSE 3000

# Run the development server
CMD ["npm", "start"]
