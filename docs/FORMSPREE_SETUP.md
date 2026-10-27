# Настройка Formspree для формы контактов

## Шаги настройки:

### 1. Создайте аккаунт на Formspree

Перейдите на https://formspree.io/ и зарегистрируйтесь (бесплатный план позволяет 50 отправок в месяц).

### 2. Создайте новую форму

- После входа нажмите "+ New Form"
- Назовите форму: "STAIN Contact Form"
- В поле "Email" укажите: **STA1NPROJ3CTS@gmail.com**

### 3. Получите Form ID

После создания формы вы получите уникальный Form ID в формате `xabc1234`

### 4. Замените YOUR_FORM_ID в коде

Откройте файл `index.html` и найдите строку:

```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

Замените `YOUR_FORM_ID` на ваш реальный Form ID:

```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/xabc1234" method="POST">
```

### 5. Готово!

После этого форма будет:
- ✅ Отправлять все сообщения на STA1NPROJ3CTS@gmail.com
- ✅ Показывать сообщение "Анкета отправлена." без редиректа
- ✅ Оставаться на том же сайте после отправки
- ✅ Очищать поля формы после успешной отправки

## Безопасность

Formspree автоматически:
- Защищает от спама
- Не требует хранения паролей в коде
- Работает безопасно с frontend-only сайтами

## Альтернатива

Если не хотите использовать Formspree, можете настроить:
- Netlify Forms (если хостите на Netlify)
- EmailJS
- Web3Forms
- Basin
