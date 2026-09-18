export async function GET() {
    try {
        const response = await fetch("https://photo.yuntae.in/feed.xml", {
            next: { revalidate: 300 },
            signal: AbortSignal.timeout(10000),
        });
        if (!response.ok) throw new Error("Photo feed request failed");

        return new Response(await response.text(), {
            headers: { "Content-Type": "application/xml; charset=utf-8" },
        });
    } catch {
        return Response.json({ error: "사진을 불러오지 못했습니다." }, { status: 502 });
    }
}
