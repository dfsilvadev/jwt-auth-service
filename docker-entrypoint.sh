#!/bin/sh
set -e

echo "🚀 Starting application setup..."

# Verificar se Prisma CLI está disponível
if [ -d "node_modules/prisma" ]; then
  # Gerar Prisma Client se necessário
  if [ ! -d "node_modules/.prisma" ]; then
    echo "📦 Generating Prisma Client..."
    pnpm prisma generate || npx prisma generate
  fi

  # Executar migrações em produção
  if [ "$NODE_ENV" = "production" ]; then
    echo "🔄 Running database migrations..."
    pnpm prisma migrate deploy || npx prisma migrate deploy
  fi
else
  echo "⚠️  Prisma CLI not found, skipping Prisma setup..."
fi

# Executar comando passado como argumento
echo "✅ Setup complete. Starting application..."
exec "$@"

