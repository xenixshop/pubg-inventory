import { NextRequest, NextResponse } from 'next/server'

export const preferredRegion = 'sin1'

const steamHeaders = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
}

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name')
  const currency = req.nextUrl.searchParams.get('currency') || '1'
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 })

  try {
    const overviewParams = new URLSearchParams({
      appid: '578080',
      currency,
      country: 'US',
      market_hash_name: name,
    })

    const overviewRes = await fetch(
      `https://steamcommunity.com/market/priceoverview/?${overviewParams.toString()}`,
      { headers: steamHeaders, next: { revalidate: 300 } }
    )

    if (overviewRes.ok) {
      const data = await overviewRes.json()
      if (data?.success && data.lowest_price) {
        return NextResponse.json({
          lowest_price: data.lowest_price,
          median_price: data.median_price || null,
          volume: data.volume || '0',
          source: 'priceoverview',
        })
      }
    }

    const searchParams = new URLSearchParams({
      query: name,
      start: '0',
      count: '10',
      search_descriptions: '0',
      sort_column: 'price',
      sort_dir: 'asc',
      appid: '578080',
      norender: '1',
      currency,
      country: 'US',
      language: 'english',
    })

    const searchRes = await fetch(
      `https://steamcommunity.com/market/search/render/?${searchParams.toString()}`,
      { headers: steamHeaders, next: { revalidate: 300 } }
    )

    if (searchRes.ok) {
      const searchData = await searchRes.json()
      const item = searchData?.results?.find(
        (result: { hash_name?: string }) => result.hash_name === name
      )
      if (item?.sell_price_text) {
        return NextResponse.json({
          lowest_price: item.sell_price_text,
          median_price: null,
          volume: String(item.sell_listings || 0),
          source: 'search',
        })
      }
    }

    return NextResponse.json(
      {
        error: 'Steam Market unavailable',
        overviewStatus: overviewRes.status,
        searchStatus: searchRes.status,
      },
      { status: 502 }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown Steam Market error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
