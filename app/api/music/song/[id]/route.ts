import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'id is required' });

    try {
        const response_token = await fetch(process.env.NEXT_PUBLIC_MUSICKIT_TOKEN_URL);
        const token_data = await response_token.json();
        const token = token_data.token_string;

        // 6개월 주기로 갱신 필요
        const mediaUserToken = process.env.NEXT_PUBLIC_APPLE_MUSIC_MEDIA_USER_TOKEN;

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
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error });
    }
}

export const dynamic = "force-dynamic";