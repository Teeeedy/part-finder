FROM node:18

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port and start React app
EXPOSE 3000
CMD ["npm", "start"]
