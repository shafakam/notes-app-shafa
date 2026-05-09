# Gunakan image node versi 18 (Sesuai materi Node.js)
FROM node:18

# Tentukan direktori kerja dalam container
WORKDIR /usr/src/app

# Copy file package.json untuk install library
COPY package*.json ./

# Jalankan install dependencies
RUN npm install

# Copy seluruh kodingan backend ke dalam container
COPY . .

# Port default yang digunakan Cloud Run melalui environment PORT
EXPOSE 8080

# Perintah untuk menjalankan aplikasi
CMD [ "node", "index.js" ]
