import { NextResponse } from "next/server";

const allowedOrigins = ['http://localhost:3000', 'https://music.yuntae.in', 'https://yuntae.in', 'https://noa.kim', 'https://www.noa.kim', 'https://music.noa.kim'];

function setCorsHeaders(request, response) {
    const origin = request.headers.get("origin") ?? "";
    console.log(allowedOrigins.includes(origin), origin);
    if (allowedOrigins.includes(origin)) {
        response.headers.set("Access-Control-Allow-Origin", origin);
        console.log("CORS Origin:", origin);
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

export async function GET(request) {
    try {
        const response_token = await fetch(process.env.MUSICKIT_TOKEN_URL);
        const { token_string: token } = await response_token.json();

        const headerToken = request.headers.get("user-token")
            ?? "";
        const mediaUserToken = headerToken.trim()
            ? headerToken
            : process.env.APPLE_MUSIC_MEDIA_USER_TOKEN;

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

        const appleRes = await fetch(
            'https://api.music.apple.com/v1/me/recent/played/tracks?l=ko&types=songs',
            options
        );
        const data = await appleRes.json();

        const jsonResponse = NextResponse.json(data);
        return setCorsHeaders(request, jsonResponse);
    } catch (error) {
        console.error(error);
        const errorResponse = NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
        return setCorsHeaders(request, errorResponse);
    }
}

export const dynamic = "force-dynamic";