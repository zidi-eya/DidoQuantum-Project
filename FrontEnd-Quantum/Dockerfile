# Use Node.js 18 Alpine as the base image
FROM node:18-alpine AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first
COPY package*.json ./

RUN npm install


# Install global dependencies
RUN npm install -g @quasar/cli

# Install project dependencies
RUN npm install

# Copy the rest of the app files
COPY . .
RUN ls node_modules/@quasar/app-vite
# Run the build command
RUN npm run build

# Use nginx for the final production image
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]