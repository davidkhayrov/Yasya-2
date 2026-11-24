# Настройка EmailJS для Yasya

В проект уже добавлена интеграция EmailJS с параметрами:
- Service ID: `service_2jd6gtl`
- Template ID: `template_q8c4l7l`
- Public Key: `PM6-D1Xid0n9Lt3cv`

## Перед деплоем

1. В EmailJS откройте **Email Templates** и отредактируйте шаблон `Contact Us` (Template ID `template_q8c4l7l`).
2. В поле **To Email** оставьте `lesnovrostislav45@gmail.com`.
3. В поле **Bcc** добавьте `david.khayrov@gmail.com`. Поле **Cc** оставьте пустым.
4. В поле **Reply To** удалите `{{email}}` и оставьте пустым.
5. В содержимом письма используйте переменную `{{wish}}`, например:

   Получено новое загаданное желание! ♡

   Текст желания:
   {{wish}}

   С любовью,
   Yasya ♡

6. Сохраните шаблон.
7. В EmailJS → **Account → General → API Keys** проверьте, что Public Key совпадает с ключом, указанным в `src/components/WishForm.tsx`. Если вы обновляли ключ, замените его там.
8. Загрузите содержимое этого ZIP в проект Vercel и выполните новый Production Deploy. Переменные `GMAIL_USER` и `GMAIL_APP_PASSWORD` больше не нужны; их можно удалить из Vercel после успешной проверки.

## Важно

EmailJS вызывается непосредственно из браузера. Public Key предназначен для клиентской интеграции и не является Private Key. Не добавляйте Private Key в проект. В настройках EmailJS ограничьте разрешённые домены вашим сайтом `yasya-2.vercel.app` (и при необходимости доменами Vercel Preview).

После деплоя отправьте тестовое желание. При успешной отправке посетитель увидит праздничный экран, затем произойдёт переход на `https://yasya-3.vercel.app/`.
