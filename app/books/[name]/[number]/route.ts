import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string, number: string }> }
) {
  try {
    const { name, number } = await params;
    const filePath = path.join(process.cwd(), 'books', `${name}.json`);
    
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ code: 404, message: "Book not found" }, { status: 404 });
    }

    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    
    const hadithNumber = parseInt(number, 10);
    if (isNaN(hadithNumber)) {
      return NextResponse.json({ code: 400, message: "Invalid hadith number" }, { status: 400 });
    }

    const hadith = data.find((h: any) => h.number === hadithNumber);

    if (!hadith) {
      return NextResponse.json({ code: 404, message: "Hadith not found" }, { status: 404 });
    }

    const prettyName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return NextResponse.json({
      code: 200,
      message: "Success",
      data: {
        name: prettyName,
        id: name,
        available: data.length,
        contents: hadith
      }
    });
  } catch (error) {
    return NextResponse.json({ code: 500, message: "Internal Server Error", error: String(error) }, { status: 500 });
  }
}
