# Hadithly API 📖

Hadithly API adalah sebuah RESTful API yang dibuat menggunakan **Next.js 16 (App Router)** untuk menyediakan akses ke berbagai kumpulan hadis dari kitab-kitab ternama beserta sistem klasifikasi topiknya. API ini mengambil data secara statis melalui file JSON lokal yang diproses dengan performa tinggi.

## 🚀 Instalasi & Menjalankan Projek

Pastikan Anda telah menginstal **Node.js** dan package manager (npm, yarn, atau pnpm).

1. Buka terminal di direktori proyek (`api-hadis`).
2. Instal semua *dependencies*:
   ```bash
   npm install
   # atau
   yarn install
   ```
3. Jalankan server pada mode *development*:
   ```bash
   npm run dev
   # atau
   yarn dev
   ```
4. API akan berjalan secara lokal di `http://localhost:3000`.

---

## 📚 Endpoint API

Base URL untuk penggunaan lokal: `http://localhost:3000`

### 1. Daftar Kitab Hadis
Mengembalikan daftar seluruh kitab hadis yang tersedia beserta informasi total hadis di dalamnya.

- **URL:** `/books`
- **Metode:** `GET`
- **Contoh Respons:**
  ```json
  {
    "code": 200,
    "message": "Success",
    "data": [
      {
        "id": "bukhari",
        "name": "Bukhari",
        "available": 7008
      },
      {
        "id": "muslim",
        "name": "Muslim",
        "available": 5362
      }
    ]
  }
  ```

### 2. Hadis Berdasarkan Rentang (Range)
Mengembalikan banyak hadis secara sekaligus berdasarkan rentang nomor hadis dari dalam satu kitab yang spesifik. Demi alasan performa, batas maksimal pengambilan hadis dalam sekali muat adalah **300**.

- **URL:** `/books/{nama-kitab}?range={start}-{end}`
- **Metode:** `GET`
- **Contoh Request:** `/books/bukhari?range=1-50`
- **Contoh Respons:**
  ```json
  {
    "code": 200,
    "message": "Success",
    "data": {
      "name": "Bukhari",
      "id": "bukhari",
      "available": 7008,
      "requested": 50,
      "hadiths": [
        {
          "number": 1,
          "arab": "...",
          "id": "..."
        }
      ]
    }
  }
  ```
> **Catatan:** Jika parameter `range` tidak diikutsertakan, sistem akan mengembalikan 50 hadis pertama (default).

### 3. Spesifik Hadis
Mengembalikan satu hadis spesifik berdasarkan nama kitab beserta urutan nomor hadisnya secara presisi.

- **URL:** `/books/{nama-kitab}/{nomor-hadis}`
- **Metode:** `GET`
- **Contoh Request:** `/books/muslim/15`
- **Contoh Respons:**
  ```json
  {
    "code": 200,
    "message": "Success",
    "data": {
      "name": "Muslim",
      "id": "muslim",
      "available": 5362,
      "contents": {
        "number": 15,
        "arab": "...",
        "id": "..."
      }
    }
  }
  ```

### 4. Data Topik Hadis
Mengembalikan seluruh data topik atau mencari topik spesifik berdasarkan query. Data ini diambil langsung dari `topik.json`. 

- **URL:** `/topik` atau `/topik?name={nama-topik}`
- **Metode:** `GET`
- **Contoh Request:** `/topik?name=Akhlak`
- **Contoh Respons:**
  ```json
  {
    "code": 200,
    "message": "Success",
    "data": {
      "name": "Akhlak",
      "hadiths": [
        {
          "kitab": "abu-daud",
          "nomor": 935
        },
        {
          "kitab": "ahmad",
          "nomor": 10
        }
      ]
    }
  }
  ```

---

## 🛠 Teknologi yang Digunakan
- **Next.js (App Router)** - Framework inti
- **TypeScript** - Untuk *type safety*
- **Node.js `fs/promises`** - Handling file statis lokal

## ⚙ Struktur Folder
```text
├── app/
│   ├── books/                  # Endpoint & logika untuk /books
│   │   ├── [name]/             # Dinamik route kitab hadis berdasarkan nama
│   │   │   ├── [number]/       # Dinamik route per nomor khusus hadis
│   │   │   └── route.ts
│   │   └── route.ts            
│   └── topik/                  # Endpoint untuk /topik
├── books/                      # Tempat penyimpanan file JSON (abu-daud.json, dll)
├── package.json
└── tsconfig.json
```
