import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params;
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range');
    
    const filePath = path.join(process.cwd(), 'books', `${name}.json`);
    
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ code: 404, message: "Book not found" }, { status: 404 });
    }

    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);

    // If no range provided, maybe return all or return error?
    // Let's return error or limit to 300 since user specified max 300
    if (!range) {
      return NextResponse.json({
        code: 200,
        message: "Success",
        data: data.slice(0, 50) // default 50 items
      });
    }

    const [startStr, endStr] = range.split('-');
    const start = parseInt(startStr, 10);
    const end = parseInt(endStr, 10);

    if (isNaN(start) || isNaN(end) || start > end) {
      return NextResponse.json({ code: 400, message: "Invalid range parameter. Use format ?range=start-end" }, { status: 400 });
    }

    if (end - start + 1 > 300) {
      return NextResponse.json({ code: 400, message: "Max range is 300" }, { status: 400 });
    }

    // the JSON usually has index 0 as number 1
    // Filter by number field instead of index to be safe if start is a hadith number
    // "number" field is available in each hadith object
    const hadiths = data.filter((h: any) => h.number >= start && h.number <= end);

    const prettyName = name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    return NextResponse.json({
      code: 200,
      message: "Success",
      data: {
        name: prettyName,
        id: name,
        available: data.length,
        requested: hadiths.length,
        hadiths: hadiths
      }
    });
  } catch (error) {
    return NextResponse.json({ code: 500, message: "Internal Server Error", error: String(error) }, { status: 500 });
  }
}
