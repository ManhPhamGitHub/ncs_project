# Build Stage
FROM node:18 as builder

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM nginx:stable-alpine

# Copy built files to nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the application port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
