# Use a base image with a specific version of Python
FROM python:3.11

# Set working directory
WORKDIR /app

# Create a simple index.html file
RUN echo '<!DOCTYPE html><html><head><title>My Docker App</title></head><body><h1>Hello, World!</h1></body></html>' > index.html

# Expose port 3000
EXPOSE 3000

# Start the HTTP server
CMD ["python3", "-m", "http.server", "3000"]
