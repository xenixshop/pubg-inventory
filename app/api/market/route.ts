import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')
  const currency = req.nextUrl.searchParams.get('currency') || '1'
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 })

  try {
    const params = new URLSearchParams({
      appid: '578080',
      currency,
      country: 'US',
      market_hash_name: name,
    })

    const res = await fetch(
      `https://steamcommunity.com/market/priceoverview/?${params.toString()}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Steam Market unavailable', upstreamStatus: res.status },
        { status: 502 }
      )
    }

    const data = await res.json()
    if (!data || data.success === false) {
      return NextResponse.json(
        { lowest_price: null, median_price: null, volume: '0' },
        { status: 200 }
      )
    }

    return NextResponse.json({
      lowest_price: data.lowest_price || null,
      median_price: data.median_price || null,
      volume: data.volume || '0',
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown Steam Market error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
