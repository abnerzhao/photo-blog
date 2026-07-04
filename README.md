# Photo Blog

[English](docs/README.en.md)

一个极简的个人摄影记录网站，用静态 HTML/CSS/JS 实现。样式参考 [sambecker/exif-photo-blog](https://github.com/sambecker/exif-photo-blog)。

页面包含：

- `index.html`：照片总览，支持按年份、地点、相机筛选
- `timeline.html`：时间线视图，同一时间点可以包含多张照片和一段文字

## 本地预览

```bash
python3 -m http.server 4175
```

打开：

```text
http://127.0.0.1:4175
```

## 照片数据

维护 `photos.md`，然后生成页面数据：

```bash
node scripts/build-data.mjs
```

脚本会生成：

```text
data/photos.json
data.js
```

`data.js` 供当前静态页面使用。`data/photos.json` 是干净的 JSON 数据源，后续迁移 API/后台时可以复用。

Markdown 格式：

```md
## 雨后的武康路
日期：2026.06.12
地点：上海 · 武康路
相机：Fujifilm X100VI

雨后十分钟，路面反光还在。

- https://img.example.com/photos/2026/06/rain-01.webp
- https://img.example.com/photos/2026/06/rain-02.webp | Leica Q3
```

每个 `##` 是一个时间点。相同日期/地点的一组照片放在同一个块里。

如果某张照片使用了不同相机，在图片链接后追加 `| 相机名`。不写则继承该时间点的 `相机` 字段。

## 项目结构

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

## 部署

这是纯静态项目，可以部署到 GitHub Pages、Cloudflare Pages、Vercel、Netlify 或普通 Nginx 目录。

如果部署到自己的远程服务器，可以在服务器上手动拉取代码，并将 Nginx 站点目录指向仓库目录或同步后的静态目录。远程服务器只需要 Nginx，不需要 Node.js 运行环境。

## 许可

MIT
