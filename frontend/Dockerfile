# Use Node image to build the React app
FROM node:20 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Nginx to serve the static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80