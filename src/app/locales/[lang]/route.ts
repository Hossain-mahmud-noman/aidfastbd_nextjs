import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request, { params }: { params: { lang: string } }) {
  const { lang } = params;

  // Build the file path
  const filePath = path.join(process.cwd(), `src/app/i18n/${lang}.json`);
console.log(filePath);

  try {
    // Read the localization file
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Language file not found' }, { status: 404 });
  }
}
