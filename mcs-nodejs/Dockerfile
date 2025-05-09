# Use an official Node.js runtime as a parent image
FROM node:18-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy all files from the current directory to the working directory
COPY mcs-nodejs/ ./
# Copy package.json and package-lock.json to the working directory
#COPY mcs-nodejs/package*.json ./
# Copy all files from the current directory to the working directory
#COPY . .

# Install app dependencies mode quick
RUN npm ci

# Este script debe generar la carpeta dist/
RUN npm run build

# Development stage
FROM builder as development
# Set NODE_ENV to development
ENV NODE_ENV=development

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application(in development)
CMD ["npm", "run", "dev"]

# Production stage
FROM builder as production

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copiamos la carpeta dist/ compilada desde la etapa 'builder'
COPY --from=builder /app/dist ./dist

# Run the production command
CMD ["npm", "start"]