# based image yang akan digunakan
FROM node:18.14

ENV DATABASE_URL=postgresql://postgres:6omAi7wV6Y94@db.jvyasvkxzxszepzijxuo.supabase.co:5432/postgres
ENV NODE_ENV=production
ENV PORT=4002

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /apps

# copy deps yang ada di apps ke WORKDIR
COPY ["package.json", "package-lock.json", "./"]

# Install npm & Mengapus cache
RUN npm install

# copy semua file & folder ke WORKDIR
COPY . .

# execute apps: production
CMD ["npm", "run", "start"]