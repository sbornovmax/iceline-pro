import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Неверный email' }, { status: 400 })
    }

    // TODO: Add to UniSender / DashaMail via API
    // Example UniSender integration:
    // await fetch('https://api.unisender.com/ru/api/subscribe?format=json', {
    //   method: 'POST',
    //   body: new URLSearchParams({
    //     api_key: process.env.UNISENDER_API_KEY!,
    //     list_ids: process.env.UNISENDER_LIST_ID!,
    //     fields[email]: email,
    //   })
    // })

    // Notify admin via Telegram
    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID
    if (token && chatId) {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `📧 Новая подписка на рассылку ICELINE PRO\nEmail: ${email}`,
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
