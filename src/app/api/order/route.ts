import { NextRequest, NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

async function sendTelegram(text: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log('Telegram not configured. Message:', text)
    return false
  }
  const res = await fetch(
    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    }
  )
  return res.ok
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, items, total, delivery, payment, address } = body

    // Generate order ID
    const orderId = `ICE-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`

    // Format items list
    const itemsList = items?.map((item: any) =>
      `  • ${item.name} ${item.size ? `(${item.size})` : ''} × ${item.qty} = ${(item.price * item.qty).toLocaleString('ru-RU')} ₽`
    ).join('\n') ?? '  • Товары не указаны'

    // Telegram message
    const message = `
🏒 <b>НОВЫЙ ЗАКАЗ ICELINE PRO</b>

📦 <b>Заказ #${orderId}</b>
📅 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}

👤 <b>Клиент:</b>
  Имя: ${name ?? '—'}
  Телефон: ${phone ?? '—'}
  Email: ${email ?? '—'}

🛒 <b>Состав заказа:</b>
${itemsList}

📍 <b>Доставка:</b> ${delivery ?? '—'}
📮 <b>Адрес:</b> ${address ?? '—'}
💳 <b>Оплата:</b> ${payment ?? '—'}

💰 <b>ИТОГО: ${total?.toLocaleString('ru-RU') ?? '—'} ₽</b>

🔗 <a href="https://iceline-pro.vercel.app/admin">Открыть в админке</a>
    `.trim()

    await sendTelegram(message)

    return NextResponse.json({ success: true, orderId })
  } catch (error) {
    console.error('Order API error:', error)
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 })
  }
}
