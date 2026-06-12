# 🏒 ICELINE PRO — Руководство по деплою

## Стек
- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **База данных**: PostgreSQL
- **Процессы**: PM2 (cluster mode)
- **Веб-сервер**: Nginx (reverse proxy)
- **SSL**: Let's Encrypt (certbot)

---

## 🚀 Быстрый деплой на Timeweb Cloud

### Требования к серверу
- Ubuntu 22.04 LTS
- RAM: от 2 GB (рекомендуется 4 GB)
- SSD: от 20 GB
- Timeweb Cloud VPS: от 650 ₽/мес

### Шаг 1 — Создать VPS на Timeweb
1. Зайти на **timeweb.cloud**
2. Создать VPS: Ubuntu 22.04, 2 CPU, 4 GB RAM
3. Сохранить IP сервера

### Шаг 2 — Подключиться к серверу
```bash
ssh root@ВАШ_IP_СЕРВЕРА
```

### Шаг 3 — Запустить автодеплой
```bash
# Скачать и запустить скрипт
wget https://raw.githubusercontent.com/sbornovmax/iceline-pro/main/deploy/deploy.sh
bash deploy.sh
```

**Скрипт автоматически установит:**
- ✅ Node.js 20
- ✅ PostgreSQL
- ✅ PM2 (process manager)
- ✅ Nginx (web server)
- ✅ SSL сертификат (Let's Encrypt)
- ✅ UFW Firewall

---

## ⚙️ Ручная настройка

### Переменные окружения
Отредактировать `/var/www/iceline-pro/.env.local`:
```bash
nano /var/www/iceline-pro/.env.local
```

```env
DATABASE_URL=postgresql://iceline:ПАРОЛЬ@localhost:5432/icelinedb
NEXT_PUBLIC_APP_URL=https://your-domain.ru
TELEGRAM_BOT_TOKEN=токен_бота
TELEGRAM_CHAT_ID=id_чата
NODE_ENV=production
```

### Применить схему БД
```bash
psql -U iceline -d icelinedb -f /var/www/iceline-pro/supabase_schema.sql
```

---

## 🔄 Обновление сайта
```bash
bash /var/www/iceline-pro/deploy/update.sh
```

---

## 📊 Управление процессами

```bash
pm2 status          # Статус приложения
pm2 logs iceline-pro # Просмотр логов
pm2 restart iceline-pro # Перезапуск
pm2 stop iceline-pro    # Остановка
```

---

## 🐞 Отладка

```bash
# Nginx логи
tail -f /var/log/nginx/iceline-pro.error.log

# App логи
pm2 logs iceline-pro --err

# PostgreSQL
sudo -u postgres psql -c "SELECT * FROM orders LIMIT 5;"
```

---

## 📡 Настройка DNS

В панели управления доменом добавить A-записи:
```
@     -> ВАШ_IP_СЕРВЕРА
www   -> ВАШ_IP_СЕРВЕРА
```

---

## 💰 Стоимость хостинга (Timeweb Cloud)

| Компонент | Цена/мес |
|-----------|----------|
| VPS (2 CPU, 4 GB RAM) | ~800 ₽ |
| PostgreSQL (на VPS) | бесплатно |
| Домен .ru | ~150 ₽/год |
| SSL (Let's Encrypt) | бесплатно |
| **Итого** | **~800 ₽/мес** |

---

## 🔐 Telegram бот (уведомления о заказах)

1. Написать **@BotFather** → `/newbot`
2. Получить токен
3. Написать боту любое сообщение
4. Открыть: `https://api.telegram.org/bot{TOKEN}/getUpdates`
5. Найти `"chat":{"id":...}` — это TELEGRAM_CHAT_ID
