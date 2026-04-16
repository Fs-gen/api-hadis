import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name'); // Optional query to filter by topic name
    
    const filePath = path.join(process.cwd(), 'books', 'topik.json');
    
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ code: 404, message: "Topics data not found" }, { status: 404 });
    }

    const content = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(content);
    const topics = data.topik;

    if (name) {
      if (!topics[name]) {
        return NextResponse.json({ code: 404, message: "Topic not found" }, { status: 404 });
      }
      return NextResponse.json({
        code: 200,
        message: "Success",
        data: {
          name: name,
          hadiths: topics[name]
        }
      });
    }

    // If no specific topic requested, return all topics (or just the list of topic names)
    // Considering the JSON might be large, maybe returning the whole object is fine.
    return NextResponse.json({
      code: 200,
      message: "Success",
      data: topics
    });
  } catch (error) {
    return NextResponse.json({ code: 500, message: "Internal Server Error", error: String(error) }, { status: 500 });
  }
}
