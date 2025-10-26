/* data.js - data dummy untuk tugas
   - dataBahanAjar : array bahan ajar
   - users : akun dummy
   - deliveries : data tracking berdasarkan nomor DO
*/

const dataBahanAjar = [
  { kode: "BA001", judul: "Pemrograman Dasar", jenis: "Buku", stok: 120 },
  { kode: "BA002", judul: "Basis Data", jenis: "Buku", stok: 80 },
  { kode: "BA003", judul: "Algoritma & Struktur Data", jenis: "Buku", stok: 60 },
  { kode: "BA004", judul: "Desain Web", jenis: "Modul", stok: 200 }
];

// user dummy untuk validasi login (frontend-only)
const users = [
  { email: "jaka@ut.ac.id", password: "pw123", nama: "Operator UT" },
  { email: "admin@ut.ac.id", password: "admin123", nama: "Admin UT" }
];

// data pengiriman / tracking
const deliveries = [
  {
    no: "DO20251001",
    nama: "Cristiano Ronaldo Dos Santos Aveiro",
    status: "Dalam Pengiriman", // stages: Diproses, Dikirim, Dalam Pengiriman, Tiba
    statusStage: 60, // 0-100 untuk progress bar
    ekspedisi: "JNE",
    tanggal: "2025-10-01",
    jenisPaket: "Kargo",
    total: "Rp 45.000"
  },
  {
    no: "DO20251002",
    nama: "Mesut Ozil",
    status: "Tiba",
    statusStage: 100,
    ekspedisi: "TIKI",
    tanggal: "2025-10-03",
    jenisPaket: "Reguler",
    total: "Rp 25.000"
  }
];