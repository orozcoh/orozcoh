# docker build -t <image>:<tag> .

# -----> docker build -t devorozcoh/api2:0.0.1 .

# BUILD FOR X_86

# -----> docker buildx build --platform linux/amd64 -t <image>:<tag> .

# -----> docker buildx build --platform linux/amd64 -t devorozcoh/api2:0.0.1 .

# docker push devorozcoh/api2:0.0.1

# docker run -d -p 3000:3000 --env-file .env devorozcoh/api2:0.0.1
