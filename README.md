- Зайти в папку `backend` и добавить файл `.env`
- Записать в него: `DATABASE_URL="file:./dev.db"`
- В терминале выполнить команды:
  ```
  npx prisma migrate dev --name init
  npx prisma generate
  ```
