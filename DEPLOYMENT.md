# Panduan Deployment Website (Kehamilan Berisiko TB) ke VPS CentOS

Dokumen ini berisi panduan lengkap langkah-demi-langkah untuk melakukan deployment aplikasi **TanStack Start + Prisma SQLite** ini ke VPS CentOS / AlmaLinux / Rocky Linux.

---

## 📋 Prasyarat
- Akses SSH ke VPS CentOS (CentOS 7, CentOS Stream, AlmaLinux, atau Rocky Linux) dengan hak akses `root` atau `sudo`.
- Domain atau IP Publik VPS.

---

## 🚀 Langkah 1: Install Node.js 20 LTS & Tools Pendukung

Jalankan perintah berikut di terminal VPS:

```bash
# Update package manager & install tools dasar
sudo dnf update -y || sudo yum update -y
sudo dnf install -y git gcc-c++ make nginx || sudo yum install -y git gcc-c++ make nginx

# Install Node.js 20 LTS via NodeSource repository
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo dnf install -y nodejs || sudo yum install -y nodejs

# Verifikasi versi Node.js & npm
node -v   # Harus v20.x.x
npm -v

# Install pnpm & PM2 secara global
sudo npm install -g pnpm pm2
```

---

## 🔒 Langkah 2: Konfigurasi Firewall (Firewalld & SELinux)

```bash
# Pastikan firewalld aktif dan izinkan HTTP & HTTPS
sudo systemctl enable --now firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Jika CentOS menggunakan SELinux (Default), izinkan Nginx mengakses network proxy:
sudo setsebool -P httpd_can_network_connect 1
```

---

## 📁 Langkah 3: Clone Repositori & Persiapan Environment

```bash
# Buat direktori web & masuk ke dalamnya
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www

# Clone repositori proyek Anda
git clone <URL_REPOSITORI_GIT_ANDA> mother
cd mother

# Buat file .env dari template/contoh
cat << 'EOF' > .env
DATABASE_URL="file:./dev.db"
EOF
```

---

## 📦 Langkah 4: Install Dependencies & Build Application

```bash
# Install seluruh package
pnpm install

# Generate Prisma Client (SQLite)
pnpm run prisma-generate

# Push skema database jika belum ada tabel di dev.db (Opsional)
npx prisma db push

# Build aplikasi untuk produksi
pnpm run build
```

---

## 🔄 Langkah 5: Jalankan Aplikasi dengan PM2

Aplikasi akan di-manage oleh **PM2** agar tetap berjalan 24/7 dan otomatis restart jika VPS di-reboot.

```bash
# Hapus proses lama jika ada yang mengalami crash loop
pm2 delete mother-app

# Jalankan PM2 menggunakan ecosystem.config.cjs
pm2 start ecosystem.config.cjs

# Simpan state PM2 agar auto-start saat VPS di-reboot
pm2 save

# Generate script startup PM2 untuk systemd
pm2 startup
```

---

## 🌐 Langkah 6: Konfigurasi Nginx Reverse Proxy

```bash
# Salin konfigurasi contoh Nginx ke direktori conf.d CentOS
sudo cp nginx.conf.example /etc/nginx/conf.d/mother.conf

# Edit file tersebut dan sesuaikan server_name dengan domain/IP Anda
sudo nano /etc/nginx/conf.d/mother.conf
```

```bash
# Uji konfigurasi Nginx
sudo nginx -t

# Jika 'successful', jalankan & aktifkan Nginx
sudo systemctl enable --now nginx
```

---

## 🛠 PENGUJIAN & DIAGNOSIS ERROR PM2

Jika `pm2 status` menunjukkan jumlah restart (kolom `↺`) bertambah terus (crash loop):

1. **Cek Log Error Aplikasi:**
   ```bash
   pm2 logs mother-app --lines 50
   ```
2. **Cek ketersediaan port 3000:**
   ```bash
   netstat -tlpn | grep 3000  # atau lsof -i :3000
   ```
3. **Cek tes manual jalan tanpa PM2:**
   ```bash
   npm run start
   ```
