# Photo Blog

A minimal static photo journal for personal photography.

It has two views:

- `index.html`: photo overview with filters by year, location, and camera
- `timeline.html`: timeline view, where one date can contain multiple photos and one shared note

## Features

- Pure static HTML/CSS/JS
- No build step and no backend
- Overview grid inspired by `photos.sambecker.com`
- Filters by year, location, and camera
- Timeline grouped by shooting date
- Multiple photos per timeline entry
- Shared title, description, location, and camera per entry
- Click-to-enlarge lightbox
- Keyboard navigation in lightbox: `←`, `→`, `Esc`

## Local Preview

```bash
python3 -m http.server 4175
```

Open:

```text
http://127.0.0.1:4175
```

## Project Structure

```text
.
├── index.html      # overview page
├── timeline.html   # timeline page
├── data.js         # photo data
├── favicon.svg
└── LICENSE
```

## Photo Data

Edit `data.js`:

```js
window.photoEntries = [
  {
    title: '雨后的武康路',
    date: '2026.06.12',
    location: '上海 · 武康路',
    camera: 'Fujifilm X100VI',
    description: '雨后十分钟，路面反光还在。',
    photos: [
      {
        src: 'photos/after-rain-01.jpg',
        alt: '雨后街道路面反光与行人'
      },
      {
        src: 'photos/after-rain-02.jpg',
        alt: '路灯下湿润路面的反光'
      }
    ]
  }
];
```

Each entry is one timeline node. If one date has multiple photos, put them in the same `photos` array.

## Deploy

This project can be deployed to any static hosting service, such as GitHub Pages, Cloudflare Pages, Vercel, Netlify, or a plain Nginx directory.

## License

MIT
