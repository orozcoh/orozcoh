### **_1- Build react project with vite_**

- npm run build

### **_2- Build Docker image_**

- docker build -t devorozcoh/dev-front:0.0.1 . <!-- <image>:<tag> -->

### **_2.1- BUILD FOR X_86_**

- docker buildx build --platform linux/amd64 -t devorozcoh/dev-front:0.0.1 .

### **_3- Run Docker image as container_**

- docker run -d -p 80:80 devorozcoh/dev-front:0.0.7

### **_4- Push docker image to dockerHub_**

- docker push devorozcoh/dev-front:0.0.1
