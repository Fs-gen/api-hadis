import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const booksDir = path.join(process.cwd(), 'books');
    const files = await fs.readdir(booksDir);
    const bookFiles = files.filter(f => f.endsWith('.json') && f !== 'topik.json');
    
    const books = await Promise.all(
      bookFiles.map(async (file) => {
        const id = file.replace('.json', '');
        const name = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        // Read file to get available count
        const content = await fs.readFile(path.join(booksDir, file), 'utf-8');
        const data = JSON.parse(content);
        
        return {
          id,
          name,
          available: data.length
        };
      })
    );

    return NextResponse.json({
      code: 200,
      message: "Success",
      data: books
    });
  } catch (error) {
    return NextResponse.json({ code: 500, message: "Internal Server Error", error: String(error) }, { status: 500 });
  }
}
