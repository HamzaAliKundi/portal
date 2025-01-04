# Use a base Node.js image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and yarn.lock for efficient caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the Vite development port
EXPOSE 5173

# Command to start the development server
CMD ["yarn", "dev", "--host"]
