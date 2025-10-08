import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      "m.homeserver": {
        "base_url": "https://matrix.yuntae.in"
      },
      "m.identity_server": {
        "base_url": "https://vector.im"
      }
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }
  );
}
