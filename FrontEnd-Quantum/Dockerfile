# ----------------------------
# BUILD STAGE
# ----------------------------
    FROM node:lts-iron

    WORKDIR /app
    
    COPY package*.json ./
    
    # Install global Quasar CLI
    RUN npm install -g @quasar/cli
    
    # Install dependencies
    RUN npm install
    
    # Copy the rest of the source code
    COPY . .
    
    # Build the app
    RUN npm run build
    
  
    
    EXPOSE 80
    
    CMD ["npm", "run", "dev"]

