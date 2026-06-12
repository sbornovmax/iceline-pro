#!/bin/bash
# ============================================================
# ICELINE PRO — Deploy Script for Timeweb Cloud VPS
# Ubuntu 22.04 LTS
# Run as root: bash deploy.sh
# ============================================================

set -e

APP_NAME="iceline-pro"
APP_DIR="/var/www/iceline-pro"
REPO_URL="https://github.com/sbornovmax/iceline-pro.git"
DOMAIN="your-domain.ru"  # Change to your domain
NODE_VERSION="20"
PG_DB="icelinedb"
PG_USER="iceline"
PG_PASS="$(openssl rand -base64 16)"

echo "============================================"
echo "  ICELINE PRO — Auto Deploy Script"
echo "  Server: $(hostname)"
echo "  Time: $(date)"
echo "============================================"

# ==========================================
# 1. System update
# ==========================================
echo "📦 Updating system..."
apt update && apt upgrade -y
apt install -y curl wget git nginx certbot python3-certbot-nginx ufw

# ==========================================
# 2. Node.js installation
# ==========================================
echo "🟢 Installing Node.js $NODE_VERSION..."
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt install -y nodejs
node --version
npm --version

# PM2
npm install -g pm2

# ==========================================
# 3. PostgreSQL installation
# ==========================================
echo "🐘 Installing PostgreSQL..."
apt install -y postgresql postgresql-contrib

systemctl start postgresql
systemctl enable postgresql

# Create database and user
su -c "psql -c \"CREATE USER $PG_USER WITH PASSWORD '$PG_PASS';\"" postgres
su -c "psql -c \"CREATE DATABASE $PG_DB OWNER $PG_USER;\"" postgres
su -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $PG_DB TO $PG_USER;\"" postgres

echo "✅ PostgreSQL: $PG_DB created, user: $PG_USER"

# ==========================================
# 4. App deployment
# ==========================================
echo "📥 Cloning repository..."
mkdir -p /var/www
cd /var/www

if [ -d "$APP_DIR" ]; then
    cd "$APP_DIR"
    git pull origin main
else
    git clone "$REPO_URL" "$APP_DIR"
    cd "$APP_DIR"
fi

# ==========================================
# 5. Environment setup
# ==========================================
echo "⚙️ Creating .env.local..."
cat > "$APP_DIR/.env.local" << ENV
DATABASE_URL=postgresql://$PG_USER:$PG_PASS@localhost:5432/$PG_DB?sslmode=disable
NEXT_PUBLIC_APP_URL=https://$DOMAIN
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
NODE_ENV=production
ENV

echo "⚠️  Don't forget to edit .env.local with real values!"

# ==========================================
# 6. Build app
# ==========================================
echo "🔨 Installing dependencies and building..."
cd "$APP_DIR"
npm ci --only=production=false
npm run build

# ==========================================
# 7. PM2 setup
# ==========================================
echo "🔄 Setting up PM2..."
cat > "$APP_DIR/ecosystem.config.js" << PM2
module.exports = {
  apps: [{
    name: '$APP_NAME',
    script: 'node_modules/.bin/next',
    args: 'start -p 3000',
    cwd: '$APP_DIR',
    instances: 2,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
PM2

pm2 start "$APP_DIR/ecosystem.config.js"
pm2 save
pm2 startup systemd -u root --hp /root

# ==========================================
# 8. Nginx configuration
# ==========================================
echo "🌐 Configuring Nginx..."
cat > "/etc/nginx/sites-available/$APP_NAME" << NGINX
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
    gzip_min_length 1000;
    
    # Logs
    access_log /var/log/nginx/$APP_NAME.access.log;
    error_log /var/log/nginx/$APP_NAME.error.log;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 60s;
    }
    
    # Static files cache
    location /_next/static {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    
    location /favicon.ico {
        proxy_pass http://localhost:3000;
        access_log off;
        add_header Cache-Control "public, max-age=86400";
    }
}
NGINX

ln -sf "/etc/nginx/sites-available/$APP_NAME" "/etc/nginx/sites-enabled/$APP_NAME"
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# ==========================================
# 9. SSL Certificate (Let's Encrypt)
# ==========================================
echo "🔒 Installing SSL certificate..."
certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --email "admin@$DOMAIN" || echo "⚠️ SSL setup failed — run manually after DNS is configured"

# ==========================================
# 10. Firewall
# ==========================================
echo "🛡️ Configuring firewall..."
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# ==========================================
# 11. Auto-updates cron
# ==========================================
echo "⏰ Setting up auto-deploy cron..."
cat > /etc/cron.d/iceline-deploy << CRON
0 4 * * * root cd $APP_DIR && git pull origin main && npm ci && npm run build && pm2 restart $APP_NAME
CRON

# ==========================================
# DONE!
# ==========================================
echo ""
echo "============================================"
echo "✅  ICELINE PRO DEPLOYED SUCCESSFULLY!"
echo "============================================"
echo ""
echo "📊 App status:"
pm2 status
echo ""
echo "🔑 Database credentials (SAVE THESE!):"
echo "   DB Name: $PG_DB"
echo "   User: $PG_USER"
echo "   Password: $PG_PASS"
echo ""
echo "⚠️  Next steps:"
echo "   1. Edit .env.local: nano $APP_DIR/.env.local"
echo "   2. Run Supabase schema: psql -U $PG_USER -d $PG_DB < supabase_schema.sql"
echo "   3. Update DOMAIN in Nginx: $DOMAIN"
echo "   4. Point DNS to this server IP"
echo ""
echo "🌐 Site will be available at: https://$DOMAIN"
echo "============================================"
