import { NextResponse } from "next/server";
import { sendChatToKolosal } from "@/lib/kolosal";
import { KolosalMessage } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

    const systemPrompt = `
      Kamu adalah Teknisi HP Senior (Suhu) dengan pengalaman 20 tahun. 
      Tugasmu adalah menganalisa gambar motherboard/PCB HP yang diupload user.
      
      Berikan output JSON murni dengan struktur berikut tanpa format markdown:
      {
        "detected_components": ["daftar", "komponen", "yang", "terlihat"],
        "analysis": "Penjelasan teknis singkat tentang kondisi visual board. Sebutkan jika ada korosi, gosong, atau jalur putus.",
        "diagnosis": "Dugaan awal kerusakan berdasarkan visual.",
        "recommendation": "Langkah perbaikan teknis (Gunakan istilah bengkel: Reball, Jumper, Ganti IC, Flux)."
      }
      
      Jika gambar buram atau bukan mesin HP, berikan respon error di dalam JSON.
    `;

    const messages: KolosalMessage[] = [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analisa kerusakan pada mesin HP ini.",
          },
          {
            type: "image_url",
            image_url: {
              url: base64Image,
            },
          },
        ],
      },
    ];

    const result = await sendChatToKolosal(messages);

    const cleanResult = result
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      const parsedData = JSON.parse(cleanResult);
      return NextResponse.json(parsedData);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);

      return NextResponse.json({
        detected_components: ["Terdeteksi (Error Format)"],
        analysis: "AI berhasil melihat gambar, namun gagal menyusun laporan terstruktur.",
        diagnosis: "Terjadi kesalahan format data dari AI.",
        recommendation: "Silakan coba foto ulang dengan pencahayaan yang lebih baik atau sudut yang berbeda agar AI lebih mudah membaca.",
      });
    }
  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: "Gagal menganalisa gambar. Pastikan format benar." }, { status: 500 });
  }
}
