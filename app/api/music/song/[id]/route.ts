import { NextResponse } from "next/server";

const allowedOrigins = [
    'http://localhost',
    'http://127.0.0.1',
    'https://music.yuntae.in',
    'https://yuntae.in',
    'https://noa.kim',
    'https://www.noa.kim',
    'https://music.noa.kim'
];

function setCorsHeaders(request, response) {
    const origin = request.headers.get("origin") ?? "";
    if (allowedOrigins.includes(origin)) {
        response.headers.set("Access-Control-Allow-Origin", origin);
    }
    response.headers.set("Vary", "Origin");
    response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, user-token");
    return response;
}

export async function OPTIONS(request) {
    const response = new NextResponse(null, { status: 204 });
    return setCorsHeaders(request, response);
}

export async function GET(req, { params }) {
    const { id } = params;
    if (!id) {
        const errorResponse = NextResponse.json({ error: 'id is required' }, { status: 400 });
        return setCorsHeaders(req, errorResponse);
    }

    try {
        const response_token = await fetch(process.env.MUSICKIT_TOKEN_URL);
        const token_data = await response_token.json();
        const token = token_data.token_string;

        const mediaUserToken = process.env.APPLE_MUSIC_MEDIA_USER_TOKEN;

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

        const response = await fetch(`https://amp-api.music.apple.com/v1/catalog/kr/songs/${id}`, options);
        const data = await response.json();
        const jsonResponse = NextResponse.json(data);
        return setCorsHeaders(req, jsonResponse);
    } catch (error) {
        console.error(error);
        const errorResponse = NextResponse.json({ error: error.message }, { status: 500 });
        return setCorsHeaders(req, errorResponse);
    }
}

export const dynamic = "force-dynamic";
