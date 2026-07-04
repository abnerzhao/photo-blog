# Photo Blog

[中文](../README.md)

A minimal static photo journal for personal photography. The visual style references [sambecker/exif-photo-blog](https://github.com/sambecker/exif-photo-blog).

It has two views:

- `index.html`: photo overview with filters by year, location, and camera
- `timeline.html`: timeline view, where one date can contain multiple photos and one shared note

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
## Rain on Wukang Road
日期：2026.06.12
地点：Shanghai · Wukang Road
相机：Fujifilm X100VI

Ten minutes after the rain, the street still held the reflections.

- https://img.example.com/photos/2026/06/rain-01.webp
- https://img.example.com/photos/2026/06/rain-02.webp | Leica Q3
```

Each `##` block is one timeline entry. Put photos shot at the same time/place into the same block.

If one photo uses a different camera from the entry, append it after `|`. Otherwise it inherits the entry-level camera.

## Project Structure

```text
.
├── index.html
├── timeline.html
├── photos.md
├── data.js
├── data/
│   └── photos.json
├── docs/
│   └── README.en.md
├── scripts/
│   └── build-data.mjs
├── favicon.svg
└── LICENSE
```

## Deploy

The current deployment flow uses GitHub Actions to sync static files to a remote server:

```text
push main
-> GitHub Actions runs .github/workflows/deploy.yml
-> rsync static files to /photos on the remote server
-> Nginx serves /photos as the site root
```

This is a fully static site. The remote server only needs Nginx and does not need a Node.js runtime.

The deploy sync excludes:

```text
.git
.github
photos.md
scripts/
```

Only files required by the browser are kept on the server.

## License

MIT
