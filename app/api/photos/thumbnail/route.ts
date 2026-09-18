export async function GET(request: Request) {
    const source = new URL(request.url).searchParams.get("url");
    let url: URL;
    try {
        url = new URL(source ?? "");
        if (url.origin !== "https://photo.yuntae.in" ||
            !url.pathname.startsWith("/thumbnails/") || url.username || url.password) {
            throw new Error("Invalid thumbnail URL");
        }
    } catch {
        return new Response("Invalid thumbnail URL", { status: 400 });
    }

    try {
        const response = await fetch(url, {
            next: { revalidate: 300 },
            signal: AbortSignal.timeout(10000),
            redirect: "error",
        });
        const contentType = response.headers.get("content-type")?.split(";")[0].trim();
        if (!response.ok || !contentType ||
            !["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"].includes(contentType)) {
            throw new Error("Invalid thumbnail response");
        }

        return new Response(await response.arrayBuffer(), {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=300",
                "X-Content-Type-Options": "nosniff",
            },
        });
    } catch {
        return new Response("Thumbnail unavailable", { status: 502 });
    }
}
