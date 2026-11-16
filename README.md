# Sea Links Stays — сайт аренды Ocean Vista и вилл Sea Links (Муйне)

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · next-intl (EN / RU / VI)

## 1. Установка (один раз)

Нужен **Node.js 20 или новее**: https://nodejs.org (кнопка LTS).

Откройте терминал в папке проекта и выполните:

```bash
npm install
```

## 2. Импорт ваших фотографий

Скрипт берёт фото из папки, раскладывает их по объектам, исправляет поворот,
удаляет GPS и прочие метаданные и уменьшает до 2400 px.

```bash
node scripts/import-photos.mjs "../"
```

`"../"` означает родительскую папку. Если проект лежит в `Appartment rent site/seaside-mui-ne`,
скрипт найдёт фото в `Appartment rent site`. Можно указать любой путь в кавычках.

Как скрипт понимает названия папок и файлов:

| Название | Значение |
|---|---|
| `1br`, `2br`, `3br` | количество спален |
| `A1`, `b4`, `C2`, `F2` | блок и этаж (A1 = блок A, 1 этаж) |
| `villa`, `вилла` | вилла |

Результат: `public/images/<объект>/01.jpg…` и список объектов в `src/data/photos.generated.json`.
Файлы, которые не удалось распознать, скрипт не трогает и выводит их список.

## 3. Запуск сайта

```bash
npm run dev
```

Откройте http://localhost:3000/en (или `/ru`, `/vi`).

Проверка production-сборки:

```bash
npm run build
```

```bash
npm start
```

## Структура

```
public/llms.txt                 описание сайта для ИИ-поисковиков
scripts/import-photos.mjs       импорт фотографий
src/app/[locale]/               страницы (главная, объект)
src/app/robots.ts, sitemap.ts   robots.txt и sitemap.xml с hreflang
src/components/                 Hero, карточка объекта, секции, шапка, подвал
src/content/home.ts             тексты главной на 3 языках
src/data/properties.ts          объекты (пока примеры)
src/lib/schema.ts               генератор JSON-LD (VacationRental, FAQ, Breadcrumb…)
src/lib/site.ts                 название, адрес, телефон, мессенджеры: ЗАПОЛНИТЬ
src/messages/{en,ru,vi}.json    переводы интерфейса
```

## Перед запуском сайта в интернет

- `src/lib/site.ts`: настоящее название, домен, телефон, ссылки WhatsApp/Telegram/Zalo, координаты.
- `public/llms.txt` и `src/content/home.ts`: проверить цены, площади, расстояния.
- Удалить примеры отзывов и поставить настоящие.
