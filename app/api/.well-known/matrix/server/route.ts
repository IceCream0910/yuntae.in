import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { "m.server": "matrix.yuntae.in:443" },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }
  );
}
