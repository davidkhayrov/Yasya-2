# Настройка отправки пожеланий

Отправка реализована через серверную функцию `api/send-wish.ts` и Resend.
Секретный API-ключ не используется в браузере.

Перед публикацией проекта на Vercel:

1. Создайте аккаунт на https://resend.com и подтвердите домен отправителя.
2. Создайте API key в Resend.
3. В Vercel откройте Project → Settings → Environment Variables.
4. Добавьте:
   - `RESEND_API_KEY` — секретный API key из Resend.
   - `RESEND_FROM_EMAIL` — подтверждённый адрес отправителя, например `Wishes <wishes@your-verified-domain.com>`.
5. Перезапустите deployment (Redeploy).

Письма будут отправляться на:
- lesnovrostislav45@gmail.com
- david.khayrov@gmail.com

Локально для теста создайте `.env.local` в корне проекта с теми же двумя переменными.
Не публикуйте `.env.local` и не вставляйте API key в frontend-код.

Форма переводит пользователя на следующий сайт только после успешного ответа сервера.
