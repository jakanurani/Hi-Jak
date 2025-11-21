import java.util.Scanner;

// Nama : Jaka Nurani
// NIM : 053138022

public class Tugas3 {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);

        // Array gaji pokok berdasarkan golongan
        int[] gajiPokok = {5000000, 6500000, 9500000};

        // Array persen lembur
        int[] persenLembur = {30, 32, 34, 36, 38};

        System.out.print("Masukkan Golongan Karyawan (A/B/C): ");
        String gol = input.next().toUpperCase();

        System.out.print("Masukkan jumlah jam lembur: ");
        int jam = input.nextInt();

        int indexGol = 0;   // menentukan index golongan
        if (gol.equals("A")) {
            indexGol = 0;
        } else if (gol.equals("B")) {
            indexGol = 1;
        } else if (gol.equals("C")) {
            indexGol = 2;
        } else {
            System.out.println("Golongan tidak valid!");
            return;
        }

        // Ambil gaji pokok dari array
        int gaji = gajiPokok[indexGol];

        // Tentukan persen lembur berdasarkan jam
        int persen = 0;
        if (jam == 1) {
            persen = persenLembur[0];
        } else if (jam == 2) {
            persen = persenLembur[1];
        } else if (jam == 3) {
            persen = persenLembur[2];
        } else if (jam == 4) {
            persen = persenLembur[3];
        } else if (jam >= 5) {
            persen = persenLembur[4];
        }

        // Hitung gaji lembur
        double gajiLembur = (gaji * persen) / 100.0;

        // Total gaji
        double totalGaji = gaji + gajiLembur;

        System.out.println("\n===== HASIL PERHITUNGAN =====");
        System.out.println("Golongan: " + gol);
        System.out.println("Gaji Pokok: Rp " + gaji);
        System.out.println("Jam Lembur: " + jam);
        System.out.println("Persentase Lembur: " + persen + "%");
        System.out.println("Gaji Lembur: Rp " + gajiLembur);
        System.out.println("Total Gaji: Rp " + totalGaji);
    }
}
