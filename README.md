# Общая информация

Репозиторий для проекта "ЖК Пушка" [Ссылка на проект в системе](https://s.w-nn.ru/p/9951)
Проект реализован на фреймворке Nuxt 3 с использованием Server-Side Rendering (SSR)

В качестве препроцессора для HTML используется PUG. С базовым синтаксисом можно ознакомиться в [официальной документации](https://pugjs.org/api/getting-started.html)
В качестве препроцессора для CSS используется SCSS. [Ссылка на документацию](https://sass-lang.com/documentation/)

## Ветки

В репозитории имеются 2 рабочие ветки - master и dru

Ветка master - статичная верстка без API бэкенда

Ветка dru - работа с API. Для взаимодействия с бэкендом используется useAsyncData (запрашиваем данные для страниц) и обычный fetch (работаем с запросами при отправке форм)

## Страницы (/pages)

Для страниц используется файловый роутинг. Важно, чтобы все страницы создавались в директории /pages

На данный момент в проекте имеются следующие страницы:

- /flats-list
  - [id].vue - Карточка квартиры
  - index.vue - Список квартир
    Фильтрация: на стороне сервера
- /flats-scheme
  - index.vue - Схема (шахматка) квартир
    Фильтрация: на стороне клиента (без дополнительных запросов на сервер)
- /page
  - [text].vue - Текстовые страницы (используется для всех тектовых страниц). Пример пути для страницы "Политика конфиденциальности" может выглядеть так - /page/politic
- contacts.vue (/contacts) - Контакты
- dynamic.vue (/dynamic) - Динамика строительства
- index.vue (/) - Главная страница

## Шаблоны (/layouts)

В проекте используются 2 шаблона

- main.vue - для главной страницы. Назначение шаблона происходит в файле /pages/index.vue через объект definePageMeta
- default.vue - для внутренних страниц

## ESlint

[Ссылка](https://eslint.org/) на официальную документацию

В проекте установлены пакеты для eslint, которые можно посмотреть в файле package.json

.eslintrc.json - файл с настройками

eslint.config.mjs - файл, в который мигрировали настройки из .eslintrc.json

Варианты расширения конфигурационного файла eslint:

- редактируем всё непосредственно в нем (не рекомендуется)
- через запуск команды миграции npx @eslint/migrate-config .eslintrc.json (может перезаписать правки, сделанные без миграции)

Дополнительно в tsconfig.json добавлен plugin для PUG, чтобы nuxt понимал, что мы работаем с препроцессором, а не со стандатным HTML и подсвечивал используемые в разметке переменные и функции из тега script

## Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
