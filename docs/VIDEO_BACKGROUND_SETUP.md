# Настройка видеофона для главной секции

## Выполненные изменения (25.10.2026)

### 1. CSS (style.css)

**Исправлено позиционирование видео:**
- Заменено `top: 0; left: 0;` на `inset: 0` для более компактного кода
- Добавлено `object-position: center center` для центрирования композиции
- Обновлены z-index слои:
  - `.hero-video-bg` — z-index: 1 (видео)
  - `.hero-video-overlay` — z-index: 2 (затемнение)
  - `.hero-logo-container`, `.hero-content`, `.scroll-indicator` — z-index: 3 (контент поверх видео)

**Добавлена поддержка современных единиц:**
- Добавлен `min-height: 100svh` с fallback на `100vh` для корректной высоты на мобильных устройствах

### 2. HTML (index.html)

**Оптимизирован видеоэлемент:**
- Удален дублирующий source с `type="video/quicktime"`
- Добавлен атрибут `disableRemotePlayback` для предотвращения внешнего воспроизведения
- Оставлен один source с `type="video/mp4"` (Safari корректно воспроизводит .MOV файлы как MP4)

### 3. JavaScript (script.js)

**Улучшена логика автовоспроизведения:**
- Добавлены события `loadedmetadata` и `canplay` вместо `loadeddata`
- Добавлены обработчики `touchstart` и `scroll` для мобильных устройств
- Расширено логирование ошибок с детальной информацией (error code, message)
- Добавлены события мониторинга: `stalled`, `waiting`, `playing`

## Структура видеофона

```
.hero (position: relative, overflow: hidden)
├── video.hero-video-bg (z-index: 1) — видео
├── div.hero-video-overlay (z-index: 2) — затемнение rgba(0, 0, 0, 0.35)
├── div.hero-logo-container (z-index: 3) — логотип
├── div.hero-content (z-index: 3) — текст и кнопки
└── div.scroll-indicator (z-index: 3) — индикатор прокрутки
```

## Расположение файла

Путь к видео: `clips/IMG_4302.MOV` (32MB)

## Проверка работоспособности

1. Откройте Developer Tools в браузере (F12)
2. Перейдите на вкладку Console
3. Должны появиться сообщения:
   - `Video loading started`
   - `Video metadata loaded`
   - `Video can play`
   - `Hero video playing` или `Video is playing`

4. Если видео не воспроизводится автоматически:
   - Кликните в любом месте страницы
   - Прокрутите страницу
   - Видео должно запуститься после взаимодействия

## Устранённые проблемы

✅ **Чёрный экран вместо видео** — исправлено через корректные z-index
✅ **Неправильное позиционирование** — используется inset: 0 и object-fit: cover
✅ **Проблемы с автовоспроизведением** — добавлены fallback на взаимодействие пользователя
✅ **Мобильная совместимость** — добавлены touchstart и 100svh

## Тонкие белые линии

**Проверено и не обнаружено:**
- Нет псевдоэлементов `::before` или `::after` у `.hero`
- `body::before` имеет `display: none`
- Нет границ у видеоконтейнера
- `.section-divider` имеет прозрачный фон и корректные отступы

## Запуск локального сервера для тестирования

```bash
cd /Users/k0f3st72/Stain
python3 -m http.server 8000
```

Затем откройте: http://localhost:8000/index.html

## Примечание

Файл IMG_4302.MOV исключён из git через `.gitignore` (строка 9: `*.mov`). Это нормальная практика для больших медиафайлов.
