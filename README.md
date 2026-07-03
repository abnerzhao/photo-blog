# Photo Blog

A minimal static photo journal for personal photography.

## Local Preview

```bash
python3 -m http.server 4175
```

Open:

```text
http://127.0.0.1:4175
```

## Photo Data

Edit `photos.md`, then generate data:

```bash
node scripts/build-data.mjs
```

The script writes:

```text
data/photos.json
data.js
```

`data.js` is used by the current static pages. `data/photos.json` is the clean JSON data source for later API/backend migration.

Markdown format:

```md
## 雨后的武康路
日期：2026.06.12
地点：上海 · 武康路
相机：Fujifilm X100VI

雨后十分钟，路面反光还在。

- https://img.example.com/photos/2026/06/rain-01.webp
- https://img.example.com/photos/2026/06/rain-02.webp | Fujifilm X100VI
```

Each `##` block is one timeline entry. Put photos shot at the same time/place into the same block.

If one photo uses a different camera from the entry, append it after `|`:

```md
- https://img.example.com/photo.webp | Leica Q3
```

## Project Structure

```text
.
├── index.html
├── timeline.html
├── photos.md
├── data.js
├── data/
│   └── photos.json
├── scripts/
│   └── build-data.mjs
├── favicon.svg
└── LICENSE
```

## Deploy

This project can be deployed to any static hosting service, such as GitHub Pages, Cloudflare Pages, Vercel, Netlify, or a plain Nginx directory.

## License

MIT
