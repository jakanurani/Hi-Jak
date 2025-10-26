
/* script.js - menangani interaksi pada semua halaman.
   Inisialisasi dilakukan berdasarkan class body (page-login, page-dashboard, page-tracking, page-stok)
*/

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  // fungsi util
  const showModal = (id) => {
    const m = document.getElementById(id);
    if (m) m.setAttribute("aria-hidden", "false");
  };
  const hideModal = (id) => {
    const m = document.getElementById(id);
    if (m) m.setAttribute("aria-hidden", "true");
  };

  // close modal buttons
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const modal = e.target.closest(".modal");
      if (modal) modal.setAttribute("aria-hidden", "true");
    });
  });

  // ---------- LOGIN PAGE ----------
  if (body.classList.contains("page-login")) {
    const loginForm = document.getElementById("loginForm");
    const forgotBtn = document.getElementById("forgotBtn");
    const registerBtn = document.getElementById("registerBtn");
    const modalForgot = document.getElementById("modalForgot");
    const modalRegister = document.getElementById("modalRegister");
    const sendForgot = document.getElementById("sendForgot");
    const doRegister = document.getElementById("doRegister");

    // show modal
    forgotBtn.addEventListener("click", () => showModal("modalForgot"));
    registerBtn.addEventListener("click", () => showModal("modalRegister"));

    // forgot send simulation
    sendForgot.addEventListener("click", () => {
      const email = document.getElementById("forgotEmail").value.trim();
      if (!email) {
        alert("Masukkan email terlebih dahulu.");
        return;
      }
      alert("Instruksi reset password telah dikirim (simulasi) ke " + email);
      hideModal("modalForgot");
    });

    // register simulation: menambah ke localStorage users (tidak permanen)
    doRegister.addEventListener("click", () => {
      const email = document.getElementById("registerEmail").value.trim();
      const pass = document.getElementById("registerPassword").value.trim();
      if (!email || !pass) {
        alert("Email dan password wajib diisi.");
        return;
      }
      // hanya simulasi
      alert("Pendaftaran berhasil (simulasi). Silakan login.");
      hideModal("modalRegister");
    });

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const pass = document.getElementById("password").value.trim();

      // validasi sederhana terhadap users dari data.js
      const found = users.find(u => u.email === email && u.password === pass);
      if (!found) {
        alert("email/password yang anda masukkan salah");
        return;
      }
      // set session simulated dan redirect ke dashboard
      localStorage.setItem("sitta_user", JSON.stringify({ email: found.email, nama: found.nama }));
      window.location.href = "dashboard.html";
    });
  }

  // ---------- DASHBOARD PAGE ----------
  if (body.classList.contains("page-dashboard")) {
    // cek session, jika tidak ada redirect ke login
    const session = localStorage.getItem("sitta_user");
    if (!session) {
      alert("Silakan login terlebih dahulu.");
      window.location.href = "index.html";
      return;
    }

    // greeting berdasarkan waktu lokal
    const greetEl = document.getElementById("greeting");
    const now = new Date();
    const h = now.getHours();
    let text = "Halo";
    if (h >= 4 && h < 11) text = "Selamat Pagi";
    else if (h >= 11 && h < 15) text = "Selamat Siang";
    else if (h >= 15 && h < 18) text = "Selamat Sore";
    else text = "Selamat Malam";
    greetEl.textContent = text;

    // tombol logout
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("sitta_user");
      window.location.href = "index.html";
    });

    // tombol-tombol Laporan (simulasi)
    document.getElementById("btnProgress").addEventListener("click", () => {
      alert("Fungsi Monitoring Progress DO (simulasi).");
    });
    document.getElementById("btnRekap").addEventListener("click", () => {
      alert("Fungsi Rekap Bahan Ajar (simulasi).");
    });
    document.getElementById("btnHistori").addEventListener("click", () => {
      alert("Fungsi Histori Transaksi (simulasi).");
    });
  }

  // ---------- TRACKING PAGE ----------
  if (body.classList.contains("page-tracking")) {
    const searchBtn = document.getElementById("searchDo");
    const doInput = document.getElementById("doInput");
    const resultArea = document.getElementById("resultArea");
    const notFound = document.getElementById("notFound");

    const rNama = document.getElementById("rNama");
    const rTanggal = document.getElementById("rTanggal");
    const rJenis = document.getElementById("rJenis");
    const rTotal = document.getElementById("rTotal");
    const progressBar = document.getElementById("progressBar");
    const rStatusText = document.getElementById("rStatusText");
    const detailExpedisi = document.getElementById("detailExpedisi");

    const resetView = () => {
      resultArea.classList.add("hidden");
      notFound.classList.add("hidden");
    };

    searchBtn.addEventListener("click", () => {
      resetView();
      const q = doInput.value.trim();
      if (!q) {
        alert("Masukkan nomor DO terlebih dahulu.");
        return;
      }
      const found = deliveries.find(d => d.no.toLowerCase() === q.toLowerCase());
      if (!found) {
        notFound.classList.remove("hidden");
        return;
      }
      // tampilkan data
      rNama.textContent = found.nama;
      rTanggal.textContent = found.tanggal;
      rJenis.textContent = found.jenisPaket;
      rTotal.textContent = found.total;
      progressBar.style.width = found.statusStage + "%";
      rStatusText.textContent = found.status + " (" + found.statusStage + "%)";
      detailExpedisi.innerHTML = `<p><strong>Ekspedisi:</strong> ${found.ekspedisi}</p>`;
      resultArea.classList.remove("hidden");
    });

    // juga responsif: enter pada input
    doInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") searchBtn.click();
    });
  }

  // ---------- STOK PAGE ----------
  if (body.classList.contains("page-stok")) {
    const tbody = document.querySelector("#stokTable tbody");
    const newKode = document.getElementById("newKode");
    const newJudul = document.getElementById("newJudul");
    const newJenis = document.getElementById("newJenis");
    const newStok = document.getElementById("newStok");
    const addRow = document.getElementById("addRow");

    // render table dari dataBahanAjar
    const renderTable = () => {
      tbody.innerHTML = "";
      dataBahanAjar.forEach((b, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${i + 1}</td>
          <td>${b.kode}</td>
          <td>${b.judul}</td>
          <td>${b.jenis}</td>
          <td>${b.stok}</td>
          <td><button class="btn small delete" data-index="${i}">Hapus</button></td>
        `;
        tbody.appendChild(tr);
      });

      // attach delete handlers
      tbody.querySelectorAll(".delete").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const idx = Number(e.target.dataset.index);
          if (confirm("Hapus baris ini?")) {
            dataBahanAjar.splice(idx, 1);
            renderTable();
          }
        });
      });
    };

    renderTable();

    addRow.addEventListener("click", () => {
      const kode = newKode.value.trim();
      const judul = newJudul.value.trim();
      const jenis = newJenis.value.trim();
      const stokVal = Number(newStok.value);
      if (!kode || !judul || !jenis || isNaN(stokVal)) {
        alert("Semua kolom wajib diisi dengan benar.");
        return;
      }
      dataBahanAjar.push({ kode, judul, jenis, stok: stokVal });
      newKode.value = newJudul.value = newJenis.value = newStok.value = "";
      renderTable();
    });
  }
});
