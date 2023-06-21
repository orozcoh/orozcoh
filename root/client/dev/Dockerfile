# Use an official Nginx base image
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the built files from the "dist" directory to the container
COPY dist/ .

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]