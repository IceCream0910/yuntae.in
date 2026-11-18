import { NextRequest, NextResponse } from "next/server";

type Song = {
    name: string;
    artistName: string;
    isrc?: string;
    durationInMillis: number;
};

const publicCache = "public, s-maxage=900, stale-while-revalidate=60";

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get("q")?.trim().normalize("NFKC") ?? "";
    if (!query || query.length > 120) {
        return NextResponse.json({ error: "Expected a search query of 1 to 120 characters" }, { status: 400 });
    }

    let upstream = "token-provider";
    try {
        const tokenUrl = process.env.MUSICKIT_TOKEN_URL;
        if (!tokenUrl) throw new Error("MusicKit token provider unavailable");
        const tokenResponse = await fetch(tokenUrl, { cache: "no-store", signal: AbortSignal.timeout(5000) });
        if (!tokenResponse.ok) throw new Error("MusicKit token provider failed");
        const { token_string: token } = await tokenResponse.json();
        if (typeof token !== "string" || !token) throw new Error("MusicKit token unavailable");

        upstream = "apple-music";
        const params = new URLSearchParams({ term: query, types: "songs", limit: "1", l: "ko" });
        const response = await fetch(`https://api.music.apple.com/v1/catalog/kr/search?${params}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Origin: "https://beta.music.apple.com",
                Referer: "https://music.apple.com/",
            },
            signal: AbortSignal.timeout(5000),
        });
        if (!response.ok) throw new Error(`Apple Music search failed (${response.status})`);
        const { results } = await response.json();
        const song: Song | undefined = results?.songs?.data?.[0]?.attributes;

        upstream = "youtube-search";
        let videoId: string | null = null;
        if (song && song.durationInMillis > 0 && song.durationInMillis <= 720_000) {
            if (song.isrc) videoId = await searchVideo(song.isrc, song);
            videoId ??= await searchVideo(`${song.name} ${song.artistName} auto-generated`, song);
        }

        const data = song && videoId ? {
            title: song.name,
            artist: song.artistName,
            isrc: song.isrc ?? null,
            videoId,
            seconds: Math.ceil(song.durationInMillis / 1000),
        } : null;
        return NextResponse.json({ data }, { headers: { "Cache-Control": publicCache } });
    } catch (error) {
        console.warn("Music catalog search failed", upstream, error instanceof Error ? error.message : "Unknown error");
        return NextResponse.json({ error: "Music search unavailable", upstream }, { status: 502 });
    }
}

async function searchVideo(query: string, song: Song) {
    const params = new URLSearchParams({ query });
    const response = await fetch(`https://music.yuntae.in/api/search?${params}`, {
        signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("YouTube search failed");
    const { data } = await response.json();
    if (typeof data?.id !== "string" || !/^[A-Za-z0-9_-]{11}$/.test(data.id)
        || typeof data.title !== "string" || typeof data.channelTitle !== "string") {
        return null;
    }

    const title = normalize(song.name);
    const artist = normalize(song.artistName);
    const videoTitle = normalize(data.title);
    const channel = normalize(data.channelTitle);
    if (!title || !artist || !videoTitle.includes(title)
        || !(channel.includes(artist) || videoTitle.includes(artist))) {
        return null;
    }
    return data.id as string;
}

function normalize(text: string) {
    return text.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}
