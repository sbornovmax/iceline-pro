'use client'
import { useState } from 'react'
import { Phone, MessageCircle, X, Check, ChevronUp } from 'lucide-react'

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

export default function FloatingWidget() {
  const [open, setOpen] = useState(false)
  const [callbackOpen, setCallbackOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (!phone) return
    setSent(true)
    setTimeout(() => { setSent(false); setCallbackOpen(false); setOpen(false); setName(''); setPhone('') }, 2500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Callback form */}
      {callbackOpen && (
        <div className="bg-white shadow-2xl border border-gray-100 w-72 p-5 animate-slide-up">
          <div className="flex justify-between items-center mb-4">
            <p className="font-black text-sm uppercase">Перезвоним вам</p>
            <button onClick={() => setCallbackOpen(false)} className="text-gray-400 hover:text-ice-black"><X size={16} /></button>
          </div>
          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Check size={24} className="text-green-600" />
              </div>
              <p className="font-bold text-sm">Заявка принята!</p>
              <p className="text-xs text-gray-400 mt-1">Перезвоним в течение 15 минут</p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-gray-500">Оставьте номер — перезвоним в течение 15 минут</p>
              <input value={name} onChange={e => setName(e.target.value)}
                placeholder="Ваше имя" className="input-field text-sm" />
              <input value={phone} onChange={e => setPhone(e.target.value)}
                placeholder="+7 (900) 000-00-00" className="input-field text-sm" />
              <button onClick={handleSend} className="btn-red w-full !py-2.5 text-sm">
                Перезвоните мне
              </button>
              <p className="text-[10px] text-gray-400 text-center">Нажимая кнопку, вы соглашаетесь с <a href="/legal/privacy" className="underline">политикой конфиденциальности</a></p>
            </div>
          )}
        </div>
      )}

      {/* Channel buttons (shown when open) */}
      {open && !callbackOpen && (
        <div className="flex flex-col gap-2 animate-slide-up">
          <button onClick={() => { setCallbackOpen(true) }}
            className="flex items-center gap-2 bg-white shadow-lg border border-gray-100 px-4 py-2.5 text-sm font-semibold hover:bg-ice-red hover:text-white hover:border-ice-red transition-all group">
            <Phone size={16} className="text-ice-red group-hover:text-white" />
            Перезвоните мне
          </button>
          <a href="https://t.me/icelinepro" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white shadow-lg border border-gray-100 px-4 py-2.5 text-sm font-semibold hover:bg-[#2AABEE] hover:text-white hover:border-[#2AABEE] transition-all group">
            <span className="text-[#2AABEE] group-hover:text-white"><TelegramIcon /></span>
            Telegram
          </a>
          <a href="https://wa.me/79001234567" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white shadow-lg border border-gray-100 px-4 py-2.5 text-sm font-semibold hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all group">
            <MessageCircle size={16} className="text-[#25D366] group-hover:text-white" />
            WhatsApp
          </a>
        </div>
      )}

      {/* Main toggle button */}
      <button onClick={() => { setOpen(!open); if (open) setCallbackOpen(false) }}
        className={`w-14 h-14 shadow-xl flex items-center justify-center transition-all ${open ? 'bg-ice-black rotate-180' : 'bg-ice-red hover:bg-ice-red-dark'}`}>
        {open ? <X size={22} className="text-white" /> : <ChevronUp size={22} className="text-white" />}
      </button>

      {/* Pulse ring */}
      {!open && (
        <div className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-ice-red/30 animate-ping pointer-events-none" />
      )}
    </div>
  )
}
