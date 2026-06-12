import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

async function notifyTelegram(orderId: string, data: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const itemsList = data.items?.map((i: any) =>
    `  • ${i.name} ${i.size ? `(${i.size})` : ''} × ${i.qty} = ${(i.price * i.qty).toLocaleString('ru-RU')} ₽`
  ).join('\n') ?? ''

  const msg = `🏒 <b>НОВЫЙ ЗАКАЗ #${orderId}</b>

👤 ${data.name} | ${data.phone}
📦 ${data.delivery}
💳 ${data.payment}

🛒 Товары:
${itemsList}

💰 <b>Итого: ${data.total?.toLocaleString('ru-RU')} ₽</b>

<a href="https://iceline-pro.vercel.app/admin">→ Открыть в админке</a>`

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'HTML' }),
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = await createServerSupabaseClient()

    // Get current user (optional — guest orders allowed)
    const { data: { user } } = await supabase.auth.getUser()

    const subtotal = body.items?.reduce((s: number, i: any) => s + i.price * i.qty, 0) ?? body.total
    const deliveryCost = subtotal >= 5000 ? 0 : 350
    const total = subtotal + deliveryCost

    // Save order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user?.id ?? null,
        customer_name: body.name,
        customer_phone: body.phone,
        customer_email: body.email,
        delivery_method: body.delivery,
        delivery_address: body.address,
        payment_method: body.payment,
        status: 'new',
        subtotal,
        delivery_cost: deliveryCost,
        total,
      })
      .select()
      .single()

    if (orderError) throw orderError

    // Save order items
    if (body.items?.length > 0 && order) {
      await supabase.from('order_items').insert(
        body.items.map((item: any) => ({
          order_id: order.id,
          product_name: item.name,
          product_brand: item.brand,
          product_slug: item.slug,
          size: item.size || null,
          qty: item.qty,
          price: item.price,
          total: item.price * item.qty,
        }))
      )
    }

    // Send Telegram notification
    await notifyTelegram(order?.order_number ?? 'N/A', { ...body, total })

    return NextResponse.json({
      success: true,
      orderId: order?.order_number,
      orderUuid: order?.id,
    })
  } catch (error) {
    console.error('Order error:', error)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
