# Dockerfile
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /usr/src/app/vuejs

# Sao chép file package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install
RUN npm install vite --save-dev

# Cấp quyền thực thi cho Vite
RUN chmod +x node_modules/.bin/vite

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose cổng ứng dụng Vue.js
EXPOSE 5169

# Lệnh chạy ứng dụng
CMD ["npm", "run", "dev"]
