# docker build -t <image>:<tag> .

# -----> docker build -t devorozcoh/dev-front:0.0.1 .

# BUILD FOR X_86

# -----> docker buildx build --platform linux/amd64 -t <image>:<tag> .

# -----> docker buildx build --platform linux/amd64 -t devorozcoh/dev-front:0.0.1 .

# docker push devorozcoh/dev-front:0.0.1

# docker run -d -p 80:80 --env-file .env <image>:<tag> -e "console.log(process.env)"
