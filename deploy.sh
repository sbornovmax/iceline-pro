#!/bin/bash
set -e
cd /Users/sbornovmax/Desktop/iceline-pro || { echo "FAIL: папка проекта не найдена"; exit 1; }

echo ">> Сборка проекта..."
if npm run build > /tmp/build.log 2>&1; then
  echo "✅ BUILD OK"
  git add .
  if git diff --cached --quiet; then
    echo "Нет изменений для коммита"
  else
    git commit -m "$1"
    git push
    echo "✅ ЗАДЕПЛОЕНО: $1"
  fi
else
  echo "❌ BUILD FAILED — ошибки:"
  grep -A 20 "Error\|error TS\|Failed to compile" /tmp/build.log | head -60
  exit 1
fi
