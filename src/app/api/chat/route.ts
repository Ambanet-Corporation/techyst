import { NextResponse } from "next/server";
import { sendChatToKolosal } from "@/lib/kolosal";
import { KolosalMessage } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const systemPrompt: KolosalMessage = {
      role: "system",
      content:
        "Kamu adalah Teknisi HP Senior dengan pengalaman 20 tahun. Jawablah dengan singkat, padat, dan teknis. Gunakan istilah bengkel Indonesia sehari-hari seperti 'ganti IC', 'reball', 'jumper', 'short halus', 'arus gantung', 'congkel'. Jangan terlalu formal. Jika user bertanya tentang solusi, berikan langkah perbaikan yang konkret. Fokus pada diagnosa hardware HP. Jika user bertanya hal di luar elektronik, tolak dengan sopan ala teknisi sibuk.",
    };

    const conversation = [systemPrompt, ...messages];

    const result = await sendChatToKolosal(conversation);

    return NextResponse.json({ role: "assistant", content: result });
  } catch (error) {
    console.error("Chat Error:", error);
    return NextResponse.json(
      {
        error: "Gagal memproses chat.",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
