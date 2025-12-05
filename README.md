# Techyst 

**Asisten Digital Pintar untuk Teknisi Handphone Indonesia**

[![Tech Stack](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)](https://nextjs.org/)
[![UI Framework](https://img.shields.io/badge/Shadcn-UI-000000?style=flat&logo=shadcnui)](https://ui.shadcn.com/)
[![AI Power](https://img.shields.io/badge/Powered_by-Kolosal_AI-blue?style=flat)](https://kolosal.ai/)

>  **Inovasi AI: Mendorong Usaha Lokal dengan AI Inklusif**

![Dashboard Preview](/demo/dashboard.png)

##  Latar Belakang Masalah
Di Indonesia, ribuan teknisi HP (UMKM) bekerja secara otodidak. Tantangan terbesar mereka adalah:
1.  **Motherboard Baru:** Sulit mengenali letak komponen pada HP model terbaru.
2.  **Diagnosa Visual:** Kesulitan membedakan antara korosi ringan atau jalur putus.
3.  **Keterbatasan Mentor:** Tidak punya tempat bertanya saat mentok (stuck).

**Techyst hadir sebagai solusi.** Aplikasi ini menggunakan **AI Vision (Llama 4)** untuk "melihat" kerusakan pada PCB dan **Chatbot Teknisi (GLM 4.6)** yang dilatih dengan "Bahasa Bengkel" untuk memandu perbaikan langkah demi langkah.

---

##  Fitur Unggulan

### 1. AI Visual Diagnosis 📷
Upload foto mesin HP, dan AI akan secara otomatis:
* Mendeteksi komponen vital (CPU, EMMC, Power IC).
* Menganalisa kondisi fisik (Korosi, Gosong, Jalur Putus).
* Memberikan rekomendasi tindakan awal (Reball, Ganti IC, Jumper).

### 2. Konsultasi "Suhu" AI 💬
Chatbot yang bertindak sebagai Teknisi Senior.
* **Context Aware:** Mengerti konteks dari gambar yang sedang dibahas.
* **Local Lingo:** Menggunakan istilah teknis lapangan (Amper gantung, Short halus, Congkel).
* **Fast Response:** Menjawab pertanyaan troubleshooting dalam hitungan detik.

### 3. Riwayat Servis Lokal 📂
Semua data diagnosa tersimpan aman di browser (LocalStorage).
* Tidak perlu login/database berat.
* Privasi terjaga.
* Akses kembali hasil scan lama kapan saja.

---

##  Arsitektur & Teknologi

Aplikasi ini dibangun dengan prinsip **Performance First** dan **Inclusive Design**.

* **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS.
* **UI Library:** Shadcn UI + Framer Motion (Animasi halus).
* **AI Backend:** Kolosal AI.
* **Storage:** LocalStorage (Client-side persistence).

---

##  Cara Install & Jalankan

Ikuti langkah ini untuk menjalankan Techyst di komputer lokal Anda.

### Prasyarat
* Node.js 18+ terinstall.
* Package manager `pnpm` (disarankan), `npm`, atau `yarn`.
* API Key dari [Kolosal.ai](https://kolosal.ai).

### Langkah Instalasi

1.  **Clone Repository**
    ```bash
    git clone [https://github.com/username/techyst.git](https://github.com/username/techyst.git)
    cd techyst
    ```

2.  **Install Dependencies**
    ```bash
    pnpm install
    ```

3.  **Setup Environment Variables**
    Buat file `.env` di root folder, lalu isi dengan API Key Anda:
    ```env
    KOLOSAL_API_KEY=masukkan_api_key_kolosal_disini
    KOLOSAL_BASE_URL=https://api.kolosal.ai/v1
    ```

4.  **Jalankan Server Development**
    ```bash
    pnpm dev
    ```

5.  **Buka Aplikasi**
    Akses [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 📸 Galeri Screenshot

| Halaman Scan AI | Hasil Diagnosa |
| :---: | :---: |
| ![Scan](/demo/scan-preview.png) | ![Result](/demo/scan-result.png) |

---
