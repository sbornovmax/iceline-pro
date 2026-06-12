import { NextRequest, NextResponse } from 'next/server'

async function notifyTelegram(orderId: string, data: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const itemsList = data.items?.map((i: any) =>
    `  • ${i.name} ${i.size ? `(${i.size})` : ''} × ${i.qty} = ${(i.price * i.qty).toLocaleString('ru-RU')} ₽`
  ).join('\n') ?? ''

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: `🏒 <b>НОВЫЙ ЗАКАЗ ICELINE PRO</b>\n\n📦 <b>#${orderId}</b>\n👤 ${data.name} | ${data.phone}\n📦 ${data.delivery}\n💳 ${data.payment}\n\n🛒 Товары:\n${itemsList}\n\n💰 <b>Итого: ${data.total?.toLocaleString('ru-RU')} ₽</b>`,
      parse_mode: 'HTML',
    }),
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const orderId = `ICE-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`
    await notifyTelegram(orderId, body)
    return NextResponse.json({ success: true, orderId })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
