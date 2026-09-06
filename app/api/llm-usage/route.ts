import { NextResponse } from "next/server";

export async function GET() {
    try {
        const base = "https://llmusage.yuntae.in/api/v1/usage";
        const responses = await Promise.all([
            fetch(`${base}/daily?days=7&tz=Asia%2FSeoul`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(10000) }),
            fetch(`${base}?days=3660&tz=Asia%2FSeoul`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(10000) }),
        ]);
        if (responses.some(response => !response.ok)) throw new Error("Usage API failed");
        const [daily, total] = await Promise.all(responses.map(response => response.json()));
        if (!Array.isArray(daily.daily) || !daily.range?.to || !total.summary) {
            throw new Error("Invalid usage response");
        }
        return NextResponse.json({ daily: daily.daily, range: daily.range, summary: total.summary });
    } catch {
        return NextResponse.json({ error: "사용량을 불러오지 못했습니다." }, { status: 502 });
    }
}
