# Rencana Integrasi Strapi CMS dengan Supabase

Dokumen ini merangkum hasil riset dan menetapkan rencana kerja untuk mengintegrasikan Strapi sebagai Headless CMS dengan Supabase sebagai backend database dan penyedia penyimpanan file.

## Hasil Riset Utama

1.  **Kelayakan**: Integrasi Strapi dan Supabase telah terbukti berhasil oleh komunitas dan didukung oleh dokumentasi yang ada. Ini adalah jalur yang valid dan kuat.

2.  **Koneksi Database**: Koneksi ke database Supabase (PostgreSQL) bersifat langsung (straightforward) menggunakan kredensial standar yang telah kita miliki. Strapi akan mengelola skema databasenya sendiri, yang berarti ia harus dihubungkan ke database yang bersih untuk inisialisasi.

3.  **Penyimpanan File (Media Library)**: Ini adalah komponen kunci. Secara default, Strapi menyimpan file di server lokal. Untuk memanfaatkan Supabase Storage, instalasi dan konfigurasi plugin eksternal `strapi-provider-upload-supabase` adalah **wajib**.

4.  **Konfigurasi Tambahan**: Diperlukan dua modifikasi pada file konfigurasi Strapi:
    -   `config/plugins.js`: Untuk mendaftarkan dan mengkonfigurasi plugin upload Supabase.
    -   `config/middlewares.js`: Untuk menyesuaikan *Content Security Policy* (CSP) agar media yang dihosting di Supabase dapat dimuat dengan aman di dalam admin panel Strapi.

5.  **Manajemen User**: Strapi akan memiliki tabel `users` sendiri untuk keperluan admin/editor CMS. Ini terpisah dari sistem otentikasi Supabase yang nantinya akan digunakan untuk pengguna akhir website. Ini adalah pemisahan peran yang baik.

6.  **Solusi Masalah Koneksi**: Jika masalah konektivitas (terkait IPv6) muncul kembali, Supabase menyediakan *connection string* alternatif melalui "pooler" yang dapat kita gunakan sebagai solusi cadangan.

## Rencana Implementasi

Berikut adalah langkah-langkah yang akan kita ambil:

1.  **Inisialisasi Proyek Strapi**:
    -   Gunakan perintah `npx create-strapi-app@latest himafortic-cms --quickstart` untuk membuat proyek Strapi baru.
    -   Saat instalasi, Strapi akan menggunakan database SQLite lokal secara default. Ini normal dan kita akan mengubahnya nanti.

2.  **Instalasi Dependensi Tambahan**:
    -   Instal `pg` sebagai driver database PostgreSQL.
    -   Instal `strapi-provider-upload-supabase` sebagai provider untuk upload file.

3.  **Konfigurasi Koneksi Database**:
    -   Buat atau modifikasi file `config/database.js`.
    -   Isi dengan kredensial database Supabase kita, menggunakan variabel lingkungan (`.env`) untuk keamanan.

4.  **Konfigurasi Penyimpanan File**:
    -   Buat file `config/plugins.js`.
    -   Konfigurasikan `strapi-provider-upload-supabase` dengan kredensial Supabase Storage (URL, API Key, Bucket Name).

5.  **Konfigurasi Keamanan (CSP)**:
    -   Modifikasi file `config/middlewares.js` untuk menambahkan domain Supabase ke dalam `img-src` di Content Security Policy.

6.  **Pengujian dan Verifikasi**:
    -   Jalankan server Strapi.
    -   Buat *Content-Type* pertama (misalnya, "Artikel").
    -   Buat entri baru dan coba upload gambar.
    -   Verifikasi bahwa data teks tersimpan di tabel Supabase dan file gambar muncul di Supabase Storage Bucket.
