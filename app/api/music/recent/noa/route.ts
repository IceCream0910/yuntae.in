import { NextResponse } from "next/server";

const allowedOrigins = ['http://localhost', 'http://127.0.0.1', 'https://yuntae.in'];

async function cors(request, response) {
    const origin = request.headers.get("origin") ?? "";

    if (allowedOrigins.includes(origin)) {
        response.headers.set("Access-Control-Allow-Origin", origin);
    }

    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Max-Age", "86400");

    return response;
}

export async function OPTIONS(request) {
    const response = new NextResponse(null, { status: 204 });
    return cors(request, response);
}

export async function GET(request) {
    try {
        const response_token = await fetch(process.env.NEXT_PUBLIC_MUSICKIT_TOKEN_URL);
        const token_data = await response_token.json();
        const token = token_data.token_string;

        // 6개월 주기로 갱신 필요
        const mediaUserToken = process.env.NEXT_PUBLIC_APPLE_MUSIC_MEDIA_USER_TOKEN_NOA_KIM;

        const options = {
            method: 'GET',
            headers: {
                authority: 'amp-api.music.apple.com',
                'User-Agent': 'Cider-2 (WebView;?client=sabiiro&env=production&platform=windows&arch=x86_64)',
                'media-user-token': mediaUserToken,
                origin: 'https://beta.music.apple.com',
                referer: 'https://music.apple.com/',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                Authorization: 'Bearer ' + token
            }
        };

        const response = await fetch('https://api.music.apple.com/v1/me/recent/played/tracks?l=ko&types=songs', options);
        const data = await response.json();
        const corsResponse = NextResponse.json(data);
        return cors(request, corsResponse);
    } catch (error) {
        console.error(error);
        const errorResponse = NextResponse.json({ error: error.message }, { status: 500 });
        return cors(request, errorResponse);
    }
}

export const dynamic = "force-dynamic";